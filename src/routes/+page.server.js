// import supabase from "$lib/supabaseClient";
// export async function load() {
//   const { data } = await supabase.from("DleSuggestions").select();
//   return {
//     dleSuggestions: data ?? [],
//   };
// }

// export async function sendDleSuggestion(json) {
//   const { data, error } = await supabase
//     .from('DleSuggestions')
//     .insert([json])
//     .select()

//   console.log(data)
//   console.log(error)
// }

// await sendDleSuggestion({"dle_name": "hocus pocus"})
// const { data, error } = supabase
// .from("DleSuggestion")
// .insert({ dle_name: "hocus pocus" });
// console.log(data, error);