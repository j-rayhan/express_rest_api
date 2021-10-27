const express = require("express");
// const { check } = require("express-validator/check");
// const { authJwt } = require("../middleware");
const router = express.Router();

const controller = require('../controller/auth')
/**
 * @swagger
 * securityDefinitions:
 *   BasicAuth:
 *     type: basic
 *   ApiKeyAuth:
 *     type: apiKey
 *     in: header
 *     name: X-API-Key
 *   OAuth2:
 *     type: oauth2
 *     flow: accessCode
 *     authorizationUrl: https://example.com/oauth/authorize
 *     tokenUrl: https://example.com/oauth/token
 *     scopes:
 *       read: Grants read access
 *       write: Grants write access
 *       admin: Grants read and write access to administrative information
 */
/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: The Auth managing 
 * components:
 *  schemas:
 *      Auth:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *                  description: user email
 *              password:
 *                  type: string
 *                  description: person last name
 *          example:
 *              email: test@admin.com
 *              password: test_admin
 */


/**
 * @swagger
 * /login:
 *  post:
 *    summary: Get the auth token
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Auth'
 *    responses:
 *      200:
 *       description: The auth token
 *       content:
 *          application/json:
 *              schema:
 *      404:
 *       description: The user was not found.
 *      400:
 *       description: Bad Request!.
 */
router.post(
  "/login",
//   [
//     check("email", "Please enter a valid email").isEmail(),
//     check("password", "Please enter a valid password").isLength({min: 6})
//   ],
  controller.signin
);

// router.post(
//   "/change-password",
//   [
//     check("password", "Please enter a valid password").isLength({min: 6}),
//     authJwt.verifyToken
//   ],
//   controller.changePassword
// );
module.exports = router;
