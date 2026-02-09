/**
 * Cloudflare Worker for Poll API
 *
 * This worker handles poll voting and results retrieval using Cloudflare KV for storage.
 *
 * Routes:
 * - POST /api/poll-vote - Submit a vote
 * - GET /api/poll-results?pollId=X - Get poll results
 */

import pollsData from "../src/lib/data/polls.json"

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const path = url.pathname

    // Enable CORS
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    }

    // Handle OPTIONS request for CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders })
    }

    try {
      // POST /api/poll-vote - Submit a vote
      if (path === "/api/poll-vote" && request.method === "POST") {
        const body = await request.json()
        const { pollId, optionId } = body

        if (!pollId || !optionId) {
          return new Response(
            JSON.stringify({ error: "Missing pollId or optionId" }),
            {
              status: 400,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          )
        }

        // Check if the poll exists and is still active
        const poll = pollsData.find((p) => p.id === pollId)
        if (!poll) {
          return new Response(
            JSON.stringify({ error: "Poll not found" }),
            {
              status: 404,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          )
        }

        const now = new Date()
        const end = new Date(poll.timeRange.end + "T23:59:59Z")
        if (now > end) {
          return new Response(
            JSON.stringify({ error: "This poll has ended" }),
            {
              status: 403,
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          )
        }

        // Increment vote count for this option
        const key = `${pollId}:${optionId}`
        const currentCount = (await env.POLL_KV.get(key)) || "0"
        const newCount = parseInt(currentCount) + 1
        await env.POLL_KV.put(key, newCount.toString())

        // Get all results for this poll
        const results = await getPollResults(env.POLL_KV, pollId)

        return new Response(JSON.stringify({ success: true, results }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        })
      }

      // GET /api/poll-results - Get poll results
      if (path === "/api/poll-results" && request.method === "GET") {
        const pollId = url.searchParams.get("pollId")

        if (!pollId) {
          return new Response(JSON.stringify({ error: "Missing pollId" }), {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          })
        }

        const results = await getPollResults(env.POLL_KV, pollId)

        return new Response(JSON.stringify({ results }), {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        })
      }

      // 404 for unknown routes
      return new Response(JSON.stringify({ error: "Not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    } catch (error) {
      return new Response(
        JSON.stringify({ error: error.message || "Internal server error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      )
    }
  },
}

/**
 * Get all results for a poll by listing all keys with the poll ID prefix
 */
async function getPollResults(kv, pollId) {
  // List all keys for this poll
  const list = await kv.list({ prefix: `${pollId}:` })

  const results = {}

  // Fetch all vote counts
  for (const key of list.keys) {
    const optionId = key.name.split(":")[1]
    const count = await kv.get(key.name)
    results[optionId] = parseInt(count) || 0
  }

  return results
}
