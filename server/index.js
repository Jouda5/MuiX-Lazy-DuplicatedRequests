import express from 'express';
import cors from 'cors';
import { faker } from '@faker-js/faker';

const app = express();
const PORT = 3001;

// Enable CORS for all routes
app.use(cors());

// Generate 100 realistic mock users
const USERS = Array.from({ length: 1000 }, (_, index) => ({
  id: index + 1,
  userName: faker.person.fullName(),
  userEmail: faker.internet.email(),
}));

// API endpoint for lazy loading users
app.get('/api/users/usersLazy', (req, res) => {
  const start = parseInt(req.query.start) || 0;
  const end = parseInt(req.query.end) || 10;
  const searchQuery = req.query.searchQuery || '';

  // Apply search filtering if provided
  let filteredUsers = [...USERS];
  if (searchQuery) {
    const searchLower = searchQuery.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.userName.toLowerCase().includes(searchLower) ||
        user.userEmail.toLowerCase().includes(searchLower)
    );
  }

  // Get total count after filtering
  const totalCount = filteredUsers.length;

  // Apply pagination
  const paginatedUsers = filteredUsers.slice(start, end);

  // Simulate network delay with random timeout between 2000ms and 4000ms
  const randomDelay = Math.random() * (4000 - 2000) + 2000;
  setTimeout(() => {
    res.json({
      items: paginatedUsers,
      totalCount,
    });
  }, randomDelay);
});

app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
});
