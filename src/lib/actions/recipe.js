// "use client";

// const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// export const CreateRecipe = async (newRecipeData) => {
//   const res = await fetch(`${baseURL}/api/recipes`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(newRecipeData),
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     console.log("Server Error:", data);
//     throw new Error(data.message || "Failed to create recipe");
//   }

//   return data;
// };



"use client";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const CreateRecipe = async (newRecipeData) => {
  const res = await fetch(`${baseURL}/api/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipeData),
  });

  const data = await res.json();

  if (!res.ok) {
    console.log("Server Error:", data);
    // ✅ Throws data.message exactly — so "LIMIT_REACHED" reaches the frontend catch
    throw new Error(data.message || "Failed to create recipe");
  }

  return data;
};