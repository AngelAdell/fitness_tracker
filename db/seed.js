const client = require('./client.js');
const { createActivity } = require('./activities.js');
const { createRoutine } = require('./routines.js');
const { createRoutineActivity } = require('./routines_activities.js');




const dropTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS routine_activities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS activites;
    `);
  }
  catch (error) {
    console.error(error);
  }
};

const createTables = async () => {
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
        
      `);  
      
      // await client.query(`
      // CREATE TABLE routines (
      //   id SERIAL PRIMARY KEY,
      //   is_public boolean DEFAULT false,
      //   name VARCHAR(30) UNIQUE NOT NULL,
      //   goal TEXT NOT NULL
      //   );
      // `);

      await client.query(`
      CREATE TABLE routine_activities (
        id SERIAL PRIMARY KEY,
        "routine_id" INTEGER REFERENCES routines(id),
        "activity_id" INTEGER REFERENCES activites(id),
        count INTEGER
        );
      `);
      
  } catch (error) {
    console.error(error);
  }
};

const seedSync = async () => {
  try {
    client.connect();
    console.log('client connected');

    await dropTables();
    console.log('tables dropped');

    await createTables();
    console.log('tables created');

    client.end();
    console.log('client disconnected');

  } catch (error) {
    console.error(error);
  }
}

seedSync();