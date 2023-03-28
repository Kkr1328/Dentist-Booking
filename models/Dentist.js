const mongoose = require("mongoose");

const DentistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  years_of_exp: {
    type: Number,
    required: [true, "Please add years of expertise"],
  },
  area_of_exp: {
    type: String,
    required: [true, "Please add area of expertise"],
  },
  available_datetime: {
    type: Array({
      weekday: {
        type: Number,
        required: [true, "Please add a weekday"],
        min: 0,
        max: 6,
      },
      start_hour: {
        type: Number,
        required: [true, "Please add a start hour"],
        min: 0,
        max: 23,
      },
      end_hour: {
        type: Number,
        required: [true, "Please add a end hour"],
        min: 0,
        max: 23,
      },
    }),
    required: [true, "Please add an available datetime"],
  },
});

module.exports = mongoose.model("Dentist", DentistSchema);
