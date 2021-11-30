const { Router } = require('express');
const controller = require('../controller/tour');

const route = Router();

/**
 * @swagger
 * /tours/status:
 *  get:
 *    summary: Tour rating and price status
 *    tags: [Tour]
 *    responses:
 *      204:
 *       description: The item was successfully deleted.
 *       content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   code:
 *                       type: number
 *                       description: response code 200
 *                   status:
 *                       type: string
 *                       description: response status success
 *                   data:
 *                       type: object
 *      404:
 *       description: The item was not found.
 *      500:
 *       description: Server error.
 */
route.get('/status', controller.checkStatus);

route.param('id', controller.checkId);
/**
 * @swagger
 * components:
 *  schemas:
 *      Tour:
 *          type: object
 *          required:
 *              - name
 *              - age
 *              - durations
 *              - maxGroupSize
 *              - difficulty
 *              - price
 *              - summery
 *              - imageCover
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto-generated id
 *              name:
 *                  type: string
 *                  description: tour name
 *          example:
 *              _id: 5c88fa8cf4afda39709c2951
 *              name: "The Forest Hiker"
 *              duration: 5
 *              maxGroupSize: 25
 *              difficulty: "easy"
 *              price: 397
 *              summary: "Breathtaking hike through the Canadian Banff National Park"
 *              description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
 *              imageCover: "tour-1-cover.jpg"
 *              ratingsAverage: 4.8
 *              ratingsQuantity: 11
 *              images: [
 *                "tour-1-1.jpg",
 *                "tour-1-2.jpg",
 *                "tour-1-3.jpg"
 *              ]
 *              startDates: [
 *                "2021-04-25T09:00:00.000Z",
 *                "2021-07-20T09:00:00.000Z",
 *                "2021-10-05T09:00:00.000Z"
 *              ]
 */

/**
 * @swagger
 * tags:
 *  name: Tour
 *  description: The employee managing API
 */

/**
 * @swagger
 * /tours:
 *  get:
 *    summary: Returns the list of tours
 *    tags: [Tour]
 *    parameters:
 *      - $ref: '#/components/parameters/limitParam'
 *      - $ref: '#/components/parameters/pageParam'
 *    responses:
 *      200:
 *       description: The list of tours
 *       content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   code:
 *                       type: number
 *                       description: response code [200, 400, 500 .....]
 *                   status:
 *                       type: string
 *                       description: response status [success, fail, error]
 *                   data:
 *                       type: array
 *                       items:
 *                           $ref: '#/components/schemas/Tour'
 *    security:
 *    - bearerAuth: []
 */
route.get('/', controller.list);

/**
 * @swagger
 * /tours/{id}:
 *  get:
 *    summary: Get the tour by id
 *    tags: [Tour]
 *    parameters:
 *      - $ref: '#/components/parameters/idPath'
 *    responses:
 *      200:
 *       description: The tour success body
 *       content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   code:
 *                       type: number
 *                       value: 200
 *                       description: response code [200 .....]
 *                   status:
 *                       type: string
 *                       description: response status [success]
 *                   data:
 *                       type: object
 *                       $ref: '#/components/schemas/Tour'
 *      404:
 *       description: The item was not found.
 *      500:
 *       description: Bad Request!.
 */
route.get('/:id', controller.findOne);

/**
 * @swagger
 * /tours:
 *  post:
 *    summary: Create new item
 *    tags: [Tour]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Tour'
 *    responses:
 *      200:
 *       description: The employee was successfully created.
 *       content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   code:
 *                       type: number
 *                       value: 200
 *                       description: response code [200 .....]
 *                   status:
 *                       type: string
 *                       description: response status [success]
 *                   data:
 *                       type: object
 *                       $ref: '#/components/schemas/Tour'
 *      500:
 *       description: Server error.
 */

route.post('/', controller.create);

/**
 * @swagger
 * /tours/{id}:
 *  put:
 *    summary: Update the employee by id
 *    tags: [Tour]
 *    parameters:
 *      - $ref: '#/components/parameters/idPath'
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Tour'
 *    responses:
 *      200:
 *       description: The employee was successfully updated.
 *       content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Tour'
 *      404:
 *       description: The item was not found.
 *      500:
 *       description: Server error.
 */

route.put('/:id', controller.updateOne);

/**
 * @swagger
 * /tours/{id}:
 *  delete:
 *    summary: Delete the item by id
 *    tags: [Tour]
 *    parameters:
 *      - $ref: '#/components/parameters/idPath'
 *    responses:
 *      204:
 *       description: The item was successfully deleted.
 *       content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                   code:
 *                       type: number
 *                       description: response code 204
 *                   status:
 *                       type: string
 *                       description: response status success
 *                   message:
 *                       type: string
 *                       description: The data was deleted successfully.
 *      404:
 *       description: The item was not found.
 *      500:
 *       description: Server error.
 */

route.delete('/:id', controller.deleteOne);

module.exports = route;
