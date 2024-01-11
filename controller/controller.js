const Prayag1 = require("../server");
const Prayag = require("../models/model");
require("../server");
const path = require("path");
const fetch = require("node-fetch");
// const storage = firebase.storage().ref();
global.XMLHttpRequest = require("xhr2");

const crypto = require("crypto");
const nonce = crypto.randomBytes(16).toString("base64");

// Add the nonce to your CSP header


function generateUniqueDriveId() {
  // Implement your logic to generate a unique 6-digit drive ID (e.g., using random numbers)
  return Math.floor(100000 + Math.random() * 900000).toString();
};

module.exports = {
  home_p: async (req, res) => {
    res.render("home");
  },

  map_p: async (req, res) => {
    res.render("map");
  },


  //NORMAL POST
  post_individuals_get: async (req, res) => {
    // res.render("post_individuals");

    try {

      const post_id = req.query.post_id;

      console.log("post_id: " + post_id);

      // Check if post_id is provided
      if (!post_id) {
        return res.status(400).send('Bad Request: Missing post_id in the query parameters.');
      }

      // Retrieve the document from the database based on post_id
      const post_details = await Prayag.findOne({ Post_id: post_id });

      // Check if the document is found
      if (!post_details) {
        return res.status(404).send('Not Found: No document found for the provided post_id.');
      }


      console.log(post_details);

      res.render("post_individuals", { post_details });

    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },


  post_individuals_post: async (req, res) => {
    // res.render("post_individuals");

    try {

      const post_id = req.query.post_id;

      console.log("post_id: " + post_id);

      // Check if post_id is provided
      if (!post_id) {
        return res.status(400).send('Bad Request: Missing post_id in the query parameters.');
      }

      // Retrieve the document from the database based on post_id
      const post_details = await Prayag.findOne({ Post_id: post_id });

      // Check if the document is found
      if (!post_details) {
        return res.status(404).send('Not Found: No document found for the provided post_id.');
      }


      console.log(post_details);

      res.redirect('/success');

    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },




  //NEW POST 
  post_org_new_get: async (req, res) => {
    res.render("post_org_new");
  },

  post_org_new_post: async (req, res) => {
    try {
      console.log("post_org_new_post");

      const MAX_RETRY_ATTEMPTS = 10;
      const RETRY_DELAY_MS = 200;

      const driveId = generateUniqueDriveId();
      console.log(driveId);

      // Create a new Drive document in MongoDB without label_1 and data_1
      const newDrive = new Prayag({
        Docx_type: 'post',
        Ngo_id: 1234232,
        Post_id: driveId,
        Drive_Name: req.body.driveName,
        Location: req.body.location,
        Phone: req.body.phone,
        Poster_Link: "djjdnjnjdnj",
      });

      console.log(newDrive);

      await newDrive.save();

      console.log(driveId);

      res.redirect("/api/");
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },



  // post_org_new_post: async (req, res) => {

  //   try {

  //     console.log("post_org_new_post");

  //     const MAX_RETRY_ATTEMPTS = 10;  // Adjust this value based on your requirements
  //     const RETRY_DELAY_MS = 200;  // Adjust this value based on your requirements

  //     // Generate a unique 6-digit drive ID
  //     const driveId = generateUniqueDriveId();
  //     console.log(driveId);

  //     // for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
  //     //   const existingDrive = await Prayag.findOne({ Post_id: driveId });
  //     //   if (existingDrive) {
  //     //     console.log("caught");
  //     //     // No collision, proceed with saving the new drive
  //     //     break;
  //     //   }
  //     //   // If there's a collision, wait for a short delay before the next attempt
  //     //   await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
  //     // }

  //     // Create a new Drive document in MongoDB
  //     const newDrive = new Prayag({
  //       Docx_type: 'post',
  //       Ngo_id: 1234232, // Make sure to include NGO ID in the form
  //       Post_id: driveId,
  //       Drive_Name: req.body.driveName,
  //       Location: req.body.location,
  //       Phone: req.body.phone,
  //       Poster_Link: "djjdnjnjdnj",
  //     });


  //     console.log(newDrive);

  //     await newDrive.save();

  //     // Send the generated drive ID to the client
  //     console.log(driveId);

  //     // res.render("post_org_new");



  //     // await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));

  //     res.redirect("/api/");
  //     // res.status(200).json({ status: 'success', message: 'Drive saved successfully!' });


  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Server Error');
  //   }
  // },


  //UPDATE POST
  post_org_update_get: async (req, res) => {
    try {

      const post_id = req.query.post_id;

      console.log("post_id: " + post_id);

      // Check if post_id is provided
      if (!post_id) {
        return res.status(400).send('Bad Request: Missing post_id in the query parameters.');
      }

      // Retrieve the document from the database based on post_id
      const postDocument = await Prayag.findOne({ Post_id: post_id });

      // Check if the document is found
      if (!postDocument) {
        return res.status(404).send('Not Found: No document found for the provided post_id.');
      }


      console.log(postDocument);
      // Render thpostDocumentg_new" view and pass the document data
      res.render("post_org_update", { postDocument });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },

  post_org_update_post: async (req, res) => {

    try {


      const ngo_id = req.query.ngo_id;
      const post_id = req.query.post_id;
      const hands = req.query.hands;

      const drive_name = req.body.drive_name;
      const location = req.body.location;
      const phone = req.body.phone;
      const poster_link = req.body.poster_link;

      console.log("post_id: " + post_id + " phone: " + phone + " poster_link: " + poster_link + " location" + location + " drive_name: " + drive_name);



      const existingDrive = await Prayag.findOne({ Post_id: post_id });

      if (!existingDrive) {
        return res.status(404).json({ status: 'error', message: 'Drive not found' });
      }

      existingDrive.Ngo_id = ngo_id;
      existingDrive.Post_id = post_id;
      existingDrive.Drive_Name = drive_name;
      existingDrive.Location = location;
      existingDrive.Phone = phone;
      existingDrive.Poster_Link = poster_link;
      existingDrive.Hands = hands;


      // Save the updated document
      await existingDrive.save();
      // await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));

      res.redirect("/api/success");

    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },



  //SUCCESS 

  success_get: async (req, res) => {
    res.render("success");
  },

  dashboard_get: async (req, res) => {

    const result = await Prayag.find({ Docx_type: "charts" });

    const label1 = result[0].label_1;
    const label2 = result[0].label_2;
    const label3 = result[0].label_3;
    const label4 = result[0].label_4;

    const data1 = result[0].data_1;
    const data2 = result[0].data_2;
    const data3 = result[0].data_3;
    const data4 = result[0].data_4;

    res.render("dashboard", { label1, label2, label3, label4, data1, data2, data3, data4 });
  },

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
