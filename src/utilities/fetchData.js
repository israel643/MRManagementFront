const BASE_URL = "http://localhost:3000/api";

export async function fetchData(route, method = "GET", body = null) {
    const options = {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : null,
    };  
    const response = await fetch(`${BASE_URL}${route}`, options);

    if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
    }

    return response.json();
};