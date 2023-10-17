import { Customer } from "@prisma/client";

import db from "../prisma/client";

// Creates a new customer
export const create = async (customer: Omit<Customer, "id" | "createdAt">): Promise<Customer> => {
    return db.customer.create({
        data: { ...customer },
    });
};

// Retrieves a customer or null if none exists matching the ID
export const find = async (customerId: number): Promise<Customer | null> => {
    return db.customer.findUniqueOrThrow({
        where: { id: customerId },
    });
};
