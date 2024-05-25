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

    try {
      const cardDataArray = await Prayag.find({ Docx_type: "post" }); // Retrieve all documents from the 'cards' collection

      console.log(cardDataArray);
      res.render('home', { cardDataArray, currentPage: 'home' }); // Render EJS template with the data
      // res.json({ cardDataArray, currentPage: 'home' }); // Render EJS template with the data
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }

  },

  map_p: async (req, res) => {
    console.log("MAP PAGE [START]");

    try {
      const RegionDataArray = await Prayag.find({ Docx_type: "region" });
      const NGODataArray = await Prayag.find({ Docx_type: "NGO" });
      const DRIVESDataArray = await Prayag.find({ Docx_type: "post" });

      console.log(RegionDataArray);
      console.log(NGODataArray);

      res.render("map", { RegionDataArray, currentPage: 'map', NGODataArray, DRIVESDataArray });
      // res.json({ RegionDataArray, currentPage: 'map' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }

    console.log("MAP PAGE [END]");
  },




  profile: async (req, res) => {
    res.render("profile");
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
        return res.status(404).send('<center>Not Found: No document found for the provided post_id.</center>');
      }


      console.log(post_details);
      res.render("post_individuals", { post_details });
      // res.json({ post_details });

    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  },

  post_individuals_post: async (req, res) => {
    // res.render("post_individuals");

    try {


      const post_id = req.query.post_id;
      const ngo_id = req.query.ngo_id;
      let hands = (req.query.hands);
      hands = Number(hands) + 1;

      console.log("hands", req.query.hands + "and" + hands);

      const doctype = "post";
      const drive_name = req.query.drive_name;
      const location = req.body.location;
      const phone = req.body.phone;
      const poster_link = req.query.postlink;
      const Description = req.body.Description;

      // console.log("post_id: " + post_id);
      // console.log("ngo_id: " + ngo_id);
      // console.log("hands: " + hands);
      // console.log("doctype: " + doctype);
      // console.log("drivename " + drive_name);
      // console.log("location: " + location);
      // console.log("phone: " + phone);
      // console.log("poster_link: " + poster_link);
      // console.log("Description: " + Description);


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

      // post_details.Ngo_id = ngo_id;
      // post_details.Post_id = post_id;
      // post_details.Drive_Name = drive_name;
      // post_details.Docx_type = doctype;
      // post_details.Location = location;
      // post_details.Phone = phone;
      // post_details.Poster_Link = poster_link;
      post_details.Hands = hands;
      // post_details.Description = Description;


      // Save the updated document
      await post_details.save();


      console.log(post_details);

      res.redirect('/api/success');

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
        Poster_Link: req.body.imageURL,
        Description: req.body.Description,
        Hands: 0,
        Reg_name: req.body.reg_name,
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


      // const ngo_id = req.query.ngo_id;
      const post_id = req.query.post_id;


      const drive_name = req.body.drive_name;
      const location = req.body.location;
      const phone = req.body.phone;
      const poster_link = req.body.imageURL;
      const description = req.body.Description;

      console.log("post_id: " + post_id);
      console.log("drive_name: " + drive_name);
      console.log("location: " + location);
      console.log("phone: " + phone);
      console.log("poster_link: " + poster_link);
      console.log("description: " + description);

      const existingDrive = await Prayag.findOne({ Post_id: post_id });

      if (!existingDrive) {
        return res.status(404).json({ status: 'error', message: 'Drive not found' });
      }

      existingDrive.Drive_Name = drive_name;
      existingDrive.Location = location;
      existingDrive.Phone = phone;
      existingDrive.Poster_Link = poster_link;
      existingDrive.Description = description;
      // existingDrive.Hands = hands;


      // // Save the updated document
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

    const result = await Prayag.find({ Docx_type: "charts" }).select({
      label_1: 1,
      label_2: 1,
      label_3: 1,
      label_4: 1,
      data_1: 1,
      data_2: 1,
      data_3: 1,
      data_4: 1,
    });

    console.log(result);

    const label1 = result[0].label_1;
    const label2 = result[0].label_2;
    const label3 = result[0].label_3;
    const label4 = result[0].label_4;

    const data1 = result[0].data_1;
    const data2 = result[0].data_2;
    const data3 = result[0].data_3;
    const data4 = result[0].data_4;

    res.render("dashboard", { label1, label2, label3, label4, data1, data2, data3, data4, currentPage: 'dashboard'  });
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
