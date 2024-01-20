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

    Ngo_name: {
      type: String,
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


    Description: {
      type: String,
    },

    Location: {
      type: String,
    },

    Phone: {
      type: Number,
    },

    Hands: {
      type: Number,
    },

    Poster_Link: {
      type: String,
    },

    pp: {
      type: [Number],
      default: undefined,
      select: false,
    },

    label_1: {
      type: [String],
      default: undefined,
      select: false,
    },

    label_2: {
      type: [String],
      default: undefined,
      select: false,
    },

    label_3: {
      type: [String],
      default: undefined,
      select: false,
    },

    label_4: {
      type: [String],
      default: undefined,
      select: false,
    },

    data_1: {
      type: [Number],
      default: undefined,
      select: false,
    },

    data_2: {
      type: [Number],
      default: undefined,
      select: false,
    },

    data_3: {
      type: [Number],
      default: undefined,
      select: false,
    },

    data_4: {
      type: [Number],
      default: undefined,
      select: false,
    },
  },
  { collection: "prayagsp" }
);

const Prayag = mongoose.model("Prayag", prayagSchema);

module.exports = Prayag;



// The behavior you're observing might be related to the fact that arrays, by default, are created
// as empty arrays ([]) in JavaScript, even if you don't explicitly provide values.When you define an
// array field in your MongoDB schema, if no value is provided during document creation, an empty array
// is used as the default value.