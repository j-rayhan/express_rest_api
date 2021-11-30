const { Router } = require('express');
const controller = require('../controller/employee');

const route = Router();
route.get('/top-5', controller.aliasTopFive, controller.list);

route.param('id', controller.checkId);
/**
 * @swagger
 * components:
 *  parameters:
 *    idPath:
 *      in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The item id
 *    limitParam:
 *      in: query
 *      name: limit
 *      required: false
 *      schema:
 *        type: integer
 *        minimum: 1
 *        maximum: 50
 *        default: 20
 *      description: The numbers of items to return.
 *    pageParam:
 *      in: query
 *      name: page
 *      required: false
 *      schema:
 *        type: integer
 *        minimum: 1
 *        default: 1
 *      description: The numbers of items to skip.
 *    sortParam:
 *      in: query
 *      name: sort
 *      required: false
 *      schema:
 *        type: string
 *      description: The numbers of items to sorting return.
 *      example:
 *          -age
 *    fieldsParam:
 *      in: query
 *      name: fields
 *      required: false
 *      schema:
 *        type: string
 *      description: The fields in item to return.
 *      example:
 *          first_name,last_name,age,ip
 *    ageParam:
 *      in: query
 *      name: age
 *      required: false
 *      schema:
 *        type: number
 *      description: The fields name and value in item query.
 *      example:
 *          79
 *  schemas:
 *      success:
 *          type: object
 *          properties:
 *              code:
 *                  type: number
 *                  description: response code [200 .....]
 *              status:
 *                  type: string
 *                  description: response status [success]
 *              data:
 *                  type: object | array
 *                  description: response item | items
 *      error:
 *          type: object
 *          properties:
 *              code:
 *                  type: number
 *                  description: response code [400 ..... 500]
 *              status:
 *                  type: string
 *                  description: response status [success, fail, error]
 *              message:
 *                  type: string
 *                  description: error details
 *      Employee:
 *          type: object
 *          required:
 *              - first_name
 *              - age
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto-generated id
 *              first_name:
 *                  type: string
 *                  description: employee first name
 *              last_name:
 *                  type: string
 *                  description: employee last name
 *              age:
 *                  type: number
 *                  description: employee age
 *              rating:
 *                  type: number
 *                  description: employee rating
 *              ip:
 *                  type: string
 *                  description: employee ip address
 *          example:
 *              _id: 6171aea424439b284863daa0
 *              first_name: joho
 *              last_name: dou
 *              age: 23
 *              rating: 1
 *              ip: 127.0.0.1
 */

/**
 * @swagger
 * tags:
 *  name: Employee
 *  description: The employee managing API
 */

/**
 * @swagger
 * /employees:
 *  get:
 *    summary: Returns the list of employees
 *    tags: [Employee]
 *    parameters:
 *      - $ref: '#/components/parameters/limitParam'
 *      - $ref: '#/components/parameters/pageParam'
 *      - $ref: '#/components/parameters/sortParam'
 *      - $ref: '#/components/parameters/fieldsParam'
 *      - $ref: '#/components/parameters/ageParam'
 *    responses:
 *      200:
 *       description: The list of employees
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
 *                           $ref: '#/components/schemas/Employee'
 *    security:
 *    - bearerAuth: []
 */
route.get('/', controller.list);

/**
 * @swagger
 * /employees/{id}:
 *  get:
 *    summary: Get the employee by id
 *    tags: [Employee]
 *    parameters:
 *      - $ref: '#/components/parameters/idPath'
 *    responses:
 *      200:
 *       description: The employee details by id
 *       content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Employee'
 *      404:
 *       description: The item was not found.
 *      500:
 *       description: Bad Request!.
 */
route.get('/:id', controller.findOne);

/**
 * @swagger
 * /employees:
 *  post:
 *    summary: Create new item
 *    tags: [Employee]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Employee'
 *    responses:
 *      200:
 *       description: The employee was successfully created.
 *       content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Employee'
 *      500:
 *       description: Server error.
 */

route.post('/', controller.create);

/**
 * @swagger
 * /employees/{id}:
 *  put:
 *    summary: Update the employee by id
 *    tags: [Employee]
 *    parameters:
 *      - $ref: '#/components/parameters/idPath'
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Employee'
 *    responses:
 *      200:
 *       description: The employee was successfully updated.
 *       content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Employee'
 *      404:
 *       description: The item was not found.
 *      500:
 *       description: Server error.
 */

route.put('/:id', controller.updateOne);

/**
 * @swagger
 * /employees/{id}:
 *  delete:
 *    summary: Delete the item by id
 *    tags: [Employee]
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
