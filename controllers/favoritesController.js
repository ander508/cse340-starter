const favoritesModel = require("../models/favouritesModel");
const utilities = require("../utilities/");

async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    // req.flash("notice", "This is a flash message.")
    res.render("favorites/favorites", {
        title: "Fav",
        nav,
        errors: null
    })
}





async function buildFavoritesView(req, res, next) {
    
  try{

    let nav = await utilities.getNav()
    const account_id = res.locals.accountData.account_id;
    const favData = await favoritesModel.getFavorites(account_id);
    // req.flash("notice", "This is a flash message.")
    res.render("favorites/favorites", {
        title: "Favorite Vehicles",
        nav: nav,
        errors: null,
        favorites: favData?.rows || []
    })
  }
  catch (error) {
    res.status(500).send("An error occurred.");
  }

  
}

async function addFavorite(req, res) {
  try {
    const { inv_id } = req.body;
    const account_id = res.locals.accountData.account_id;

    await favoritesModel.addFavorite(account_id, inv_id);
    res.redirect("/fav");

  } 
  catch (error) {
  res.status(500).send(`
    <p>Vehicle is already in your favorites list.</p>
    <p><a href="/fav">Go to your favorites</a></p>
  `);
}
}




async function removeFavorite(req, res) {
  try {
    const { inv_id } = req.body;
    const account_id = res.locals.accountData.account_id;

    await favoritesModel.removeFavorite(account_id, inv_id);
    res.redirect("/fav");

  } 
  catch (error) {
  res.status(500).send(`
    <p>The vehicle does not exist.</p>
    <p><a href="/fav">Go to your favorites</a></p>
  `);
}
}

module.exports = { buildFavoritesView, addFavorite, removeFavorite,
  buildLogin
 };