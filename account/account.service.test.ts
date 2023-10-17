import { prismaMock } from "../prisma/singleton";
import * as AccountService from "./account.service";

describe("account.service tests", () => {
    test("create account", async () => {
        const date = new Date("2023-09-02T02:18:46.018Z");
        const customer = {
            id: 23,
            firstName: "John",
            middleName: "",
            lastName: "Test",
            createdAt: date,
        };
        const account = {
            id: 123,
            customerId: customer.id,
            balance: 1200,
            createdAt: date,
            updatedAt: date,
        };

        prismaMock.customer.findUniqueOrThrow.mockResolvedValue(customer);
        prismaMock.account.create.mockResolvedValue(account);

        const savedAccount = await AccountService.create(account);

        expect(savedAccount).toEqual(expect.objectContaining(account));
    });
});
