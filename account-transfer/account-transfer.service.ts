import { AccountTransfer } from "@prisma/client";

import db from "../prisma/client";

// Creates a new account transfer history
export const create = async (
    accountTransfer: Omit<AccountTransfer, "id" | "transferDate">
): Promise<AccountTransfer> => {
    return db.accountTransfer.create({
        data: { ...accountTransfer },
    });
};

// Finds all outgoing and incoming transfers for an account
export const findAccountTransfers = async (accountId: number): Promise<AccountTransfer[]> => {
    const transfers = await db.accountTransfer.findMany({
        where: {
            OR: [
                {
                    fromAccountId: accountId,
                },
                {
                    AND: {
                        toAccountId: accountId,
                    },
                },
            ],
        },
        orderBy: {
            transferDate: "desc",
        },
    });

    return transfers.map((transfer) => ({ ...transfer, amount: transfer.amount / 100 }));
};
