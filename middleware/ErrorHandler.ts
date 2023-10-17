import type { NextFunction, Request, Response } from "express";

// Returns HTTP error responses
export const ErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;

    res.status(status).json({
        status,
        message: err.message || "Something went wrong",
    });
};
