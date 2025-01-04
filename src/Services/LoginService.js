import axios from "axios";
import { Loginendpoint } from "../utils/APIPath";
export async function loginUser(email, password) {
  try {
    const response = await axios.post(
      Loginendpoint,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          apiKey: import.meta.env.VITE_SUPABASE_KEY,
        },
      }
    );

    console.log("Login successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || error.message);
  }
}
