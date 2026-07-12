import { serverFetch } from "./core/server";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL ;

export const getRecipe = async () =>{
    return serverFetch("/api/recipes");
}

export const getRecipeId = async(recipeId) => {
    return serverFetch(`/api/recipes/${recipeId}`);
}

export const getCompanyRecipe = async({authorId, status = "active"}) => {

const res = await fetch(`${baseURL}/api/recipes?authorId=${authorId}&status=${status}`)
console.log(baseURL)
console.log(authorId)
return res.json();
}

export async function getRecipeStatus(recipeId, userId) {
    if (!userId) return { isLiked: false, isSaved: false };
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/recipes/${recipeId}/status?userId=${userId}`,
            { cache: 'no-store' }
        );
        if (!res.ok) return { isLiked: false, isSaved: false };
        return res.json();
    } catch (error) {
        console.error("Failed to fetch recipe status", error);
        return { isLiked: false, isSaved: false };
    }
}

export const getSellerStats = async (authorId) => {
  const res = await fetch(`${baseURL}/api/recipes/stats/${authorId}`);
  return res.json();
};

export const getAdminReports = async (status = "pending") => {
  const res = await fetch(`${baseURL}/api/admin/reports?status=${status}`, { cache: "no-store" });
  return res.json();
};

export const dismissReport = async (reportId) => {
  const res = await fetch(`${baseURL}/api/admin/reports/${reportId}/dismiss`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Dismiss failed");
  return res.json();
};

export const removeReportedRecipe = async (reportId) => {
  const res = await fetch(`${baseURL}/api/admin/reports/${reportId}/remove-recipe`, {
    method: "PATCH",
  });
  if (!res.ok) throw new Error("Remove failed");
  return res.json();
};