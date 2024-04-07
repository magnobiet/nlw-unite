import { faker } from '@faker-js/faker';
import { database } from '../src/database/database';

const eventsSeed = [
  {
    id: '445ed340-32b2-48f0-a7d4-dd1ee50ea8d6',
    name: 'Unite Summit',
    slug: 'unite-summit',
    details: 'Coding solution for the world',
    maximumAttendees: 100,
  },
  ...Array.from({ length: 20 }).map(() => {
    const name = faker.lorem.sentence({ min: 3, max: 5 });

    return {
      id: faker.string.uuid(),
      name,
      slug: faker.helpers.slugify(name).replace('.', '').toLowerCase(),
      details: faker.lorem.sentence({ min: 5, max: 15 }),
      maximumAttendees: faker.number.int({ min: 50, max: 100 }),
    };
  }),
];

const attendeesSeed = [
  {
    name: 'Magno Biét',
    email: 'magno.biet@gmail.com',
    eventId: eventsSeed[0].id,
  },
  ...Array.from({ length: 489 }).map(() => {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email().toLowerCase(),
      eventId: eventsSeed[faker.number.int({ min: 1, max: 5 })].id,
      createdAt: faker.date.recent({
        days: faker.number.int({ min: 15, max: 45 }),
      }),
    };
  }),
];

async function seed() {
  await database.event.createMany({ data: eventsSeed });

  await database.attendee.createMany({ data: attendeesSeed });

  const attendees = await database.attendee.findMany();

  await database.checkIn.createMany({
    data: attendees
      .filter(({ id }) => id % 2)
      .map((attendee) => ({
        attendeeId: attendee.id,
        createdAt: faker.date.recent({
          days: faker.number.int({ min: 7, max: 14 }),
        }),
      })),
  });
}

seed().then(() => {
  console.log('Database seeded');

  database.$disconnect();
});
