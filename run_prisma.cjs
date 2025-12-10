require('dotenv').config();
const { spawn } = require('child_process');

console.log("Database URL present:", !!process.env.DATABASE_URL);
if (process.env.DATABASE_URL) {
    console.log("Database URL starts with:", process.env.DATABASE_URL.substring(0, 15) + "...");
}

// Ensure env is clean and passed explicitly
const env = { ...process.env };

const child = spawn('npx', ['prisma', 'db', 'push'], {
    stdio: 'inherit',
    env: env,
    shell: true
});

child.on('exit', (code) => {
    console.log(`Prisma exited with code ${code}`);
    process.exit(code);
});
