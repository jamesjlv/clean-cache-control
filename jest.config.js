module.exports = {
  roots: ["<rootDir/src>"],
  testEnvironment: "node",
  transform: {
    ".+\\.ts$": "ts-jst",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
};
