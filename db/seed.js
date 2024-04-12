const client = require('./client.js');

const seedSync = async () => {
  try {
    await client.query(`
      CREATE TABLE activites (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );  

      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        is_public boolean DEFAULT false,
        name VARCHAR(30) UNIQUE NOT NULL,
        goal TEXT NOT NULL
      );

      CREATE TABLE routine_activities (
        id SERIAL PRIMARY KEY,
        "routine_id" INTEGER REFERENCES routines(id),
        "activity_id" INTEGER REFERENCES activites(id),
        count INTEGER
      );
      
  } catch (error) {
    console.error(error);
  }
}

seedSync();

module.exports = seedSync;
