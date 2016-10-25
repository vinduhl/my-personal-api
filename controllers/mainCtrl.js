const user = require("../user/user");
const skills = require("../skills/skillz");
const secrets = require("../secrets/secrets");

module.exports = {

  getName(req, res) {
    return res.status(200).json({ "name" : user.name });
  },

  getLocation(req, res) {
    return res.status(200).json({ "location": user.location });
  },

  getOccupations(req, res) {
    let occupations = user.occupations.slice(0);
    if(req.query.order === "asc") {
      occupations.sort();
    }
    if(req.query.order === "desc") {
      occupations.reverse();
    }
    return res.status(200).json({ "occupations": occupations });
  },

  getLatestOccupation(req, res) {
    return res.status(200).json( { "latestOccupation": user.occupations[user.occupations.length - 1] });
  },

  getHobbies(req, res) {
    let hobbies = user.hobbies.slice(0);
    if(req.params.type) {
      hobbies = hobbies.filter( hobby => {
        return hobby.type === req.params.type
      });
      if(hobbies.length === 0) {
        return res.status(401).json({ "message": `No hobbies for type ${req.params.type}` });
      }
    }
    return res.status(200).json({ "hobbies": hobbies });
  },

  getFamily(req, res) {
    let family = user.family.slice(0);
    if(req.params.gender) {
      family = family.filter( family => {
        return family.gender === req.params.gender;
      });
      if(family.length === 0) {
        return res.status(401).json({ "message": `No family members of gender ${req.params.gender}` });
      }
    }
    return res.status(200).json({ "family": family });
  },

  getRestaurants(req, res) {
    let restaurants = user.restaurants.slice(0);
    if(req.params.name) {
      restaurants = restaurants.filter( restaurant => {
        return restaurant.name.toLowerCase().indexOf(req.params.name.toLowerCase()) > -1;
      });
      if(restaurants.length === 0) {
        return res.status(401).json( { "message": `No restaurants with "${req.params.name}" in the name.` });
      }
    }
    return res.status(200).json({ "restaurants": restaurants });
  },

  updateName(req, res) {
    let newName = req.params.newName;
    if(newName) {
      user.name = newName;
      return res.status(200).json({ "message": `Updated name to ${ newName }` });
    }
    return res.status(400).json({ "message": "Requires a new name to update" });
  },

  updateLocation(req, res) {
    let newLocation = req.params.newLocation;
    if(newLocation) {
      user.location = newLocation;
      return res.status(200).json({ "message": `Updated location to ${ newLocation }` });
    }
    return res.status(400).json({ "message": "Requires a new newLocation to update" });
  },

  addHobby(req, res) {
    if(req.body && req.body.name && req.body.type) {
      user.hobbies.push(req.body);
      return res.status(201).json({ "message": "Added new hobby" });
    }
    return res.status(400).json({ "message": "Unable to add hobby." });
  },

  addOccupation(req, res) {
    if(req.body) {
      user.occupations.push(req.body);
      return res.status(201).json({ "message": "Added new occupation" });
    }
    return res.status(400).json({ "message": "Unable to add occupation." });
  },

  addFamilyMember(req, res) {
    if(req.body && req.body.name && req.body.relation && req.body.gender) {
      user.family.push(req.body);
      return res.status(201).json({ "message": "Added new family member." });
    }
    return res.status(400).json({ "message": "Unable to add new family member." });
  },

  addRestaurant(req, res) {
    if(req.body && req.body.name && req.body.type && req.body.rating) {
      user.restaurants.push(req.body);
      return res.status(201).json({ "message": "Added new restaurant." });
    }
    return res.status(400).json({ "message": "Unable to add new restaurant." });
  },

  getSkillz(req, res) {
    let skillsList = skills.slice(0);
    if(req.query.experience) {
      skillsList = skillsList.filter( skill => {
        return skill.experience === req.query.experience
      } );
    }
    return res.status(200).json({ "skills": skillsList });
  },

  postSkillz(req, res) {
    skills.push(req.body);
    return res.status(201).json({ "skills": skills });
  },

  getSecrets(req, res) {
    return res.status(200).json({ "secrets": secrets});
  }

}
