import marketplace from "../configuration/marketplace.js";

async function findByUsername(username) {
  const query = await marketplace.query(
    "SELECT account_id, username, password FROM account WHERE TRIM (username) = $1",
    [username]
  );
  const result = query.rows[0];

  return result;
}

async function createAccount(username, password) {
  await marketplace.query(
    "INSERT INTO account (username, password) VALUES ($1, $2)",
    [username, password]
  );
}

export { findByUsername, createAccount };
