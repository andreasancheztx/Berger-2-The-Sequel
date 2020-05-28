var express = require("express");

var router = express.Router();
var db = require("../models");

// get route -> index
router.get("/", function (req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function (req, res) {
  // express callback response by calling burger.selectAllBurger
  db.Burger.findAll({}).then(function (burgerData) {
    console.log('Find Allllll')
    console.log(burgerData)
    // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
    res.render("index", { burger_data: burgerData });
  });
});

// post route -> back to index
router.post("/burgers/create", function (req, res) {
  // takes the request object using it as input for burger.addBurger
  const burger = {
    burger_name: req.body.burger_name,
    devoured: false
  }
  db.Burger.create(burger).then(function (data) {
    res.redirect("/");

  })
  // wrapper for orm.js that using MySQL insert callback will return a log to console,
  // render back to index with handle



});

// put route -> back to index
router.put("/burgers/:id", function (req, res) {
  const devoured = {
    devoured: true
  }
  db.Burger.update(devoured, {
    where: {
      id: req.params.id
    }
  }).then(function (result) {

    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    // Send back response and let page reload from .then in Ajax
    res.redirect("/");

  })
}
);

module.exports = router;
