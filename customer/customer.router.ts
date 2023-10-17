import express from "express";

import { createCustomer, getCustomer } from "./customer.controller";
import { getCustomerValidator, postCustomerValidator } from "../middleware/CustomerValidator";

export const customerRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     # Customer schema
 *     Customer:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the customer
 *           minimum: 1
 *         firstName:
 *           type: string
 *           description: The first name of the customer
 *         middleName:
 *           type: string
 *           description: The middle name of the customer
 *         lastName:
 *           type: string
 *           description: The last name of the customer
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the customer was created
 *       example:
 *         id: 1
 *         firstName: "John"
 *         middleName: ""
 *         lastName: "Wick"
 *         createdAt: 2023-09-01T22:37:17.096Z
 *
 *   responses:
 *     # Customer Responses
 *     CustomerResponse:
 *       description: Successful HTTP response
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: integer
 *                 description: HTTP response code
 *               message:
 *                 type: string
 *                 description: HTTP response message
 *               customer:
 *                 $ref: '#/components/schemas/Customer'
 *                 description: Database customer object
 */

/**
 * @swagger
 * tags:
 *   name: Customer
 *   description: The customer related APIs
 *
 * /customer/{customerId}:
 *   get:
 *     summary: Gets a customer's information
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: customerId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The database ID of the customer
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CustomerResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /customer/new/:
 *   post:
 *     summary: Creates a new customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName]
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the customer
 *               middleName:
 *                 type: string
 *                 description: The middle name of the customer
 *               lastName:
 *                 type: string
 *                 description: The last name of the customer
 *       example:
 *         firstName: "John"
 *         middleName: ""
 *         lastName: "Wick"
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CustomerResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

// Get customer information
customerRouter.get("/:customerId", getCustomerValidator, getCustomer);

// Add new customer
customerRouter.post("/new", postCustomerValidator, createCustomer);
