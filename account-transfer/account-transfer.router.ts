import express from "express";

import { getTransferHistory } from "./account-transfer.controller";
import { transferHistoryValidator } from "../middleware/AccountTransferValidator";

export const accountTransferRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     # AccountTransfer schema
 *     AccountTransfer:
 *       type: object
 *       required:
 *         - fromAccountId
 *         - toAccountId
 *         - amount
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the account transfer
 *           minimum: 1
 *         fromAccountId:
 *           type: integer
 *           description: The account id where amount was transferred from
 *           minimum: 1
 *         toAccountId:
 *           type: integer
 *           description: The account id where amount was transferred to
 *           minimum: 1
 *         amount:
 *           type: number
 *           description: The amount to transfer
 *           minimum: 0.01
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time the account transfer was created
 *       example:
 *         id: 1
 *         fromAccountId: 3
 *         toAccountId: 1
 *         amount: 23.44
 *         createdAt: 2023-09-01T22:37:17.096Z
 *
 *   responses:
 *     # Account transfer responses
 *     TransferResponseArr:
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
 *               transfers:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/AccountTransfer'
 *                   description: Array of the history of all the account transfers
 *     TransferResponse:
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
 *               transfer:
 *                 type: object
 *                 $ref: '#/components/schemas/AccountTransfer'
 *                 description: An account transfer information
 */

/**
 * @swagger
 * tags:
 *   name: Account Transfer
 *   description: The account transfer related APIs
 *
 * /account-transfer/history/{accountId}:
 *   get:
 *     summary: Gets the transfer history of an account
 *     tags: [Account Transfer]
 *     parameters:
 *       - in: path
 *         name: accountId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The database ID of the account
 *     responses:
 *       200:
 *         $ref: '#/components/responses/TransferResponseArr'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

// Get the transfer history for an account
accountTransferRouter.get("/history/:accountId", transferHistoryValidator, getTransferHistory);
