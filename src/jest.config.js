export const moduleNameMapper = {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/test/fileMock.js",
};
export const testPathIgnorePatterns = [
    "<rootDir>/node_modules/",
    "<rootDir>/build/",
    "<rootDir>/public/",
];
export const testEnvironment = "jsdom";
export const setupFilesAfterEnv = ["@testing-library/jest-dom/extend-expect"];
export const collectCoverage = true;
export const coverageReporters = ["json", "lcov", "text", "clover"];
export const coverageThreshold = {
    global: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
    },
};
export const collectCoverageFrom = [
    "src/**/*.{js,jsx}",
    "!src/index.js",
    "!src/serviceWorker.js",
    "!src/setupTests.js",
];
export const testMatch = ["<rootDir>/src/**/__tests__/**/*.{js,jsx}"];
  