/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  displayName: "chat-app",
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/jest.setup.js"],
  collectCoverage: true,
  moduleFileExtensions: ["ts", "js"],
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text"],
  testTimeout: 120000,
  coveragePathIgnorePatterns: ["<rootDir>/e2e/", "<rootDir>/src/modules/index.ts"],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 75,
      lines: 75,
      statements: 75,
    },
  },
};
