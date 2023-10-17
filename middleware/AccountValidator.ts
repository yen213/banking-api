import type { Request, Response, NextFunction } from "express";

import { isValidAmount } from "../util/isValidAmount";
import { isValidInteger } from "../util/isValidInteger";

// Validates customerId is an integer and balance is a number with at most 2 decimal places
export const createAccountValidator = (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.customerId !== "number") {
        return res.status(400).json({ status: 400, message: "Customer ID must be a number." });
    } else if (!isValidAmount(req.body.balance) || req.body.balance < 0) {
        return res.status(400).json({
            status: 400,
            message: "Initial deposit must be 0 or more with at most 2 decimal places.",
        });
    }

    next();
};

// Validates accountId is an integer
export const balanceValidator = (req: Request, res: Response, next: NextFunction) => {
    if (!isValidInteger(req.params.accountId)) {
        return res.status(400).json({ status: 400, message: "Route parameter must be an integer." });
    }

    next();
};

// Validates fromAccountId and toAccountId are numbers and transferAmount is a number with at most 2 decimal places
export const transferValidator = (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.fromAccountId !== "number") {
        return res.status(400).json({ status: 400, message: "From Account ID must be a number." });
    } else if (typeof req.body.toAccountId !== "number") {
        return res.status(400).json({ status: 400, message: "To Account ID must be a number." });
    } else if (req.body.fromAccountId === req.body.toAccountId) {
        return res.status(400).json({ status: 400, message: "Cannot transfer within the same account." });
    } else if (!isValidAmount(req.body.transferAmount) || req.body.transferAmount <= 0) {
        return res.status(400).json({
            status: 400,
            message: "Transfer amount must be a number greater than 0 with at most 2 decimal places.",
        });
    }

    next();
};

// Validates id is a number and amount is a number with at most 2 decimal places
export const withdrawAndDepositValidator = (req: Request, res: Response, next: NextFunction) => {
    if (typeof req.body.id !== "number") {
        return res.status(400).json({ status: 400, message: "Account ID must be a number." });
    } else if (!isValidAmount(req.body.amount) || req.body.amount <= 0) {
        return res.status(400).json({
            status: 400,
            message: "Amount must be a number greater than 0 with at most 2 decimal places.",
        });
    }

    next();
};
