const user = require("../user/user.js");

module.exports = {

  getName(req, res) {
    return res.status(200).json(user.name);
  },

  getLocation(req, res) {
    return res.status(200).json(user.location);
  },

  getOccupations(req, res) {
    if(req.query.order === "asc") {
      return res.status(200).json(user.occupations.sort());
    }
    if(req.query.order === "desc") {
      return res.status(200).json(user.occupations.reverse());
    }
    return res.status(200).json(user.occupations);
  },

  getLatestOccupation(req, res) {
    return res.status(200).json(user.occupations[user.occupations.length - 1]);
  },

  getHobbies(req, res) {
    let hobbies = [];
    if(req.params.type) {
      hobbies = user.hobbies.filter( hobby => {
        return hobby.type === req.params.type
      });
      if(hobbies.length === 0) {
        return res.status(401).json(`No hobbies for type ${req.params.type}`);
      }
      return res.status(200).json(hobbies);
    }
    return res.status(200).json(user.hobbies);
  },

  getFamily(req, res) {
    let family = [];
    if(req.params.gender) {
      family = user.family.filter( family => {
        return family.gender === req.params.gender;
      });
      if(family.length === 0) {
        return res.status(401).json(`No family members of gender ${req.params.gender}`);
      }
      return res.status(200).json(family);
    }
    return res.status(200).json(user.family);
  },

  getRestaurants(req, res) {
    let restaurants = [];
    if(req.params.name) {
      restaurants = user.restaurants.filter( restaurant => {
        return restaurant.name.toLowerCase().indexOf(req.params.name.toLowerCase()) > -1;
      });
      if(restaurants.length === 0) {
        return res.status(401).json(`No restaurants with "${req.params.name}" in the name.`);
      }
      return res.status(200).json(restaurants);
    }
    return res.status(200).json(user.restaurants);
  }
}
