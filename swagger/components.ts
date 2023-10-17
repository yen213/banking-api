/**
 * @swagger
 * components:
 *   schemas:
 *     # Error schema
 *     Error:
 *       type: object
 *       properties:
 *         status:
 *           type: integer
 *           description: HTTP response code
 *         message:
 *           type: string
 *           description: HTTP response error message
 *
 *   responses:
 *     BadRequest:
 *       description: User made a bad request
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 *     ServerError:
 *       description: Some server error
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Error'
 */
