const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
const prettier = require("prettier");
const mongoose = require("mongoose");
//const User = require("./users");
const path = require("path");
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const axios = require("axios");
require("dotenv").config();
const sharp = require("sharp");
const schedule = require("node-schedule");
const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

const app = express();

const userRoutes = require("./routes/router");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


const Prayag = require("./models/model");
// Require and run server.js
require("./server");

app.use(express.static(__dirname + '/assests'));

app.use("/assests", express.static(path.join(__dirname, "assests")));
app.use("/assests/css", express.static(path.join(__dirname, "css")));
app.use("/assests/demo", express.static(path.join(__dirname, "demo")));
app.use("/assests/images", express.static(path.join(__dirname, "images")));
app.use("/assests/img", express.static(path.join(__dirname, "img")));
app.use("/assests/js", express.static(path.join(__dirname, "js")));
app.use("/assests/scss", express.static(path.join(__dirname, "scss")));



app.use(express.static(__dirname + "/map.html"));

app.use(express.static(__dirname + "/views"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");



app.use("/api/", userRoutes);

mongoose.set("strictQuery", false);





let Docdata;

// // bot logic =================================================================
const firebaseConfig = {
  apiKey: "AIzaSyDa7kvj9JGl9vO4CzwCtIvXf_sjyCgk41Q",
  authDomain: "greenmapper-da4bf.firebaseapp.com",
  projectId: "greenmapper-da4bf",
  storageBucket: "greenmapper-da4bf.appspot.com",
  messagingSenderId: "729535270764",
  appId: "1:729535270764:web:cc9987a3d1b9e84be8ad49",
  measurementId: "G-9ZHQP5SXLL",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);






async function WebHarvest() {
  // const usersinfosp = await usersinfos.find({ request_send_trigger: "today" });



  // const documents = await Prayag.find({ set_img: true }).toArray();

  const documents = await Prayag.find({ Docx_type: "region", sat_img: false }).exec();

  if (documents.length === 0) {
    console.log("No documents with sat_img set to true. Exiting function.");
    return;
  }

  console.log(documents);



  await new Promise((resolve) => setTimeout(resolve, 3000));




  //   const browser = await puppeteer.launch({ headless: false });
  const browser = await puppeteer.launch({
    headless: false,
    // args: ["--start-maximized"], // This argument will make the browser window fullscreen
    defaultViewport: null,
    permissions: ["notifications"], // Deny the notification permission
    args: ["--disable-notifications"], // Disable notifications
  });

  const page = await browser.newPage();

  await page.addStyleTag({
    content: `
    body, html {
       zoom: 80% !important;
      width: 10% !important;
      height: 10% !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
    }

    .specific-container {
      width: 50% !important;
      height: 50% !important;
    }
  `,
  });

  await page.goto("https://crop-monitoring.eos.com/login");

  // Fill in email input field

  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Click on "Continue" button

  // Wait for the button inside the second div to be present in the DOM
  await page.waitForSelector(
    '.button-wrap:nth-child(2) button[data-id="sign-in-button"]',
    { visible: true }
  );

  // Click the button inside the second div
  await page.click(
    '.button-wrap:nth-child(2) button[data-id="sign-in-button"]'
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Fill in email input field
  await page.waitForSelector(".mat-mdc-input-element", { visible: true });
  await page.type(".mat-mdc-input-element", `${process.env.USEREMAIL}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await page.waitForSelector(".mat-mdc-input-element.password-input", {
    visible: true,
  });

  // Type the password into the input field
  await page.type(
    ".mat-mdc-input-element.password-input",
    `${process.env.PASSWORD}`
  );


  await new Promise((resolve) => setTimeout(resolve, 3000));

  await page.waitForSelector(".content-wrp");

  // Click on the element with class 'content-wrp'
  await page.click(".content-wrp");

  await new Promise((resolve) => setTimeout(resolve, 5000));


  // await new Promise((resolve) => setTimeout(resolve, 90000));
  console.log("90 secson delay");
  // await new Promise((resolve) => setTimeout(resolve, 7000));


  for (const doc of documents) {

    const lat = doc.lat;
    const long = doc.long;
    const reg_name = doc.region_name;

    console.log("================================");
    console.log(long + " " + lat);
    // Call your function with lat and long
    // yourFunction_test(lat, long);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    await page.goto("https://crop-monitoring.eos.com/main-map/fields/all");

    await new Promise((resolve) => setTimeout(resolve, 3000));





    await new Promise((resolve) => setTimeout(resolve, 5000));

    await page.waitForSelector(".search-input", { visible: true });

    const searchInput = await page.$(".search-input");
    await searchInput.type(`${lat} , ${long}`);
    //   await searchInput.press("Enter");

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const buttons1 = await page.$$(".search-controls__button");
    await buttons1[1].click();

    await new Promise((resolve) => setTimeout(resolve, 8000));

    const buttons = await page.$$(".mat-mdc-tooltip-trigger");
    await buttons[0].click();

    await new Promise((resolve) => setTimeout(resolve, 4000));

    await page.waitForSelector(".column"); // Replace '.column' with the class selector of the element you want to remove

    // Evaluate a function within the page context to remove the element
    // await page.evaluate(() => {
    //   const elementToRemove = document.querySelector(".column"); // Replace '.column' with the class selector of the element you want to remove
    //   if (elementToRemove) {
    //     elementToRemove.remove();
    //   }
    // });


    console.log("above page ecalute----------------");


    // await page.waitForSelector('cm-whats-new-popup');

    // Click on the close button
    // await page.click('cm-whats-new-popup button.close');
    try {
      await page.evaluate(() => {

        console.log("inside page ecalute----------------");

        const elementToRemove = document.querySelector(".column");
        if (elementToRemove) {
          elementToRemove.remove();

          console.log("Removed element column");
        }

        const elementToRemove1 = document.querySelector(".no-body-padding");
        if (elementToRemove1) {
          elementToRemove1.remove();

          console.log("Removed element padding");

        }

        const elementToRemove2 = document.querySelector(".scenes-container");
        if (elementToRemove2) {
          elementToRemove2.remove();

          console.log("Removed element scene-cont");
        }

        const elementToRemove3 = document.querySelector(".search-box");
        if (elementToRemove3) {
          elementToRemove3.remove();

          console.log("Removed element serach box");
        }

        const elementToRemove4 = document.querySelector(".cm-filter");
        if (elementToRemove4) {
          elementToRemove4.remove();

          console.log("Removed element cm-fliter");
        }

        const elementToRemove5 = document.querySelector(
          ".controls-wrapper-ng-content"
        );
        if (elementToRemove5) {
          elementToRemove5.remove();

          console.log("Removed element ng-content");
        }

        const elementToRemove6 = document.querySelector(".zsiq_flt_rel");
        if (elementToRemove6) {
          elementToRemove6.remove();

          console.log("Removed element zsiq-flq");
        }


        const elementToRemove_marker = document.querySelector(".mapboxgl-marker.mapboxgl-marker-anchor-bottom");
        if (elementToRemove_marker) {
          elementToRemove_marker.remove();

          console.log("Removed element marker");
        }


        const Surveyform = document.querySelector(".sCWrap.LeftBottom.topBand");
        if (Surveyform) {
          Surveyform.remove();

          console.log("Removed element Surveyform");
        }


        // const elementToRemove_newfeature = document.querySelector(".cm-whats-new-popup.button.close");
        // if (elementToRemove_newfeature) {
        //   elementToRemove_newfeature.remove();

        //   console.log("Removed element new feature popup");
        // }


        const popup = document.querySelector('cm-whats-new-popup');
        if (popup) {
          popup.remove();
        }

      });
    }
    catch (e) {
      console.log("error in page.evaluate method");
      console.log(e);
    }

    console.log("finiesged page ecalute----------------");




    await new Promise((resolve) => setTimeout(resolve, 7000));

    randomNumber = Math.floor(Math.random() * 1000); // You can adjust the range of random numbers as needed

    // Take a screenshot with a random filename
    const screenshotPath = `./image/screenshot_000000.png`;
    await page.screenshot({ path: screenshotPath });

    console.log("screenshot taken");

    await new Promise((resolve) => setTimeout(resolve, 10000));

    const inputPath = "./image/screenshot_000000.png"; // Path to the original screenshot
    const outputPath = "./image/cropped.png"; // Path to save the cropped image
    const cropPercentage = 0.34; // 20% of the width to be cropped

    sharp(inputPath)
      .metadata()
      .then((metadata) => {
        // Calculate the width of the cropped region
        const cropWidth = Math.floor(metadata.width * (1 - cropPercentage));

        // Crop the image from the right 20% of the width
        sharp(inputPath)
          .extract({ left: 0, top: 0, width: cropWidth, height: metadata.height })
          .toFile(outputPath, (err, info) => {
            if (err) {
              console.error("Error cropping image:", err);
            } else {
              console.log("insdie 1st");

              console.log("Image cropped and saved successfully.");

              // Example usage
              const inputPath1 = "./image/cropped.png"; // Path to the input image
              const outputPath1 = "./image/crop2.png"; // Path to save the cropped image
              const targetWidth1 = 640; // Width of the cropped image
              const targetHeight1 = 640; // Height of the cropped image

              cropImage(inputPath1, outputPath1, targetWidth1, targetHeight1, doc._id);
            }
          });
      })
      .catch((err) => {
        console.error("Error reading image metadata:", err);
      });

    await new Promise((resolve) => setTimeout(resolve, 4000));
    console.log(`Processing document with lat: ${lat}, long: ${long}`);


    // Set set_img to false after processing
  }


  console.log("================================================");
  console.log("ALL REGIONS DATA UPDATION COMPLETED ");
  console.log("================================================");


  // predict_Collab

//   await page.goto("https://colab.research.google.com/drive/1UTvN4PmzaHuRvPorGy1kQp_PnqWxTNWl?usp=sharing");

//  await page.waitForSelector('.goog-menuitem-content');

//   // Get the element
//   const element = await page.$('.goog-menuitem-content');

//   // Extract text content
//   const textContent = await page.evaluate(element => element.textContent, element);

//   // Check if text content matches "Run all"
//   if (textContent.trim() === 'Run all') {
//     // Click the element
//     await element.click();
  //   }
  
  await browser.close();

}

// WebHarvest();



async function yourFunction_real(lat, long) {


  //   const browser = await puppeteer.launch({ headless: false });
  const browser = await puppeteer.launch({
    headless: false,
    // args: ["--start-maximized"], // This argument will make the browser window fullscreen
    defaultViewport: null,
    permissions: ["notifications"], // Deny the notification permission
    args: ["--disable-notifications"], // Disable notifications
  });

  const page = await browser.newPage();

  await page.addStyleTag({
    content: `
  body, html {
    width: 10% !important;
    height: 10% !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }

  .specific-container {
    width: 50% !important;
    height: 50% !important;
  }
`,
  });

  await page.goto("https://crop-monitoring.eos.com/login");

  // Fill in email input field

  await new Promise((resolve) => setTimeout(resolve, 3000));

  // Click on "Continue" button

  // Wait for the button inside the second div to be present in the DOM
  await page.waitForSelector(
    '.button-wrap:nth-child(2) button[data-id="sign-in-button"]',
    { visible: true }
  );

  // Click the button inside the second div
  await page.click(
    '.button-wrap:nth-child(2) button[data-id="sign-in-button"]'
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Fill in email input field
  await page.waitForSelector(".mat-mdc-input-element", { visible: true });
  await page.type(".mat-mdc-input-element", `${process.env.USEREMAIL}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await page.waitForSelector(".mat-mdc-input-element.password-input", {
    visible: true,
  });

  // Type the password into the input field
  await page.type(
    ".mat-mdc-input-element.password-input",
    `${process.env.PASSWORD}`
  );

  await new Promise((resolve) => setTimeout(resolve, 1000));

  await page.waitForSelector(".content-wrp");

  // Click on the element with class 'content-wrp'
  await page.click(".content-wrp");

  await new Promise((resolve) => setTimeout(resolve, 3000));


  await page.waitForSelector(".search-input", { visible: true });

  const searchInput = await page.$(".search-input");
  await searchInput.type(`${lat} , ${long}`);
  //   await searchInput.press("Enter");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const buttons1 = await page.$$(".search-controls__button");
  await buttons1[1].click();

  await new Promise((resolve) => setTimeout(resolve, 8000));

  const buttons = await page.$$(".mat-mdc-tooltip-trigger");
  await buttons[0].click();

  await new Promise((resolve) => setTimeout(resolve, 4000));

  await page.waitForSelector(".column"); // Replace '.column' with the class selector of the element you want to remove

  await new Promise((resolve) => setTimeout(resolve, 5000));


  console.log("above page ecalute----------------");


  await page.evaluate(() => {

    console.log("inside page ecalute----------------");

    const elementToRemove = document.querySelector(".column");
    if (elementToRemove) {
      elementToRemove.remove();

      console.log("Removed element column");
    }

    const elementToRemove1 = document.querySelector(".no-body-padding");
    if (elementToRemove1) {
      elementToRemove1.remove();

      console.log("Removed element padding");

    }

    const elementToRemove2 = document.querySelector(".scenes-container");
    if (elementToRemove2) {
      elementToRemove2.remove();

      console.log("Removed element scene-cont");
    }

    const elementToRemove3 = document.querySelector(".search-box");
    if (elementToRemove3) {
      elementToRemove3.remove();

      console.log("Removed element serach box");
    }

    const elementToRemove4 = document.querySelector(".cm-filter");
    if (elementToRemove4) {
      elementToRemove4.remove();

      console.log("Removed element cm-fliter");
    }

    const elementToRemove5 = document.querySelector(
      ".controls-wrapper-ng-content"
    );
    if (elementToRemove5) {
      elementToRemove5.remove();

      console.log("Removed element ng-content");
    }

    const elementToRemove6 = document.querySelector(".zsiq_flt_rel");
    if (elementToRemove6) {
      elementToRemove6.remove();

      console.log("Removed element zsiq-flq");
    }

  });


  console.log("finiesged page ecalute----------------");


  await new Promise((resolve) => setTimeout(resolve, 7000));

  randomNumber = Math.floor(Math.random() * 1000); // You can adjust the range of random numbers as needed

  // Take a screenshot with a random filename
  const screenshotPath = `./image/screenshot_000000.png`;
  await page.screenshot({ path: screenshotPath });

  // const clip = { x: 0, y: 0, width: 1300, height: 550 };

  // const clip1 = { x: 0, y: 0, width: 1400, height: 550 };

  // await page.screenshot({
  //   path: `./image/screenshot_clip00_${randomNumber}.png`,
  //   clip: clip,
  // });

  // await page.screenshot({
  //   path: `./image/screenshot_clip222_.png`,
  //   clip: clip1,
  // });

  console.log("screenshot taken");

  await new Promise((resolve) => setTimeout(resolve, 10000));

  const inputPath = "./image/screenshot_000000.png"; // Path to the original screenshot
  const outputPath = "./image/cropped.png"; // Path to save the cropped image
  const cropPercentage = 0.34; // 20% of the width to be cropped

  sharp(inputPath)
    .metadata()
    .then((metadata) => {
      // Calculate the width of the cropped region
      const cropWidth = Math.floor(metadata.width * (1 - cropPercentage));

      // Crop the image from the right 20% of the width
      sharp(inputPath)
        .extract({ left: 0, top: 0, width: cropWidth, height: metadata.height })
        .toFile(outputPath, (err, info) => {
          if (err) {
            console.error("Error cropping image:", err);
          } else {
            console.log("insdie 1st");

            console.log("Image cropped and saved successfully.");

            // Example usage
            const inputPath1 = "./image/cropped.png"; // Path to the input image
            const outputPath1 = "./image/crop2.png"; // Path to save the cropped image
            const targetWidth1 = 640; // Width of the cropped image
            const targetHeight1 = 640; // Height of the cropped image

            cropImage(inputPath1, outputPath1, targetWidth1, targetHeight1);
          }
        });
    })
    .catch((err) => {
      console.error("Error reading image metadata:", err);
    });

  await new Promise((resolve) => setTimeout(resolve, 90000));
  console.log(`Processing document with lat: ${lat}, long: ${long}`);
}


let URL_IMAGE;
let filename;
let fileitem;
let randomNumber;

async function uploadImageToFirebase(filename, fileitem, id_p) {
  try {
    const storageRef = ref(storage, "images/" + filename);

    // Set the content type as image/png
    const metadata = {
      contentType: "image/png",
    };

    // Upload the file with metadata
    await uploadBytes(storageRef, fileitem, metadata);

    // Get the public download URL
    const publicURL = await getDownloadURL(storageRef);

    console.log("File uploaded successfully!");
    console.log("Public URL:", publicURL);

    URL_IMAGE = publicURL;

    try {
      // Create a new Prayag document
      // const newPrayag = new Prayag({
      //   lat: 2101,
      //   long: 2101,
      //   image: publicURL, // Assuming image is a URL or file path, modify this according to your use case
      // });

      // await newPrayag.save();

      // console.log("id: " + id_p);
      await Prayag.updateOne({ _id: id_p }, { $set: { sat_img: true, image: publicURL } });

      console.log("updated for id = " + id_p);

      // Respond with success message
      console.log("IMAGE DATA SAVED ON DB: MONGO");
    } catch (error) {
      // Handle errors and respond with an error message
      console.error(error);
      console.log("DB ERROR NOT SAVED");
    }

    return publicURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error; // Re-throw the error to handle it in the calling function if needed
  }
}

//next flow
async function cropImage(inputPath1, outputPath1, targetWidth1, targetHeight1, id_pp) {
  console.log("insdie cropimfage");

  try {
    // Read the input image metadata
    const metadata = await sharp(inputPath1).metadata();

    // Calculate crop dimensions
    const cropWidth = Math.min(targetWidth1, metadata.width);
    const cropHeight = Math.min(targetHeight1, metadata.height);

    // Calculate crop position
    const left = Math.floor((metadata.width - cropWidth) / 2);
    const top = Math.floor((metadata.height - cropHeight) / 2);

    // Crop and resize the image
    await sharp(inputPath1)
      .extract({ left, top, width: cropWidth, height: cropHeight })
      .resize(targetWidth1, targetHeight1)
      .toFile(outputPath1);

    console.log("Image cropped and saved successfully.");

    // Example usage:
    filename = `screenshot_clip00_${randomNumber}_5oct.png`;
    fileitem = fs.readFileSync(`./image/crop2.png`);

    uploadImageToFirebase(filename, fileitem, id_pp)
      .then((publicURL) => {
        console.log("Public URL:", publicURL);
      })
      .catch((error) => {
        // Handle error if the upload fails
        console.error("Error in uploadImageToFirebase:", error);
      });
  } catch (error) {
    console.error("Error cropping image:", error);
    throw error;
  }
}


app.listen(process.env.PORT, function (req, res) {
  console.log(`MAIN UI: http://localhost:${process.env.PORT}/`);
});


