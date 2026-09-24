import { json } from "@sveltejs/kit"
import pollsData from "$lib/data/polls.json"

export const prerender = true
export const trailingSlash = "never"

export function GET() {
  return json(pollsData)
}
