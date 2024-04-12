const client = require('./client.js');

const createRoutine = async ({ creatorId, isPublic, name, goal }) => {
  try {
    const {rows: [routine]} = await client.query (`
      INSERT INTO routines (creator_id, is_public, name, goal),
      Values('${creatorId}', '${isPublic}', '${name}', '${goal}')
      RETURNING *;
      `);
      return routine;
  } catch (error) {
    console.error(error);
  };
}
module.exports = {createRoutine};