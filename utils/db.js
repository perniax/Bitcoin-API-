const spicedPg = require("spiced-pg");

let db;

db = spicedPg(`postgres:postgres:Pernia1985@localhost:5432/bitmonitor`);

// if (process.env.DATABASE_URL) {
//     db = spicedPg(process.env.DATABASE_URL);
// } else {
//     const { dbuser, dbpass } = require("../secrets.json");
//     db = spicedPg(`postgres:${dbuser}:${dbpass}@localhost:5432/petition`);
// }
