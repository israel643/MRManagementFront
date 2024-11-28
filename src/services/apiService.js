const BASE_URL = "http://localhost:3000/api";

export async function fetchUserPermissions(userName) {
    
  //const response = await fetch(`${BASE_URL}${path}`);
  const response = await fetch(`${BASE_URL}/access/${userName}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      //Authorization: `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch permissions");
  }
  
  return response.json();
}
