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
  },

  updateName(req, res) {
    let newName = req.params.newName;
    if(newName) {
      user.name = newName;
      return res.status(200).json(`Updated name to ${ newName }`);
    }
    return res.status(400).json("Requires a new name to update");
  },

  updateLocation(req, res) {
    let newLocation = req.params.newLocation;
    if(newLocation) {
      user.location = newLocation;
      return res.status(200).json(`Updated location to ${ newLocation }`);
    }
    return res.status(400).json("Requires a new newLocation to update");
  },

  addHobby(req, res) {
    if(req.body && req.body.name && req.body.type) {
      user.hobbies.push(req.body);
      return res.status(201).json(user.hobbies);
    }
    return res.status(400).json("Unable to add hobby.");
  },

  addOccupation(req, res) {
    if(req.body) {
      user.occupations.push(req.body);
      return res.status(201).json(user.occupations);
    }
    return res.status(400).json("Unable to add occupation.");
  },

  addFamilyMember(req, res) {
    if(req.body && req.body.name && req.body.relation && req.body.gender) {
      user.family.push(req.body);
      return res.status(201).json(user.family);
    }
    return res.status(400).json("Unable to add new family member.");
  },

  addRestaurant(req, res) {
    if(req.body && req.body.name && req.body.type && req.body.rating) {
      user.restaurants.push(req.body);
      return res.status(201).json(user.restaurants);
    }
    return res.status(400).json("Unable to add new restaurant.");
  }



}
