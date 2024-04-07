import { faker } from '@faker-js/faker';

export const attendeesMock = [
  {
    id: 10000,
    name: 'Magno Biét',
    email: 'magno.biet@gmail.com',
    createdAt: faker.date.recent({ days: 30 }),
    checkedInAt: faker.date.recent({ days: 7 }),
  },
].concat(
  Array.from({ length: 200 }).map(() => {
    return {
      id: faker.number.int({ min: 10001, max: 20000 }),
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      createdAt: faker.date.recent({ days: 30 }),
      checkedInAt: faker.date.recent({ days: 7 }),
    };
  }),
);
