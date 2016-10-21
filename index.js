const express = require("express");
const { json } = require("body-parser");
const middleware = require("./controllers/middleware.js");
const mainCtrl = require("./controllers/mainCtrl.js");

const app = express();
const port = 8800;

app.use( json() );
app.use( middleware.addHeaders );


app.get("/api/name", mainCtrl.getName);
app.get("/api/location", mainCtrl.getLocation);
app.get("/api/occupations", mainCtrl.getOccupations);
app.get("/api/occupations/latest", mainCtrl.getLatestOccupation);
app.get("/api/hobbies", mainCtrl.getHobbies);
app.get("/api/hobbies/:type", mainCtrl.getHobbies);
app.get("/api/family", mainCtrl.getFamily);
app.get("/api/family/:gender", mainCtrl.getFamily);
app.get("/api/restaurants", mainCtrl.getRestaurants);
app.get("/api/restaurants/:name", mainCtrl.getRestaurants);



app.listen(port, function () {
  console.log("It's working here");
});
