"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiTrash, BiSave, BiLoaderAlt } from "react-icons/bi";
import toast from "react-hot-toast";
import { CreateRecipe } from "@/lib/actions/recipe";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function AddRecipePage() {
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Dynamic Input Handlers
  const addField = (setter, list) => setter([...list, ""]);

  const removeField = (setter, list, index) => {
    if (list.length === 1) return;
    setter(list.filter((_, i) => i !== index));
  };

  const updateField = (setter, list, index, value) => {
    const newList = [...list];
    newList[index] = value;
    setter(newList);
  };

  // ImgBB Upload
  const uploadToImgBB = async (file) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) throw new Error("ImgBB API key is missing.");

    const imgFormData = new FormData();
    imgFormData.append("image", file);

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: imgFormData,
    });

    const result = await response.json();
    if (result.success) return result.data.url;
    throw new Error("ImgBB Upload Failed");
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);
    const imageFile = formData.get("imageFile");

    if (!imageFile || imageFile.size === 0) {
      toast.error("Please select an image file to upload.");
      setIsSubmitting(false);
      return;
    }

    const toastId = toast.loading("Uploading recipe image...");

    try {
      // 1. Upload image to ImgBB
      const hostedImageUrl = await uploadToImgBB(imageFile);

      // 2. Build payload — NO hardcoded plan here, plan lives on the user in DB
      const newRecipeData = {
        recipeName: formData.get("title"),
        recipeImage: hostedImageUrl,
        category: formData.get("category"),
        cuisineType: formData.get("cuisine"),
        difficultyLevel: formData.get("difficulty"),
        preparationTime: Number(formData.get("prepTime")),
        price: Number(formData.get("price")),
        ingredients: ingredients.filter((item) => item.trim() !== ""),
        instructions: instructions.filter((item) => item.trim() !== ""),
        authorId: user?.id || "anonymous",
        authorName: user?.name || "Anonymous Chef",
        authorEmail: user?.email || "example@gmail.com",
        likesCount: 0,
        isFeatured: false,
        status: "active",
        userPlan: user?.plan || "free",
      };

      // 3. Save to DB — the API will enforce the plan limit
      toast.loading("Saving recipe...", { id: toastId });
      const res = await CreateRecipe(newRecipeData);

      if (res?.insertedId || res?.success) {
        toast.success("Recipe published successfully!", { id: toastId });
        form.reset();
        setIngredients([""]);
        setInstructions([""]);
      } else {
        toast.error("Failed to submit recipe.", { id: toastId });
      }

    } catch (error) {
      console.error(error);

      // ✅ If API returned a 403 plan-limit error, redirect to /pricing
      if (error.message === "LIMIT_REACHED") {
        toast.error("Recipe limit reached! Purchase a plan...", {
          id: toastId,
          duration: 3000,
        });
        setTimeout(() => router.push("/pricing"), 1500);
      } else {
        toast.error(error.message || "An unexpected error occurred.", { id: toastId });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
    >
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Recipe</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Recipe Name</label>
            <input
              name="title"
              required
              disabled={isSubmitting}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
              placeholder="e.g. Spicy Thai Curry"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Recipe Image</label>
            <input
              type="file"
              name="imageFile"
              accept="image/*"
              required
              disabled={isSubmitting}
              className="w-full p-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Category</label>
            <select
              name="category"
              disabled={isSubmitting}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
            >
              <option value="Appetizer">Appetizer</option>
              <option value="Main Course">Main Course</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Cuisine Type</label>
            <input
              name="cuisine"
              required
              disabled={isSubmitting}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
              placeholder="e.g. Italian"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Difficulty</label>
            <select
              name="difficulty"
              disabled={isSubmitting}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Prep Time (mins)</label>
            <input
              name="prepTime"
              type="number"
              required
              disabled={isSubmitting}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
              placeholder="30"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Price ($)</label>
            <input
              name="price"
              type="number"
              step="0.01"
              required
              disabled={isSubmitting}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
              placeholder="4.99"
            />
          </div>
        </div>

        {/* Ingredients */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex gap-2">
              <input
                value={ingredient}
                disabled={isSubmitting}
                onChange={(e) => updateField(setIngredients, ingredients, index, e.target.value)}
                className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
                placeholder={`Ingredient ${index + 1}`}
              />
              <button
                type="button"
                disabled={isSubmitting || ingredients.length === 1}
                onClick={() => removeField(setIngredients, ingredients, index)}
                className="p-3 text-red-500 hover:bg-red-50 rounded-xl disabled:opacity-30"
              >
                <BiTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => addField(setIngredients, ingredients)}
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Instructions */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-700">Instructions</label>
          {instructions.map((instruction, index) => (
            <div key={index} className="flex gap-2">
              <textarea
                rows={2}
                value={instruction}
                disabled={isSubmitting}
                onChange={(e) => updateField(setInstructions, instructions, index, e.target.value)}
                className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
                placeholder={`Step ${index + 1}`}
              />
              <button
                type="button"
                disabled={isSubmitting || instructions.length === 1}
                onClick={() => removeField(setInstructions, instructions, index)}
                className="p-3 text-red-500 hover:bg-red-50 rounded-xl disabled:opacity-30"
              >
                <BiTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => addField(setInstructions, instructions)}
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
          >
            + Add Step
          </button>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:bg-emerald-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <BiLoaderAlt className="text-xl animate-spin" /> : <BiSave className="text-xl" />}
          {isSubmitting ? "Processing..." : "Save Recipe"}
        </button>
      </form>
    </motion.div>
  );
}




// "use client";

// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { BiTrash, BiSave, BiLoaderAlt } from "react-icons/bi";
// import toast from "react-hot-toast";
// import { CreateRecipe } from "@/lib/actions/recipe";
// import { authClient } from "@/lib/auth-client";
// import { useRouter } from "next/navigation";

// export default function AddRecipePage() {
//   const [ingredients, setIngredients] = useState([""]);
//   const [instructions, setInstructions] = useState([""]);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const router = useRouter();
//   const { data: session, isPending } = authClient.useSession();
//   const user = session?.user;

//   // Dynamic Input Handlers
//   const addField = (setter, list) => setter([...list, ""]);

//   const removeField = (setter, list, index) => {
//     if (list.length === 1) return;
//     setter(list.filter((_, i) => i !== index));
//   };

//   const updateField = (setter, list, index, value) => {
//     const newList = [...list];
//     newList[index] = value;
//     setter(newList);
//   };

//   // ImgBB Upload
//   const uploadToImgBB = async (file) => {
//     const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
//     if (!apiKey) throw new Error("ImgBB API key is missing.");

//     const imgFormData = new FormData();
//     imgFormData.append("image", file);

//     const response = await fetch(
//       `https://api.imgbb.com/1/upload?key=${apiKey}`,
//       { method: "POST", body: imgFormData }
//     );

//     const result = await response.json();
//     if (result.success) return result.data.url;
//     throw new Error("ImgBB Upload Failed");
//   };

//   // Submit Handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // ✅ Guard: session must be loaded before submitting
//     if (isPending) {
//       toast.error("Please wait, loading your session...");
//       return;
//     }

//     // ✅ Guard: user must be logged in
//     if (!user?.id) {
//       toast.error("You must be logged in to add a recipe.");
//       return;
//     }

//     setIsSubmitting(true);

//     const form = e.target;
//     const formData = new FormData(form);
//     const imageFile = formData.get("imageFile");

//     if (!imageFile || imageFile.size === 0) {
//       toast.error("Please select an image file to upload.");
//       setIsSubmitting(false);
//       return;
//     }

//     const toastId = toast.loading("Uploading recipe image...");

//     try {
//       // 1. Upload image to ImgBB
//       const hostedImageUrl = await uploadToImgBB(imageFile);

//       // 2. Build payload
//       const newRecipeData = {
//         recipeName:      formData.get("title"),
//         recipeImage:     hostedImageUrl,
//         category:        formData.get("category"),
//         cuisineType:     formData.get("cuisine"),
//         difficultyLevel: formData.get("difficulty"),
//         preparationTime: Number(formData.get("prepTime")),
//         price:           Number(formData.get("price")),
//         ingredients:     ingredients.filter((i) => i.trim() !== ""),
//         instructions:    instructions.filter((i) => i.trim() !== ""),
//         authorId:        user.id,
//         authorName:      user.name  || "Anonymous Chef",
//         authorEmail:     user.email || "",
//         likesCount:      0,
//         isFeatured:      false,
//         status:          "active",
//         // ✅ Send plan — backend enforces the real limit
//         // Tries common field names in case your auth stores it differently
//         userPlan: user?.plan || user?.subscription || user?.tier || "free",
//       };

//       // 3. Save — backend enforces plan limit
//       toast.loading("Saving recipe...", { id: toastId });
//       const res = await CreateRecipe(newRecipeData);

//       if (res?.insertedId || res?.success) {
//         toast.success("Recipe published successfully!", { id: toastId });
//         form.reset();
//         setIngredients([""]);
//         setInstructions([""]);
//       } else {
//         toast.error("Failed to submit recipe.", { id: toastId });
//       }

//     } catch (error) {
//       console.error(error);

//       if (error.message === "LIMIT_REACHED") {
//         // ✅ Show toast then redirect to pricing after 1.5s
//         toast.error(
//           "You've used all your free recipe slots! Redirecting to pricing...",
//           { id: toastId, duration: 3000 }
//         );
//         setTimeout(() => router.push("/pricing"), 1500);
//       } else if (error.message === "You must be logged in to create a recipe.") {
//         toast.error("Please log in to add recipes.", { id: toastId });
//         router.push("/login");
//       } else {
//         toast.error(error.message || "An unexpected error occurred.", { id: toastId });
//       }
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="max-w-4xl mx-auto bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
//     >
//       <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Recipe</h1>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700">Recipe Name</label>
//             <input
//               name="title"
//               required
//               disabled={isSubmitting}
//               className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
//               placeholder="e.g. Spicy Thai Curry"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700">Recipe Image</label>
//             <input
//               type="file"
//               name="imageFile"
//               accept="image/*"
//               required
//               disabled={isSubmitting}
//               className="w-full p-2 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none file:mr-4 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 disabled:opacity-50"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700">Category</label>
//             <select
//               name="category"
//               disabled={isSubmitting}
//               className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
//             >
//               <option value="Appetizer">Appetizer</option>
//               <option value="Main Course">Main Course</option>
//               <option value="Dessert">Dessert</option>
//             </select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700">Cuisine Type</label>
//             <input
//               name="cuisine"
//               required
//               disabled={isSubmitting}
//               className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
//               placeholder="e.g. Italian"
//             />
//           </div>

//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700">Difficulty</label>
//             <select
//               name="difficulty"
//               disabled={isSubmitting}
//               className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
//             >
//               <option value="Easy">Easy</option>
//               <option value="Medium">Medium</option>
//               <option value="Hard">Hard</option>
//             </select>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700">Prep Time (mins)</label>
//             <input
//               name="prepTime"
//               type="number"
//               required
//               disabled={isSubmitting}
//               className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
//               placeholder="30"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-gray-700">Price ($)</label>
//             <input
//               name="price"
//               type="number"
//               step="0.01"
//               required
//               disabled={isSubmitting}
//               className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
//               placeholder="4.99"
//             />
//           </div>

//         </div>

//         {/* Ingredients */}
//         <div className="space-y-3">
//           <label className="text-sm font-semibold text-gray-700">Ingredients</label>
//           {ingredients.map((ingredient, index) => (
//             <div key={index} className="flex gap-2">
//               <input
//                 value={ingredient}
//                 disabled={isSubmitting}
//                 onChange={(e) => updateField(setIngredients, ingredients, index, e.target.value)}
//                 className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
//                 placeholder={`Ingredient ${index + 1}`}
//               />
//               <button
//                 type="button"
//                 disabled={isSubmitting || ingredients.length === 1}
//                 onClick={() => removeField(setIngredients, ingredients, index)}
//                 className="p-3 text-red-500 hover:bg-red-50 rounded-xl disabled:opacity-30"
//               >
//                 <BiTrash />
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             disabled={isSubmitting}
//             onClick={() => addField(setIngredients, ingredients)}
//             className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
//           >
//             + Add Ingredient
//           </button>
//         </div>

//         {/* Instructions */}
//         <div className="space-y-3">
//           <label className="text-sm font-semibold text-gray-700">Instructions</label>
//           {instructions.map((instruction, index) => (
//             <div key={index} className="flex gap-2">
//               <textarea
//                 rows={2}
//                 value={instruction}
//                 disabled={isSubmitting}
//                 onChange={(e) => updateField(setInstructions, instructions, index, e.target.value)}
//                 className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none disabled:bg-gray-50"
//                 placeholder={`Step ${index + 1}`}
//               />
//               <button
//                 type="button"
//                 disabled={isSubmitting || instructions.length === 1}
//                 onClick={() => removeField(setInstructions, instructions, index)}
//                 className="p-3 text-red-500 hover:bg-red-50 rounded-xl disabled:opacity-30"
//               >
//                 <BiTrash />
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             disabled={isSubmitting}
//             onClick={() => addField(setInstructions, instructions)}
//             className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 disabled:opacity-50"
//           >
//             + Add Step
//           </button>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting || isPending}
//           className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:bg-emerald-400 disabled:cursor-not-allowed"
//         >
//           {isSubmitting
//             ? <BiLoaderAlt className="text-xl animate-spin" />
//             : <BiSave className="text-xl" />
//           }
//           {isSubmitting ? "Processing..." : "Save Recipe"}
//         </button>

//       </form>
//     </motion.div>
//   );
// }