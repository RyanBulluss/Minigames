import sendRequest from "./send-request";
const BASE_URL = "/users";

export async function signUp(userData) {
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(userData) {
  return sendRequest(`${BASE_URL}/login`, 'POST', userData);
}

export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}