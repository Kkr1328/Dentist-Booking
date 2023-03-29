const Appointment = require("../models/Appointment");
const Dentist = require("../models/Dentist");

//@desc   Get all appointments
//@route  Get /api/v1/appointments
//@access Public
exports.getAppointments = async (req, res, next) => {
  let query;

  //General users can see only their appointments!
  if (req.user.role !== "admin") {
    query = Appointment.find({ user: req.user.id }).populate({
      path: "dentist",
      select: "name years_of_exp area_of_exp",
    });
  } else {
    query = Appointment.find().populate({
      path: "dentist",
      select: "name years_of_exp area_of_exp",
    });
  }

  try {
    const appointments = await query;

    res.status(200).json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Cannot find Appointment" });
  }
};

//@desc   Get single appointment
//@route  Get /api/v1/appointments/:id
//@access Public
exports.getAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate({
      path: "dentist",
      select: "name years_of_exp area_of_exp",
    });

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: `No appointment with the id of ${req.params.id}` });
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Cannot find Appointment" });
  }
};

//@desc   Add appointment
//@route  POST /api/v1/dentists/:dentistId/appointment
//@access Private
exports.addAppointment = async (req, res, next) => {
  try {
    req.body.dentist = req.params.dentistId;

    const dentist = await Dentist.findById(req.params.dentistId);

    if (!dentist) {
      return res
        .status(404)
        .json({ success: false, message: `No dentist with the id of ${req.params.dentistId}` });
    }

    //add user Id to req.body
    req.body.user = req.user.id;

    //Check for existed appointment
    const existedAppointments = await Appointment.find({ user: req.user.id });

    //If the user is not an admin, they can only create 3 appointments
    if (existedAppointments.length >= 3 && req.user.role !== "admin") {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${req.user.id} has already made 3 appointments`,
      });
    }

    const appointment = await Appointment.create(req.body);

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Cannot create Appointment" });
  }
};

//@desc   Update appointment
//@route  PUT /api/v1/appointments/:id
//@access Private
exports.updateAppointment = async (req, res, next) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: `No appointment with the id of ${req.params.id}` });
    }

    //Make sure user is the appointment owner
    if (appointment.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this appointment`,
      });
    }

    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Cannot update Appointment" });
  }
};

//@desc   Delete appointment
//@route  DELETE /api/v1/appointments/:id
//@access Private
exports.deleteAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: `No appointment with the id of ${req.params.id}` });
    }

    //Make sure user is the appointment owner
    if (appointment.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this appointment`,
      });
    }

    await appointment.remove();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Cannot delete Appointment" });
  }
};
