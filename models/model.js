const mongoose = require("mongoose");

const prayagSchema = new mongoose.Schema(
  {
    lat: {
      type: Number,
      // required: [true, "Plz enter lat"],
    },

    long: {
      type: Number,
      // required: [true, "Plz enter long"],
    },

    image: {
      type: String,
      // required: [true, "Plz upload image"],
    },

    sat_img: {
      type: Boolean,
      // required: [true, "Plz upload image"],
    },

    Ngo_id: {
      type: Number,
    },

    Post_id: {
      type: Number,
    },

    Drive_Name: {
      type: String,
    },

    Docx_type: {
      type: String,
    },

    Location: {
      type: String,
    },

    Phone: {
      type: Number,
    },

    Poster_Link: {
      type: String,
    }

  },
  { collection: "prayagsp" }
);

const Prayag = mongoose.model("Prayag", prayagSchema);

module.exports = Prayag;
