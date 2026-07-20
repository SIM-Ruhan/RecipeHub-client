
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
  const res = await fetch(`${baseURL}${path}`);
  console.log(path, res.status);
  if (!res.ok) {
    console.error("serverFetch failed:", res.status, await res.text());
    return null;
  }
  return await res.json();
};

// export const protectedFetch = async (path) => {
//     const res = await fetch(`${baseURL}${path}`,
//     //handle 401 404 403
//     {
// headers: await authHeader()
//     })
        
//     return await res.json();
// }

// export const getUserToken = async () =>{
//      const session = await auth.api.getSession({
//         headers: await headers()
//     })
// return session?.session?.token || null;
// }


// export const authHeader = async () =>{
//     const token = await getUserToken();
//     const header = {
//         authorization : `Bearer ${token}`
//     }
//     return token ? header : {};
// }



export const serverMutation = async (path, data) => {
    const res = await fetch(`${baseURL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...await authHeader()
        },
        body: JSON.stringify(data),
    });

    // 1. Get the response data
    const result = await res.json();

    // 2. Check if the response was successful (status 200-299)
    if (!res.ok) {
        throw new Error(result.message || "Mutation failed");
    }

    // 3. IMPORTANT: Return the data so the caller can use it
    return result;
}