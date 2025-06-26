import supabase from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }

  return data;
}
export async function createEditCabin(newCabin, id) {
  console.log(newCabin, id);

  const hasImagePath = newCabin.image?.startsWith?.(
    import.meta.env.VITE_SUPABASE_URL
  );
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `https://vnddwmfhjdxvpbonimvv.supabase.co/storage/v1/object/public/cabins-image//${imageName}`;
  //create edit/add cabin
  let query = supabase.from("cabins");

  //Creation
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  //Edit
  if (id) {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }
  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  //Upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase.storage
    .from("cabins-image")
    .upload(imageName, newCabin.image);

  //Delete cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("Cabin image could not be creted");
  }
  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
