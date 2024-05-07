// FETCHER

async function fetcher(request) {
    try {
        const response = await fetch(request);
        const jsonResponse = await response.json();
        const result = {
            ok: response.ok,
            status: response.status,
            data: jsonResponse
        };
        console.log(result.data)
        if (!response.ok) {
            return result; 
        }
        return result; 
    } catch (error) {
        console.error("Fetching error:", error);
        throw new Error(`Fetching error: ${error.message}`);
    }
}
