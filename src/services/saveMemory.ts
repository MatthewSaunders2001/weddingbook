import { supabase } from "../lib/supabase";

export async function saveMemory(
  prompt: string,
  photoUrl: string,
  message: string
) {
  const { error } = await supabase
    .from("memories")
    .insert({
      prompt,
      photo_url: photoUrl,
      message,
    });

  if (error) {
    throw error;
  }
}