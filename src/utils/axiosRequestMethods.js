import axios from "axios";

const BASE_URL = "http://localhost:4000";

// const TOKEN = localStorage?.getItem("persist:root") && JSON.parse(JSON.parse(localStorage?.getItem("persist:root"))?.currentUser)?.accessToken;
//in above line i have used optionl chaining and it makes code hard to read so i made a simpler function

function getAccessToken() {
  try {
    if (typeof window !== "undefined") {
      const storage = JSON.parse(localStorage.getItem("user"));
      return storage ? storage.accessToken : null;
    }
  } catch (error) {
    console.error("Error retrieving access token:", error);
  }
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${getAccessToken()}` },
});

userRequest.interceptors.request.use((config) => {
  try {
    const newToken = getAccessToken();
    if (newToken) {
      config.headers.token = `Bearer ${newToken}`;
    }
  } catch (error) {
    console.error("Error updating request with new token:", error);
  }
  return config;
});
