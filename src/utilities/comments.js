import sendRequest from "./send-request";
const BASE_URL = "/comments/";

export async function createComment(game, user, comment) {
  const userData = {
    user: user._id,
    game: game,
    text: comment,
  };
  try {
    const result = await sendRequest(`${BASE_URL}/`, "POST", userData);
    return result;
  } catch {
    console.log("Failed to create comment");
  }
}

export async function getAllComments(game) {
  const result = await sendRequest(`${BASE_URL}${game}/`);
  return result;
}
