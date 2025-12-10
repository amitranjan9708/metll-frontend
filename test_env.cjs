require('dotenv').config();
console.log('DB URL:', process.env.DATABASE_URL ? 'Found' : 'Missing');
console.log('URL value:', process.env.DATABASE_URL || '');
