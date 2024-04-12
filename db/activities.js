const client = require('./client.js');

const createActivity = async ({ name, description }) => {
  try {
    const {rows: [activity]} = await client.query (`
      INSERT INTO activity (name, description),
      Values('${name}', '${description}')
      RETURNING *;
      `);
      return activity;
  } catch (error) {
    console.error(error);
  };
}

module.exports = {createActivity};
