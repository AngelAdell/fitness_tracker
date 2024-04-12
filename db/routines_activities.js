const client = require('./client.js');

const createRoutineActivity = async ({ routineId, activityId, count, duration }) => {
  try {
    const {rows: [routineActivity]} = await client.query (`
      INSERT INTO routine_activities ("routine_id", "activity_id", count, duration),
      Values('${routineId}', '${activityId}', '${count}', '${duration}')
      RETURNING *;
      `);
      return routineActivity;
  } catch (error) {
    console.error(error);
  };
} 

module.exports = {createRoutineActivity};
