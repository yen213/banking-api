import express from "express";

import * as AccountValidator from "../middleware/AccountValidator";

import { createAccount, depositToAccount, getBalance, transferAmount, withdrawFromAccount } from "./account.controller";

export const accountRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     # Account schema
 *     Account:
 *       type: object
 *       required:
 *         - customerId
 *         - balance
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the account
 *           minimum: 1
 *         customerId:
 *           type: integer
 *           description: The id of the customer this account belongs to
 *           minimum: 1
 *         balance:
 *           type: number
 *           description: The balance of the account
 *           minimum: 0
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the account was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the account was updated
 *       example:
 *         id: 1
 *         customerId: 2
 *         balance: 223.12
 *         createdAt: 2023-09-01T22:37:17.096Z
 *         updatedAt: 2023-09-01T22:37:17.096Z
 *
 *   responses:
 *     # Account responses
 *     AccountResponse:
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
 *               account:
 *                 $ref: '#/components/schemas/Account'
 *                 description: The account information
 */

/**
 * @swagger
 * tags:
 *   name: Account
 *   description: The account related APIs
 *
 * /account/balance/{accountId}":
 *   get:
 *     summary: Gets the balance of an account
 *     tags: [Account]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The database ID of the account
 *     responses:
 *       200:
 *         description: Successful HTTP response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   description: HTTP response code
 *                 message:
 *                   type: string
 *                   description: HTTP response message
 *                 balance:
 *                   type: number
 *                   description: The current balance of the account
 *                   minimum: 0
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /account/new/:
 *   post:
 *     summary: Creates a new account for a customer
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [customerId, balance]
 *             properties:
 *               customerId:
 *                 type: integer
 *                 description: The id of the customer this account belongs to
 *                 minimum: 1
 *               balance:
 *                 type: number
 *                 description: The initial deposit amount
 *                 minimum: 0
 *       example:
 *         customerId: 1
 *         balance: 300
 *     responses:
 *       200:
 *         $ref: '#/components/responses/AccountResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /account/transfer/:
 *   post:
 *     summary: Transfer an amount from one account to another
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [fromAccountId, toAccountId, transferAmount]
 *             properties:
 *               fromAccountId:
 *                 type: integer
 *                 description: The id of the account to transfer from
 *                 minimum: 1
 *               toAccountId:
 *                 type: integer
 *                 description: The id of the account to transfer to
 *                 minimum: 1
 *               transferAmount:
 *                 type: number
 *                 description: The amount to transfer
 *                 minimum: 0.01
 *       example:
 *         fromAccountId: 1
 *         toAccountId: 2
 *         transferAmount: 100.12
 *     responses:
 *       200:
 *         $ref: '#/components/responses/TransferResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /account/deposit/:
 *   post:
 *     summary: Deposits an amount to an account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, amount]
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The id of the account to deposit to
 *                 minimum: 1
 *               amount:
 *                 type: number
 *                 description: The amount to deposit
 *                 minimum: 0.01
 *       example:
 *         id: 1
 *         amount: 120.12
 *     responses:
 *       200:
 *         $ref: '#/components/responses/AccountResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *
 * /account/withdraw/:
 *   post:
 *     summary: Withdraws an amount from an account
 *     tags: [Account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id, amount]
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The id of the account to withdraw from
 *                 minimum: 1
 *               amount:
 *                 type: number
 *                 description: The amount to withdraw
 *                 minimum: 0.01
 *       example:
 *         id: 3
 *         amount: 20.11
 *     responses:
 *       200:
 *         $ref: '#/components/responses/AccountResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

// Get account balance
accountRouter.get("/balance/:accountId", AccountValidator.balanceValidator, getBalance);

// Create account
accountRouter.post("/new", AccountValidator.createAccountValidator, createAccount);

// Transfer amount between accounts
accountRouter.post("/transfer", AccountValidator.transferValidator, transferAmount);

// Deposit amount to account
accountRouter.post("/deposit", AccountValidator.withdrawAndDepositValidator, depositToAccount);

// Withdraw amount from account
accountRouter.post("/withdraw", AccountValidator.withdrawAndDepositValidator, withdrawFromAccount);
