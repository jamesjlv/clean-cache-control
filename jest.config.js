module.exports = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": ["babel-jest"],
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
