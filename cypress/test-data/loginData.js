import { faker } from "@faker-js/faker";

export const loginData = () => {
  return {
  
    invalidEmail: faker.internet.email(),
    invalidPassword: faker.internet.password(),
  };
};

