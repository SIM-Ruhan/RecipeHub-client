

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
    const res = await fetch(`${baseURL}${path}`);
    //handle 401 404 403
    return await res.json();
}

export const serverMutation = async (path,data) => {
    const res = await fetch(`${baseURL}${path}`,{
        method: "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(data),
    })
}