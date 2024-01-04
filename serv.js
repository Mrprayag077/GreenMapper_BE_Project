// const fs = require("fs").promises;
const fs = require("fs");
const axios = require("axios");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const puppeteer = require("puppeteer");
const sharp = require("sharp");

const dotenv = require("dotenv");
dotenv.config();
const app = express();


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
require("./server");



app.listen(process.env.PORT || 8000, function (req, res) {
  console.log("MAIN UI: http://localhost:8000/");
});

