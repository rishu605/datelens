import { faker } from '@faker-js/faker';

const statuses = ['pending', 'completed', 'cancelled', 'processing'];

function randomDateInRange(start, end) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  return new Date(startTime + Math.random() * (endTime - startTime));
}

const today = new Date();
today.setHours(0, 0, 0, 0);
const maxDate = new Date(today);
maxDate.setDate(today.getDate() + 90);

const mockTableData = Array.from({ length: 150 }, (_, i) => {
  const randomDate = randomDateInRange(today, maxDate);
  return {
    id: String(i + 1),
    name: faker.person.fullName(),
    date: randomDate.toISOString().slice(0, 10),
    amount: `$${faker.finance.amount({ min: 500, max: 5000, dec: 2 })}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
  };
});

export default function handler(req, res) {
  res.status(200).json(mockTableData);
} 