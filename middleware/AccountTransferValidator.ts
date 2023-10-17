import type { Request, Response, NextFunction } from "express";

import { isValidInteger } from "../util/isValidInteger";

// Validates accountId is an integer
export const transferHistoryValidator = (req: Request, res: Response, next: NextFunction) => {
    if (!isValidInteger(req.params.accountId)) {
        return res.status(400).json({ status: 400, message: "Route parameter must be an integer." });
    }

    next();
};
