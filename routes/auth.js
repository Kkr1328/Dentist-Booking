const express = require("express");
const { register, login, getMe } = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);

module.exports = router;

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: The users managing API
 */

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    required:
 *     - name
 *     - tel
 *     - email
 *     - password
 *    properties:
 *     id:
 *      type: string
 *      format: uuid
 *      description: The id of the user
 *      example: 63efbf7502261fdf789fcf23
 *     name:
 *      type: string
 *      description: user name
 *      example: John Doe
 *     tel:
 *      type: string
 *      description: user telephone number
 *      example: 089-000-0000
 *     email:
 *      type: string
 *      descriptionn: user email
 *      example: john@gmail.com
 *     password:
 *      type: string
 *      description: salted user email's password
 *      example: $2a$10$jaf3ReKyHWR5sodLrLf6ne0bgVfBAhvqyw5c1ja7DvHp9mH0IuTVS
 *     role:
 *      type: string
 *      enum: ["user", "admin"]
 *      description: role of user
 *      example: admin
 *     createAt:
 *      type: date
 *      description: creating appointment datetime
 *      example: 2023-03-29T07:01:07.968+00:00
 *    example:
 *     name: John Doe
 *     tel: 089-000-0000
 *     email: john@gmail.com
 *     password: $2a$10$jaf3ReKyHWR5sodLrLf6ne0bgVfBAhvqyw5c1ja7DvHp9mH0IuTVS
 *     role: admin
 *     createAt: 2023-03-29T07:01:07.968+00:00
 */

/**
 * @swagger
 * /auth/register:
 *  post:
 *   summary: Register a user
 *   tags: [Users]
 *   requestBody:
 *    description: User object
 *    required: true
 *    content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             tel:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             role:
 *               type: string
 *         example:
 *           name: aom
 *           tel: "0933780030"
 *           email: aom@gmail.com
 *           password: "123456"
 *           role: user
 *   responses:
 *    200:
 *     description: registration success
 *    400:
 *     description: can't register 
 * 
 * /auth/login:
 *  post:
 *   summary: Login a user
 *   tags: [Users]
 *   requestBody:
 *    description: email and password
 *    required: true
 *    content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *         example:
 *           email: aom@gmail.com
 *           password: "123456"
 *   responses:
 *    200:
 *     description: login success
 *     content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *          example:
 *            token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjU2ZGVmYzA3MzJjMGEwZTBkMGQ1ZSIsImlhdCI6MTY4MDI0ODMzMSwiZXhwIjoxNjgyODQwMzMxfQ.n8NkpzgSPYOus5iM0BMq6XV653WO1pb2SZisDJOXHUM
 *    400:
 *     description: not provide an email or password
 *    401:
 *     description: Invalid credentials
 * 
 * /auth/me:
 *   get:
 *    summary: get current logged in user
 *    tags: [Users]
 *    securityDefinitions:
 *     BearerAuth:
 *      type: apiKey
 *      name: Authorization
 *      in: header
 *    security:
 *     - BearerAuth: []
 *    responses:
 *     200:
 *      description: getMe success
 *      content:
 *       application/json:
 *         schema:
 *          $ref: '#/components/schemas/User'
 */   
