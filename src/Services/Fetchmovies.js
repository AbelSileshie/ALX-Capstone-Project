import axios from "axios";
export async function FetchMovies(url) {
  if (!navigator.onLine) {
    console.warn("No internet connection. Redirecting...");
    window.location.href = "/Nointernet";
    return null;
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `${import.meta.env.VITE_TMDB_API_KEY}`,
      },
      timeout: 10000,
    });

    if (response.status === 200) {
      return response.data.results || [];
    } else {
      console.warn(`Unexpected response status: ${response.status}`);
      return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error occurred:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("No response received:", error.request);
      }
    } else {
      console.error("Non-Axios error occurred:", error.message);
    }
    throw error;
  }
}
