import marketplace from "../configuration/marketplace.js";

async function saveRefreshToken(account_id, token) {
  await marketplace.query(
    "INSERT INTO refresh_token (account_id, token) VALUES ($1, $2)",
    [account_id, token]
  );
}

async function findRefreshToken(token) {
  const result = await marketplace.query(
    "SELECT token from refresh_token WHERE token = $1",
    [token]
  );

  return result.rows[0];
}

async function deleteRefreshToken(token) {
  await marketplace.query("DELETE FROM refresh_token WHERE token  = $1", [
    token,
  ]);
}

export { saveRefreshToken, findRefreshToken, deleteRefreshToken };
