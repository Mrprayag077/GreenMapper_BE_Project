const Prayag1 = require("../server");
const Prayag = require("../models/model");
const path = require("path");
const fetch = require("node-fetch");
// const storage = firebase.storage().ref();
global.XMLHttpRequest = require("xhr2");

const crypto = require("crypto");
const nonce = crypto.randomBytes(16).toString("base64");

// Add the nonce to your CSP header

module.exports = {
  home_p: async (req, res) => {
    res.render("home");
  },

  map_p: async (req, res) => {
    // res.send("<b>hello prayag :)</b>"); // Assuming your form view is named "form.ejs"
    // res.render("map");
    res.render("map"); // Assuming your form view is named "form.ejs"
  },



  // map: async (req, res) => {
  //   res.render("map"); // Assuming your form view is named "form.ejs"
  //   // res.sendFile(path.join(__dirname + "/from.html")); // Assuming your form view is named "form.ejs"
  // },

  inputdata_form_get: async (req, res) => {
    res.send("<center><b>hello prayag :)</b></center>"); // Assuming your form view is named "form.ejs"

    // res.render("index", { nonce }); // Assuming your form view is named "form.ejs"
  },

  inputdata_form_post: async (req, res) => {
    console.log(req.body);

    const { imageUrl } = req.body;

    console.log("inisde post");
    console.log(imageUrl);

    try {
      // Create a new Prayag document
      const newPrayag = new Prayag({
        lat: 101,
        long: 101,
        image: imageUrl, // Assuming image is a URL or file path, modify this according to your use case
      });

      // Save the document to the database
      await newPrayag.save();

      // Respond with success message
      res.json({ message: "Image URL received successfully" });
    } catch (error) {
      // Handle errors and respond with an error message
      console.error(error);
      res.json({ message: "Image ERROR" });
    }
  },
};
