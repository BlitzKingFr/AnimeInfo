const BASE_URL = "https://api.jikan.moe/v4";


export async function fetchAnimeByName(query) {
  const response = await fetch(`${BASE_URL}/anime?q=${query}`);
  const data = await response.json();
  return data.data; 
}

export async function fetchTopAnime() {
  const response = await fetch(`${BASE_URL}/top/anime?limit=24`);
  const data = await response.json();
  return data.data;
}


export async function fetchAnimeById(id) {
  const response = await fetch(`${BASE_URL}/anime/${id}`);
  const data = await response.json();
  return data.data; 
}
