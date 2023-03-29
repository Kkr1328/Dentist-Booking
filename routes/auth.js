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
