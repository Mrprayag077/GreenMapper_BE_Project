// const fs = require("fs").promises;
const fs = require("fs");
const axios = require("axios");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const ejs = require("ejs");
const crypto = require("crypto");

const dotenv = require("dotenv");
dotenv.config();
// const config = require("./config/firebase.config");
const app = express();

// IMPORTING BOT CODE AUTOMATE.JS
const schedule = require("node-schedule");

const userRoutes = require("./routes/router");

app.use(bodyParser.json());
app.use(express.json());

// Set Content Security Policy (CSP) headers
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js https://www.gstatic.com/firebasejs/6.0.2/firebase-storage.js; " +
      "style-src 'self' 'unsafe-inline'; " +
      "img-src 'self' data:; " +
      "font-src 'self'; " +
      "connect-src *; " +
      "worker-src 'self' blob:; " +
      "frame-src 'self';"
  );
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

const Prayag = require("./models/model");
// Require and run server.js
require("./server");

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/from.html"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/form/", userRoutes);

const puppeteer = require("puppeteer");
const sharp = require("sharp");

const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage");

var profileLinks = ["https://www.linkedin.com/in/gourav-grover-02a82a200/"];

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

async function linkined() {
  //   const usersinfosp = await usersinfos.find({ request_send_trigger: "today" });

  // const lat = 18.553091 + i;
  // const long = 73.918978 + i;

  //   console.log(profileLinkIds);

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
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      overflow: hidden !important;
    }

    .specific-container {
      width: 100% !important;
      height: 100% !important;
    }
  `,
  });

  await page.goto("https://crop-monitoring.eos.com/login");

  // Fill in email input field

  await new Promise((resolve) => setTimeout(resolve, 2000));

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

  //   await page.goto('https://www.linkedin.com/company/noveracion-global/');
  // Open a new tab

  //new browser
  //   const newTab = await browser.newPage();

  //   await newTab.goto("https://crop-monitoring.eos.com/main-map/fields/all");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  let ii = 1;
  for (let i = 1; i < 2; i++) {
    await page.goto("https://crop-monitoring.eos.com/main-map/fields/all"); //crop-monitoring.eos.com/main-map/fields/all

    await new Promise((resolve) => setTimeout(resolve, 3000));

    // const lat = 18.5501 + 0.0003 * ii;
    // ii = ii + 1;
    // const long = 73.9101;

    const lat = 18.4999901;
    const long = 73.9191;

    await page.waitForSelector(".search-input", { visible: true });

    const searchInput = await page.$(".search-input");
    await searchInput.type(`${lat} , ${long}`);
    //   await searchInput.press("Enter");

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const buttons1 = await page.$$(".search-controls__button");
    await buttons1[1].click();

    await new Promise((resolve) => setTimeout(resolve, 4000));

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

    await page.evaluate(() => {
      const elementToRemove = document.querySelector(".column");
      if (elementToRemove) {
        elementToRemove.remove();
      }

      const elementToRemove1 = document.querySelector(".no-body-padding");
      if (elementToRemove1) {
        elementToRemove1.remove();
      }

      const elementToRemove2 = document.querySelector(".scenes-container");
      if (elementToRemove2) {
        elementToRemove2.remove();
      }

      const elementToRemove3 = document.querySelector(".search-box");
      if (elementToRemove3) {
        elementToRemove3.remove();
      }

      const elementToRemove4 = document.querySelector(".cm-filter");
      if (elementToRemove4) {
        elementToRemove4.remove();
      }

      const elementToRemove5 = document.querySelector(
        ".controls-wrapper-ng-content"
      );
      if (elementToRemove5) {
        elementToRemove5.remove();
      }

      const elementToRemove6 = document.querySelector(".zsiq_flt_rel");
      if (elementToRemove6) {
        elementToRemove6.remove();
      }

      const elementToRemove7 = document.querySelector(".form-page");
      if (elementToRemove7) {
        elementToRemove7.remove();
      }

      const elementToRemove8 = document.querySelector(".search-marker");
      if (elementToRemove8) {
        elementToRemove8.remove();
      }

      // controls-wrapper - ng - content;

      //   no-body-padding no-header-padding open ng-star-inserted
      //   scenes-container ng-star-inserted
      //   search-box ng-star-inserted
      //   cm-filter ng-star-inserted
      // zsiq_flt_rel
      // form - page;
    });

    await new Promise((resolve) => setTimeout(resolve, 4000));

    randomNumber = Math.floor(Math.random() * 1000); // You can adjust the range of random numbers as needed

    // Ensure the 'image' directory exists
    if (!fs.existsSync("./image")) {
      fs.mkdirSync("./image");
    } else {
      console.log("image dir already exists");
    }

    // Take a screenshot with a random filename
    // const screenshotPath = `./image/screenshot_${i}.png`;
    const screenshotPath = `./image/screenshot_1000.png`;
    await page.screenshot({ path: screenshotPath });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("screenshot taken");

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const inputPath = `./image/screenshot_1000.png`; // Path to the original screenshot
    const outputPath = `./image/1000.png`; // Path to save the cropped image
    const cropPercentage = 0.34; // 20% of the width to be cropped

    sharp(inputPath)
      .metadata()
      .then((metadata) => {
        // Calculate the width of the cropped region
        const cropWidth = Math.floor(metadata.width * (1 - cropPercentage));

        // Crop the image from the right 20% of the width
        sharp(inputPath)
          .extract({
            left: 0,
            top: 0,
            width: cropWidth,
            height: metadata.height,
          })
          .toFile(outputPath, (err, info) => {
            if (err) {
              console.error("Error cropping image:", err);
            } else {
              console.log("insdie 1st");

              console.log("Image cropped and saved successfully.");

              // Example usage
              const inputPath1 = `./image/1000.png`; // Path to the input image
              const outputPath1 = `./image_final/1000.png`; // Path to save the cropped image
              const targetWidth1 = 640; // Width of the cropped image
              const targetHeight1 = 640; // Height of the cropped image

              cropImage(inputPath1, outputPath1, targetWidth1, targetHeight1);
            }
          });
      })
      .catch((err) => {
        console.error("Error reading image metadata:", err);
      });

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
}

let URL_IMAGE;
let filename;
let fileitem;
let randomNumber;

//next flow
async function cropImage(inputPath1, outputPath1, targetWidth1, targetHeight1) {
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
    // filename = `screenshot_clip00_${randomNumber}_5oct.png`;
    // fileitem = fs.readFileSync(`./image/crop2.png`);

    // uploadImageToFirebase(filename, fileitem)
    //   .then((publicURL) => {
    //     console.log("Public URL:", publicURL);
    //   })
    //   .catch((error) => {
    //     // Handle error if the upload fails
    //     console.error("Error in uploadImageToFirebase:", error);
    //   });
  } catch (error) {
    console.error("Error cropping image:", error);
    throw error;
  }
}

// Schedule AUTOMATE BOT every Sunday at 7:00 AM
// schedule.scheduleJob("0 7 * * 0", () => {
console.log("Running the function on Sunday at 7:00 AM!");
linkined();
// });

app.listen(process.env.PORT, function (req, res) {
  console.log(`MAIN UI: http://localhost:${process.env.PORT}/`);
});

// async function linkined1() {
//   let i = 50;
//   for (let ii = 102; ii < 210; ii++) {
//     const screenshotPath = `./image/${i}.png`;
//     console.log(i);
//     // await page.screenshot({ path: screenshotPath });
//     ++i;
//     // Crop and resize top-left corner
//     const topLeftOutputPath = `./image_new/${ii++}.png`;
//     await cropAndResize(screenshotPath, topLeftOutputPath, 640, 640, 0, 0);

//     // Crop and resize bottom-right corner
//     const bottomRightOutputPath = `./image_new/${ii}.png`;
//     const metadata = await sharp(screenshotPath).metadata();
//     const bottomRightLeft = metadata.width - 640;
//     const bottomRightTop = metadata.height - 640;
//     await cropAndResize(
//       screenshotPath,
//       bottomRightOutputPath,
//       640,
//       640,
//       bottomRightLeft,
//       bottomRightTop
//     );
//   }
// }

// async function cropAndResize(
//   inputPath,
//   outputPath,
//   targetWidth,
//   targetHeight,
//   left,
//   top
// ) {
//   try {
//     // Crop and resize the image
//     await sharp(inputPath)
//       .extract({ left, top, width: targetWidth, height: targetHeight })
//       .resize(targetWidth, targetHeight)
//       .toFile(outputPath);

//     console.log(`Image cropped and saved successfully: ${outputPath}`);
//   } catch (error) {
//     console.error("Error cropping image:", error);
//     throw error;
//   }
// }

// linkined1();

// // Get the list of files in the folder
// fs.readdir(folderPath, (err, files) => {
//   if (err) {
//     console.error("Error reading folder:", err);
//     return;
//   }

//   // Generate a random order for file names
//   const randomOrder = shuffleArray(generateRangeArray(1, files.length));

//   // Rename the files based on the random order
//   files.forEach((file, index) => {
//     const oldFilePath = path.join(folderPath, file);
//     const newFileName = randomOrder[index];
//     const newFilePath = path.join(folderPath, `${newFileName}${fileExtension}`);

//     // Rename the file
//     fs.renameSync(oldFilePath, newFilePath);

//     console.log(`Renamed ${file} to ${newFileName}${fileExtension}`);
//   });
// });

// // Function to generate an array of numbers within a specified range
// function generateRangeArray(start, end) {
//   return Array.from({ length: end - start + 1 }, (_, index) => index + start);
// }

// // Function to shuffle an array randomly
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// }
// const sourceFolder = "./FIANLLL"; // Path to the folder containing the original images
// const destinationFolder = "./renamed_images/"; // Path to the folder where renamed images will be saved

// fs.readdir(sourceFolder, (err, files) => {
//   if (err) {
//     console.error("Error reading source folder:", err);
//     return;
//   }

//   const totalImages = 208;
//   if (totalImages !== 208) {
//     console.error(
//       "Error: There should be exactly 208 images in the source folder."
//     );
//     return;
//   }

//   // Loop through the files and rename them
//   files.forEach((file, index) => {
//     const oldPath = file;
//     const newNumber = totalImages - index;
//     const newFileName = `${newNumber}.png`;
//     const newPath = destinationFolder + newFileName;

//     // Rename the file
//     fs.rename(oldPath, newPath, (err) => {
//       if (err) {
//         console.error(`Error renaming ${oldPath} to ${newPath}:`, err);
//       } else {
//         console.log(`Renamed ${oldPath} to ${newPath}`);
//       }
//     });
//   });
// });
