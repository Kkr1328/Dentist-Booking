const express = require("express");
const {
  getAppointments,
  getAppointment,
  addAppointment,
  updateAppointment,
  deleteAppointment,
} = require("../controllers/appointments");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, getAppointments)
  .post(protect, authorize("admin", "user"), addAppointment);
router
  .route("/:id")
  .get(protect, getAppointment)
  .put(protect, authorize("admin", "user"), updateAppointment)
  .delete(protect, authorize("admin", "user"), deleteAppointment);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Appointments
 *  description: The appointments managing API
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Appointment:
 *    type: object
 *    require:
 *     - apptDate
 *     - user
 *     - dentist
 *    properties:
 *     id:
 *      type: string
 *      format: uuid
 *      description: The auto-generated id of the appointment
 *      example: 6423e233cbeda804f303c8c7
 *     apptDate:
 *      type: date
 *      description: appointment datetime
 *      example: 2023-03-29T07:01:07.968+00:00
 *     user:
 *      type: string
 *      format: uuid
 *      description: The id of the user
 *      example: 63efbf7502261fdf789fcf23
 *     dentist:
 *      type: string
 *      format: uuid
 *      description: The id of the dentist
 *      example: 6422f13987d1987cf5239242
 *     createAt:
 *      type: date
 *      description: creating appointment datetime
 *      example: 2023-03-29T07:01:07.968+00:00
 *    example:
 *      apptDate: 2023-03-29T07:01:07.968+00:00
 *      user: 63efbf7502261fdf789fcf23
 *      dentist: 6422f13987d1987cf5239242
 *      createAt: 2023-03-29T07:01:07.968+00:00
 */
