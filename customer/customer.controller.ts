import type { NextFunction, Request, Response } from "express";

import * as CustomerService from "./customer.service";

// Creates a new customer
export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newCustomer = await CustomerService.create(req.body);

        return res.status(200).json({
            status: 200,
            message: "Successfully created new customer.",
            customer: newCustomer,
        });
    } catch (err: any) {
        next(err);
    }
};

// Retrieves a customer's information
export const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const customer = await CustomerService.find(parseInt(req.params.customerId));

        return res.status(200).json({ status: 200, message: "Successfully retrieved customer information.", customer });
    } catch (err: any) {
        next(err);
    }
};
