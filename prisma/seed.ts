import { PrismaClient } from "@prisma/client";
import { customers } from "../customer/customers";

const prisma = new PrismaClient();

// Creates pre-populated customer data when running the seed command
async function main() {
    const date = new Date();

    for (let idx = 0; idx < customers.length; idx++) {
        const customer = customers[idx];

        await prisma.customer.upsert({
            where: {
                id: customer.id,
            },
            create: {
                id: customer.id,
                firstName: customer.firstName,
                middleName: customer.middleName || "",
                lastName: customer.lastName,
                createdAt: date,
            },
            update: {
                id: customer.id,
                firstName: customer.firstName,
                middleName: customer.middleName || "",
                lastName: customer.lastName,
                createdAt: date,
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
