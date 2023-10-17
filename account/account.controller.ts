import type { NextFunction, Request, Response } from "express";

import * as AccountService from "./account.service";

// Creates a new account for a customer
export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newAccount = await AccountService.create(req.body);

        return res.status(200).json({
            status: 200,
            message: "Successfully created new account.",
            account: newAccount,
        });
    } catch (err: any) {
        next(err);
    }
};

// Transfers an amount from one account to another
export const transferAmount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fromAccountId, toAccountId, transferAmount } = req.body;

        const transfer = await AccountService.transfer(fromAccountId, toAccountId, transferAmount);

        return res.status(200).json({ status: 200, message: "Successfully completed account transfer.", transfer });
    } catch (err: any) {
        next(err);
    }
};

// Retrieves the balance of an account
export const getBalance = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const balance = await AccountService.balance(parseInt(req.params.accountId));

        return res.status(200).json({
            status: 200,
            message: "Successfully retrieved account balance.",
            balance,
        });
    } catch (err: any) {
        next(err);
    }
};

/** ----------- EXTRA CONVENIENCE APIS ----------- */

// Deposits amount to an account
export const depositToAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await AccountService.deposit(req.body.id, req.body.amount);

        return res.status(200).json({
            status: 200,
            message: "Successfully deposited amount to the account.",
            account,
        });
    } catch (err: any) {
        next(err);
    }
};

// Withdraws an amount from an account
export const withdrawFromAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const account = await AccountService.withdraw(req.body.id, req.body.amount);

        return res.status(200).json({
            status: 200,
            message: "Successfully withdrew amount from the account.",
            account,
        });
    } catch (err: any) {
        next(err);
    }
};
