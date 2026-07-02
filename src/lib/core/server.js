

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async (path) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${path}`);
    //handle 401 404 403
    console.log(path)
    return await res.json();
}

// export const serverMutation = async (path,data) => {
//     const res = await fetch(`${baseURL}${path}`,{
//         method: "POST",
//         headers : {
//             "Content-Type" : "application/json",
//         },
//         body : JSON.stringify(data),
//     })
// }



export const serverMutation = async (path, data) => {
    const res = await fetch(`${baseURL}${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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