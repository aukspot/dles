// import supabase from "$lib/supabaseClient";
// import { fail } from '@sveltejs/kit';

// export const actions = {
// 	default: async ({request}) => {
//     const data = await request.formData()
//     const dle_url = data.get("url")
//     const dle_description = data.get("description")
//     const comments = data.get("comments")

//     if ([dle_url, dle_description, comments].every((s) => s.length == 0)) {
//       console.log("ERROR EMPTY STRINGS");
//       return fail(400)
//     }
//     console.log(data)
// 		let { supaData, error } = await supabase
//       .from('DleSuggestions')
//       .insert([{dle_url, dle_description, comments}])
//       .select()

//     console.log(supaData)
//     if (error) {
//       return fail(422, {
//         error: error.message
//       })
//     }
//     return {success: true}
// 	}
// };