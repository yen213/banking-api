import type { NextFunction, Request, Response } from "express";

import { findAccountTransfers } from "./account-transfer.service";

// Retrieves all transfer history for an account
export const getTransferHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transferHistory = await findAccountTransfers(parseInt(req.params.accountId));

        return res.status(200).json({
            status: 200,
            message: "Successfully retrieved account transfer history.",
            transfers: transferHistory,
        });
    } catch (err: any) {
        next(err);
    }
};
