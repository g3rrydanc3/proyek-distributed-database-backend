const database = require('../services/database.js');
 
const baseQuery = 
 'select room_type_id "id", room_type "room_type", description "description", capacity "capacity", price "price" from room_type';
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.id) {
    binds.room_type_id = context.id;
 
    query += '\nwhere room_type_id = :room_type_id';
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;