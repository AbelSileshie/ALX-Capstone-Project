import axios from "axios";

export async function FetchMovieDetails(apiUrl) {
  if (!navigator.onLine) {
    console.warn("No internet connection. Redirecting...");
    window.location.href = "/Nointernet";
    return null;
  }

  try {
    const response = await axios.get(apiUrl, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzEyNDQwOGZlZmY3N2MxYzcwNWQyMDBkN2M3M2MwNCIsIm5iZiI6MTcxMDAyMTA3Ni4zNjksInN1YiI6IjY1ZWNkOWQ0NDQ3ZjljMDE2NDVlZmQ0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ykjXa41EMXnCFm9sfWTnIk5LADCBScf7EI8iQFoMFFM",
      },
      timeout: 10000,
    });
    if (response.status === 200) {
      return response.data || {}; // Expecting an object for movie details
    } else {
      console.warn(`Unexpected response status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error(
      "Error occurred while fetching movie details:",
      error.message
    );
    throw error;
  }
}
