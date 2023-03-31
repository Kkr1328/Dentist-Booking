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

/**
 * @swagger
 * /appointments:
 *   get:
 *    summary: Returns the list of all the appointments
 *    tags: [Appointments]
 *    securityDefinitions:
 *     BearerAuth:
 *      type: apiKey
 *      name: Authorization
 *      in: header
 *    security:
 *     - BearerAuth: []
 *    responses:
 *     200:
 *      description: The list of the appointments
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: '#/components/schemas/Appointment'
 *     500:
 *      description: Can't find appointment
 */

/**
 * @swagger
 * /appointments/{id}:
 *  get:
 *   summary: Return an appointment which match ID
 *   tags: [Appointments]
 *   securityDefinitions:
 *    BearerAuth:
 *     type: apiKey
 *     name: Authorization
 *     in: header
 *   security:
 *     - BearerAuth: []
 *   parameters:
 *    - name: id
 *      in: path
 *      description: appointment's id
 *      required: true
 *      type: uuid
 *   responses:
 *    200:
 *     description: an appointment which match ID
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Appointment'
 *    404:
 *     description: No appointment match the ID
 *    500:
 *     description: Can't find appointment
 *      
 *  put:
 *   summary: Update an appointment
 *   tags: [Appointments]
 *   securityDefinitions:
 *     BearerAuth:
 *      type: apiKey
 *      name: Authorization
 *      in: header
 *   security:
 *     - BearerAuth: []
 *   parameters:
 *    - name: id
 *      in: path
 *      description: appointment's id
 *      required: true
 *      type: uuid
 *   requestBody:
 *     description: appointment data which want to update
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Appointment'
 *   responses:
 *    200:
 *     description: an appointment which match ID
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/Appointment'
 *    400:
 *     description: No dentist's available datetime with the id of dentistId
 *    401:
 *     description: User is not authorized to update
 *    404:
 *     description: No dentist match dentistID
 *    500:
 *     description: Cannot update Appointment
 *  delete:
 *   summary: delete an appointment
 *   tags: [Appointments]
 *   securityDefinitions:
 *     BearerAuth:
 *      type: apiKey
 *      name: Authorization
 *      in: header
 *   security:
 *     - BearerAuth: []
 *   parameters:
 *    - name: id
 *      in: path
 *      description: appointment's id
 *      required: true
 *      type: uuid
 *   responses:
 *    200:
 *     description: Success delete an appointment
 *    400:
 *     description: Can't find appointment to delete or something went wrong
 *    401:
 *     description: User is not authorized to delete this appointment
 *    404:
 *     description: No appointment match the ID
 *    500:
 *     description: Cannot delete Appointment
 */ 

/**
 * @swagger
 * /dentist/{dentistId}/appointment:
 *  post: 
 *   summary: create an appointment
 *   tags: [Appointments]
 *   security:
 *     - BearerAuth: []
 *   parameters:
 *    - name: dentistId
 *      in: path
 *      description: dentist's id
 *      required: true
 *      type: uuid
 *   requestBody:
 *     description: appointment data which want to create
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Appointment'
 *   responses:
 *    200:
 *     description: success to create an appointment
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Appointment'
 *    400:
 *     description: No dentist's available datetime with the id of dentistId or user has already made 1 appointment
 *    404:
 *     description: No dentist match the dentistID
 *    500:
 *     description: Cannot create Appointment
 *   securityDefinitions:
 *     BearerAuth:
 *      type: apiKey
 *      name: Authorization
 *      in: header
 */ 