    const baseURL = process.env.NEXT_PUBLIC_BASE_URL ;
export const getCompanyRecipe = async({companyId, status = "active"}) => {

const res = await fetch(`${baseURL}/api/recipes?companyId=${companyId}&status=${status}`)
return res.json();
}