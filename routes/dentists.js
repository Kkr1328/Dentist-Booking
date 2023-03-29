const express = require("express");
const {
  getDentists,
  getDentist,
  createDentist,
  updateDentist,
  deleteDentist,
} = require("../controllers/dentists");

//Include other resource routers
const appointmentRouter = require("./appointments");
const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

//Re-route into other resource routers
router.use("/:dentistId/appointments/", appointmentRouter);

router.route("/").get(getDentists).post(protect, authorize("admin"), createDentist);
router
  .route("/:id")
  .get(getDentist)
  .put(protect, authorize("admin"), updateDentist)
  .delete(protect, authorize("admin"), deleteDentist);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Dentists
 *  description: The dentists managing API
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   Dentist:
 *    type: object
 *    required:
 *     - name
 *     - years_of_exp
 *     - area_of_exp
 *     - available_datetime
 *    properties:
 *     id:
 *      type: string
 *      format: uuid
 *      description: The auto-generated id of the dentist
 *      example: 6422f13987d1987cf5239242
 *     name:
 *      type: string
 *      description: Dentist name
 *      example: WorldMedical
 *     years_of_exp:
 *      type: integer
 *      description: years of experience
 *      example: 20
 *     area_of_exp:
 *      type: string
 *      description: area of experience
 *      example : ฟันผุ
 *     available_datetime:
 *      type: array
 *      items:
 *        type: object
 *        properties:
 *         weekday:
 *          type: interger
 *          description: available weekday
 *          minimum: 0
 *          maximum: 6
 *         start_hour:
 *          type: integer
 *          description: available start hour in a day
 *          minimum: 0
 *          maximum: 23
 *         end_hour:
 *          type: integer
 *          description: available end hour in a day
 *          minimum: 0
 *          maximum: 23
 *      description: dentist's available datetimes
 *      example: [{weekday:3, start_hour:12, end_hour:18}, {weekday:4, start_hour:8, end_hour:17}]
 *    example:
 *     id: 609bda561452242d88d36e37
 *     name: WorldMedical
 *     years_of_exp: 20
 *     area_of_exp: ฟันผุ
 *     available_datetime: [{weekday:3, start_hour:12, end_hour:18}, {weekday:4, start_hour:8, end_hour:17}]
 */

/**
 * @swagger
 * /dentists:
 *  get:
 *   summary: Returns the list of all the dentists
 *   tags: [Dentists]
 *   responses:
 *    200:
 *     description: The list of the dentists
 *     content:
 *      application/json:
 *       schema:
 *        type: array
 *        items:
 *         $ref: '#/components/schemas/Dentist'
 */
