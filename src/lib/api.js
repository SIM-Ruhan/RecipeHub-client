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

