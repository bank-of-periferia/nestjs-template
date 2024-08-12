module.exports = {
  preset: 'ts-jest', 
  moduleFileExtensions: ['js', 'json', 'ts', 'node'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@test/(.*)$': '<rootDir>/test/$1',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage/',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['main.ts', '.module.ts$'],
};
