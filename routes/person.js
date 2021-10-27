const {Router} = require('express')
const controller = require('../controller/person');

const route = Router();
route.get('/top-5-person', controller.aliasTopPerson, controller.list);

route.param('id', controller.checkId)
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
 *      description: The person id
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
 *        type: int
 *      description: The fields name and value in item query.
 *      example:
 *          79
 *  schemas:
 *      Person:
 *          type: object
 *          required:
 *              - first_name
 *              - age
 *          properties:
 *              _id:
 *                  type: string
 *                  description: The auto-generated id of the person
 *              first_name:
 *                  type: string
 *                  description: person first name
 *              last_name:
 *                  type: string
 *                  description: person last name
 *              age:
 *                  type: int
 *                  description: person age
 *              ip:
 *                  type: string
 *                  description: person ip address
 *          example:
 *              _id: 6171aea424439b284863daa0
 *              first_name: joho
 *              last_name: dou
 *              age: 23
 *              ip: 127.0.0.1
 */

/**
 * @swagger
 * tags:
 *  name: Persons
 *  description: The persons managing API
 */

/**
 * @swagger
 * /persons:
 *  get:
 *    summary: Returns the list of persons
 *    tags: [Persons]
 *    parameters:
 *      - $ref: '#/components/parameters/limitParam'
 *      - $ref: '#/components/parameters/pageParam'
 *      - $ref: '#/components/parameters/sortParam'
 *      - $ref: '#/components/parameters/fieldsParam'
 *    responses:
 *      200:
 *       description: The list of persons
 *       content:
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Person'
 *    security:
 *    - bearerAuth: []
 */
route.get('/', controller.list);

/**
 * @swagger
 * /persons/{id}:
 *  get:
 *    summary: Get the person by id
 *    tags: [Persons]
 *    parameters:
 *      - $ref: '#/components/parameters/idPath'
 *    responses:
 *      200:
 *       description: The person details by id
 *       content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Person'
 *      404:
 *       description: The person was not found.
 *      400:
 *       description: Bad Request!.
 */
 route.get('/:id', controller.findOne);

/**
 * @swagger
 * /persons:
 *  post:
 *    summary: Create new person
 *    tags: [Persons]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Person'
 *    responses:
 *      200:
 *       description: The person was successfully created.
 *       content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Person'
 *      500:
 *       description: Server error.
 */

route.post('/', controller.create);

/**
 * @swagger
 * /persons/{id}:
 *  put:
 *    summary: Update the person by id
 *    tags: [Persons]
 *    parameters:
 *      - $ref: '#/components/parameters/idPath'
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Person'
 *    responses:
 *      200:
 *       description: The person was successfully updated.
 *       content:
 *          application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Person'
 *      404:
 *       description: The person was not found.
 *      500:
 *       description: Server error.
 */

route.put('/:id', controller.updateOne);

/**
 * @swagger
 * /persons/{id}:
 *  delete:
 *    summary: Delete the person by id
 *    tags: [Persons]
 *    parameters:
 *      - $ref: '#/components/parameters/idPath'
 *    responses:
 *      200:
 *       description: The person was successfully deleted.
 *      404:
 *       description: The person was not found.
 *      500:
 *       description: Server error.
 */

route.delete('/:id', controller.deleteOne);

module.exports = route;
