module.exports = {
    verbose: true,
    clearMocks: true,
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["./prisma/singleton.ts"],
    testPathDirs: ["./account/*.test.ts"],
};
