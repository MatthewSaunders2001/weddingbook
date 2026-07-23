import { supabase } from "../lib/supabase";

export async function uploadPhoto(file: File) {
  const fileName = `${Date.now()}-${file.name}`;

  const result = await supabase.storage
    .from("photos")
    .upload(fileName, file);

  console.log("Upload Result:", result);

  if (result.error) {
    console.error(result.error);
    throw result.error;
  }

  const { data } = supabase.storage
    .from("photos")
    .getPublicUrl(fileName);

  return data.publicUrl;
}