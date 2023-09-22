const { PDFDocument, rgb } = require("pdf-lib");
const fs = require("fs").promises;
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors");
const express = require("express");

const bodyParser = require("body-parser");
const port = 2000;

const app = express();

const corsOptions = {
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

const url =
  "https://mnregaweb4.nic.in/netnrega/state_html/DPCApprove_Workdetail.aspx?state_name=KARNATAKA&state_code=15&district_name=KODAGU&district_code=1518&block_name=SOMVARPET&block_code=1518002&panchayat_name=7TH%20HOSKOTE&panchayat_code=1518002040&fin_year=2023-2024&work_code=1518002/IF/93393042892341947&short_name=KN&work_name=7%E0%B2%A8%E0%B3%87%E0%B2%B9%E0%B3%8A%E0%B2%B8%E0%B2%95%E0%B3%8B%E0%B2%9F%E0%B3%86%E0%B2%97%E0%B3%8D%E0%B2%B0%E0%B2%BE%E0%B2%AE%E0%B2%AA%E0%B3%82%E0%B2%9A%E0%B2%BE%E0%B2%AF%E0%B2%A4%E0%B2%BF%20%E0%B2%B5%E0%B3%8D%E0%B2%AF%E0%B2%BE%E0%B2%AA%E0%B3%8D%E0%B2%A4%E0%B2%BF%E0%B2%AF%20%E0%B2%B5%E0%B2%BF%E0%B2%95%E0%B3%8D%E0%B2%B0%E0%B2%82%20%E0%B2%B0%E0%B2%B5%E0%B2%B0%E0%B2%9C%E0%B2%BE%E0%B2%97%E0%B2%A6%E0%B2%B2%E0%B3%8D%E0%B2%B2%E0%B2%BF%20%E0%B2%A4%E0%B3%8B%E0%B2%9F%E0%B3%8D%E0%B2%9F%E0%B2%BF%E0%B2%B2%E0%B3%81%E0%B2%97%E0%B3%81%E0%B2%82%E0%B2%A1%E0%B2%BF%20%E0%B2%A8%E0%B2%BF%E0%B2%B0%E0%B3%8D%E0%B2%AE%E0%B2%BE%E0%B2%A3&source=national&Digest=cfAHJfZIv3EyefTdddxsBw";

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/formsubmit", (req, res) => {
  const formData = req.body; // Access the form data sent from the client

  const demoText1 = formData.demoText1;
  const demoText2 = formData.demoText2;
  // Process the form data as needed
  console.log("Received form data:", formData);

  // // Send a response back to the client (optional)

  //main work
  axios
    .get(url)
    .then(async (response) => {
      // .then((response) => {

      const html = response.data;
      const $ = cheerio.load(html);

      // Use the appropriate CSS selector to select the span element by its id
      const spanElement = $("#ctl00_ContentPlaceHolder1_wrklbl");
      const spanElement1 = $("#ctl00_ContentPlaceHolder1_blklbl");
      let trimmedString;

      // Check if the span element with the specified id exists
      if (spanElement.length > 0) {
        // Extract and log the text content of the span element
        const textContent = spanElement.text();
        console.log("Extracted Text:", textContent);

        const inputString = String(textContent);
        // "1518002/IF/93393042892341947 (7ನೇಹೊಸಕೋಟೆಗ್ರಾಮಪೂಚಾಯತಿ ವ್ಯಾಪ್ತಿಯ ವಿಕ್ರಂ ರವರಜಾಗದಲ್ಲಿ ತೋಟ್ಟಿಲುಗುಂಡಿ ನಿರ್ಮಾಣ)";

        const firstSpaceIndex = inputString.indexOf(" ");

        if (firstSpaceIndex !== -1) {
          trimmedString = inputString.substring(0, firstSpaceIndex).trim();
          console.log(trimmedString);

          await addTextToPDF(trimmedString);


        } else {
          console.log(inputString.trim());
        }
      } else {
        console.log("Span element not found");
      }

      // Check if the span element with the specified id exists
      if (spanElement1.length > 0) {
        // Extract and log the text content of the span element
        const textContent1 = spanElement1.text();
        console.log("Extracted Text:", textContent1);
      } else {
        console.log("Span element not found");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  console.log("axios done");

  async function addTextToPDF(trimmedString) {
    try {
      const pdfData = await fs.readFile("./CoverPage.pdf"); // Load the existing PDF

      const pdfDoc = await PDFDocument.load(pdfData);
      const [page] = pdfDoc.getPages();

      // First text element
      const fontSize1 = 11;
      const x1 = 174;
      const y1 = 640;
      const text1 = trimmedString;

      console.log("hiiiiii ------" + trimmedString);

      page.drawText(text1, {
        x: x1,
        y: y1,
        size: fontSize1,
        color: rgb(0, 0, 0), // Black color
        fontWeight: 900,
      });

      // Second text element
      const fontSize2 = 10;
      const x2 = 187;
      const y2 = 615;
      const text2 = "DEMO-TXT";

      page.drawText(text2, {
        x: x2,
        y: y2,
        size: fontSize2,
        color: rgb(0, 0, 0), // Black color
        fontWeight: 900,
      });

      // Add more text elements as needed
      // THIRD text element
      const fontSize3 = 11;
      const x3 = 250;
      const y3 = 590;
      const text3 = String(demoText1);
      //  "DEMO TEXT: 1356787/68575785";

      page.drawText(text3, {
        x: x3,
        y: y3,
        size: fontSize3,
        color: rgb(0, 0, 0), // Black color
        fontWeight: 900,
      });

      // 4TH text element
      const fontSize4 = 8;
      const x4 = 133;
      const y4 = 565;
      const text4 = String(demoText2);
      // "DEMO";

      page.drawText(text4, {
        x: x4,
        y: y4,
        size: fontSize4,
        color: rgb(0, 0, 0), // Black color
        fontWeight: 900,
      });

      // 5TH text element
      const fontSize5 = 11;
      const x5 = 185;
      const y5 = 453;
      const text5 = "Gram Panchayat (3)";

      page.drawText(text5, {
        x: x5,
        y: y5,
        size: fontSize5,
        color: rgb(0, 0, 0), // Black color
        fontWeight: 900,
      });

      // 6TH text element
      const fontSize6 = 10;
      const x6 = 165;
      const y6 = 427;
      const text6 = "DEMO-TXT";

      page.drawText(text6, {
        x: x6,
        y: y6,
        size: fontSize6,
        color: rgb(0, 0, 0), // Black color
        fontWeight: 900,
      });

      // 7TH text element
      const fontSize7 = 9;
      const x7 = 188;
      const y7 = 403;
      const text7 = "DEMO-TXT";

      page.drawText(text7, {
        x: x7,
        y: y7,
        size: fontSize7,
        color: rgb(0, 0, 0), // Black color
        fontWeight: 900,
      });

      // 9TH text element
      const fontSize9 = 10;
      const x9 = 218;
      const y9 = 353;
      const text9 = "DEMO-TXT";

      page.drawText(text9, {
        x: x9,
        y: y9,
        size: fontSize9,
        color: rgb(0, 0, 0), // Black color
        fontWeight: 900,
      });

      // 9.1TH text element
      const fontSize91 = 10;
      const x91 = 338;
      const y91 = 353;
      const text91 = "DEMO-T";

      page.drawText(text91, {
        x: x91,
        y: y91,
        size: fontSize91,
        color: rgb(0, 0, 0), // Black color
        fontWeight: 900,
      });

      // 9.2TH text element
      const fontSize92 = 10;
      const x92 = 438;
      const y92 = 353;
      const text92 = "DEMO-T";

      page.drawText(text92, {
        x: x92,
        y: y92,
        size: fontSize92,
        color: rgb(0, 0, 0), // Black color
        fontWeight: 900,
      });

      // 9.ATH text element
      const fontSize9A = 10;
      const x9A = 179;
      const y9A = 330;
      const text9A = "DEMO-T";

      page.drawText(text9A, {
        x: x9A,
        y: y9A,
        size: fontSize9A,
        color: rgb(0, 0, 0), // Black color
        fontWeight: 900,
      });

      const modifiedPdfData = await pdfDoc.save();

      await fs.writeFile("modified.pdf", modifiedPdfData);

      // res.sendFile(__dirname + "/modified.pdf");
      res.sendFile(__dirname + '/modified.pdf');

      return modifiedPdfData;
    } catch (error) {
      console.error("Error adding text to PDF:", error);
      throw error;
    }
  }

  console.log("asunc func done");

  // res.json({ message: "Form data received successfully!" });
});

// addTextToPDF().catch((error) => {
//   console.error("Error:", error);
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
