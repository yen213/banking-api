import { PrismaClient } from "@prisma/client";

// Create and reuse one instance of the Prisma Client
const db = new PrismaClient({
    log: [
        { emit: "event", level: "error" },
        { emit: "event", level: "warn" },
    ],
});

db.$on("error", (prismaError) => {
    console.error(prismaError);
});

db.$on("warn", (prismaWarn) => {
    console.warn(prismaWarn);
});

export default db;
