const pool = require("../database/");

async function addFavorite(account_id, inv_id) {
  try {
    const sql =
      "INSERT INTO favorites (account_id, inv_id) VALUES ($1, $2) RETURNING *";
    return await pool.query(sql, [account_id, inv_id]);
  } catch (error) {
  console.error("DATABASE ERROR ADD FAVORITE:", error);   // show real reason
  throw error;  // do NOT replace with generic error
}
}

async function removeFavorite(account_id, inv_id) {
  try {
    const sql =
      "DELETE FROM favorites WHERE account_id = $1 AND inv_id = $2 RETURNING *";
    return await pool.query(sql, [account_id, inv_id]);
  } catch (error) {
    throw new Error("Unable to remove favorite.");
  }
}

async function getFavorites(account_id) {
  try {
    const sql = `
      SELECT i.inv_make, i.inv_model, i.inv_year, i.inv_id 
      FROM favorites f
      JOIN inventory i ON f.inv_id = i.inv_id
      WHERE f.account_id = $1
      ORDER BY f.created_at DESC`;
    return await pool.query(sql, [account_id]);
  } catch (error) {
    throw new Error("Unable to retrieve favorites.");
  }
}

module.exports = { addFavorite, removeFavorite, getFavorites };