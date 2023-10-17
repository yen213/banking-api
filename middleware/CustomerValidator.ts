import type { Request, Response, NextFunction } from "express";

import { isValidInteger } from "../util/isValidInteger";

// Validates that get customer request has an integer route parameter
export const getCustomerValidator = (req: Request, res: Response, next: NextFunction) => {
    if (!isValidInteger(req.params.customerId)) {
        return res.status(400).json({ status: 400, message: "Route parameter must be an integer." });
    }

    next();
};

// Validates that create customer request has firstName and lastName fields
export const postCustomerValidator = (req: Request, res: Response, next: NextFunction) => {
    if (req.body.firstName == null || typeof req.body.firstName !== "string") {
        return res.status(400).json({ status: 400, message: "Customer first name required and must be a string." });
    } else if (req.body.lastName == null || typeof req.body.lastName !== "string") {
        return res.status(400).json({ status: 400, message: "Customer last name required and must be a string." });
    }

    next();
};
