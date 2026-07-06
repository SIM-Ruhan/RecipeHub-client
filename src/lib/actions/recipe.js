 "use client";

import { serverFetch } from "../core/server";

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
    throw new Error(data.message || "Failed to create recipe");
  }

  return data;
};




// Change to "use server" if you want this to act as a secure server-side bridge
// const res = await fetch(`${baseURL}/api/recipes`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(newRecipeData),
// });

// const text = await res.text();

// // console.log("Status:", res.status);
// // console.log("Response:", text);

// return;