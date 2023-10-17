import { Account, AccountTransfer } from "@prisma/client";

import { create as createTransfer } from "../account-transfer/account-transfer.service";
import db from "../prisma/client";
import { find as findCustomer } from "../customer/customer.service";
import { ResponseError } from "../ResponseError";

// Creates a new account for a customer
export const create = async (account: Omit<Account, "id" | "createdAt" | "updatedAt">) => {
    const customer = await findCustomer(account.customerId);

    if (customer == null) {
        throw new ResponseError(`Account creation failed. Customer with the ID ${account.customerId} not found.`, 400);
    }

    // Balance stored in terms of cents. Ex: $23.50 -> 2350
    const newAccount = await db.account.create({
        data: { ...account, balance: account.balance * 100 },
    });

    newAccount.balance = newAccount.balance / 100;

    return newAccount;
};

// Transfers an amount from one account to another
export const transfer = async (
    fromAccountId: number,
    toAccountId: number,
    transferAmount: number
): Promise<AccountTransfer> => {
    try {
        const fromAccount = await db.account.findUniqueOrThrow({ where: { id: fromAccountId } });
        const toAccount = await db.account.findUniqueOrThrow({ where: { id: toAccountId } });
        const transferAmountCents = transferAmount * 100;

        // Throw error if transferring account does not have enough funds
        if (fromAccount.balance < transferAmountCents) {
            throw new ResponseError(
                `Cannot transfer amount of ${transferAmount} from account with balance of ${fromAccount.balance / 100}`,
                400
            );
        }

        await db.account.update({
            where: { id: fromAccount.id },
            data: { ...fromAccount, balance: fromAccount.balance - transferAmountCents },
        });

        await db.account.update({
            where: { id: toAccount.id },
            data: { ...toAccount, balance: toAccount.balance + transferAmountCents },
        });

        const transfer = await createTransfer({
            fromAccountId: fromAccount.id,
            toAccountId: toAccount.id,
            amount: transferAmountCents,
        });

        transfer.amount = transfer.amount / 100;

        return transfer;
    } catch (err: any) {
        throw err;
    }
};

// Returns the balance of a given account
export const balance = async (accountId: number): Promise<number> => {
    const balance = await db.account.findUniqueOrThrow({
        where: { id: accountId },
        select: {
            balance: true,
        },
    });

    // Balance converted to dollars and cents since we stored in cents. Ex: 2350 -> $23.50
    balance.balance = balance.balance / 100;

    return balance.balance;
};

// Deposits an amount to the account
export const deposit = async (id: number, amount: number): Promise<Account> => {
    const account = await db.account.update({
        where: {
            id,
        },
        data: {
            balance: {
                increment: amount * 100,
            },
        },
    });

    account.balance = account.balance / 100;

    return account;
};

// Withdraws an amount from an account
export const withdraw = async (id: number, amount: number): Promise<Account> => {
    const account = await db.account.findUniqueOrThrow({
        where: {
            id,
        },
    });

    if (account.balance - amount * 100 < 0) {
        throw new ResponseError(`Withdraw amount of ${amount} exceeds account balance of ${account.balance}`, 400);
    }

    const updatedAccount = await db.account.update({
        where: {
            id,
        },
        data: {
            balance: {
                decrement: amount * 100,
            },
        },
    });

    updatedAccount.balance = updatedAccount.balance / 100;

    return updatedAccount;
};
