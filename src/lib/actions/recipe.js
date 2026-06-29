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



// Change to "use server" if you want this to act as a secure server-side bridge
"use server"; 

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const CreateRecipe = async (newRecipeData) => {
  const res = await fetch(`${baseURL}/api/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipeData), // This sends the entire object including userPlan
  });

  const data = await res.json();

  if (!res.ok) {
    // If the error message is specifically "LIMIT_REACHED", 
    // we want to ensure the frontend can identify it easily.
    const error = new Error(data.message || "Failed to create recipe");
    error.errorCode = data.errorCode; // Attach the code if it exists
    throw error;
  }

  return data;
};