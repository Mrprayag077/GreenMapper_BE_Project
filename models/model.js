const mongoose = require("mongoose");

const prayagSchema = new mongoose.Schema(
  {
    lat: {
      type: Number,
      required: [true, "Plz enter lat"],
    },

    long: {
      type: Number,
      required: [true, "Plz enter long"],
    },

    image: {
      type: String,
      required: [true, "Plz upload image"],
    },
  },
  { collection: "prayagsp" }
);

const Prayag = mongoose.model("Prayag", prayagSchema);

module.exports = Prayag;
