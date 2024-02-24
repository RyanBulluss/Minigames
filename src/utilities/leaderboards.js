import sendRequest from "./send-request";
const BASE_URL = "/leaderboards/";

export async function createScore(game, user, score, time) {
  const userData = {
    user: user._id,
    game: game,
    score: score,
    time: time
  };
  try {
    const result = await sendRequest(`${BASE_URL}/`, "POST", userData);
    return result;
  } catch {
    console.log("Failed to create score");
  }
}

export async function getLeaderboard(game) {
  const result = await sendRequest(`${BASE_URL}${game}/`);
  return result;
}
