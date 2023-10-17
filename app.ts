import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { ErrorHandler } from "./middleware/ErrorHandler";

import { accountRouter } from "./account/account.router";
import { accountTransferRouter } from "./account-transfer/account-transfer.router";
import { customerRouter } from "./customer/customer.router";

const app = express();
const port = 3000;

// --------------------- MIDDLEWARE ---------------------
app.use(express.json());

// Swagger JsDoc options
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Bank API",
            version: "0.1.0",
            description: "APIs for a financial institution to be used internally.",
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
    },
    apis: [
        "./account/account.router.ts",
        "./account-transfer/account-transfer.router.ts",
        "./customer/customer.router.ts",
        "./swagger/components.ts",
    ],
};

// Bank Base API paths
app.use("/customer", customerRouter);
app.use("/account", accountRouter);
app.use("/account-transfer", accountTransferRouter);

// Documentation for APIs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options), { explorer: true }));

// Handle errors
app.use(ErrorHandler);

// Handle 404
app.use((req, res, next) => {
    res.status(404).json({
        status: 404,
        message: "Invalid path.",
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
