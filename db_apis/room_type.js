const oracledb = require('oracledb');
const database = require('../services/database.js');

/* GET */
const baseQuery = 'select room_type_id "id", room_type "room_type", description "description", capacity "capacity", price "price" from room_type';
 
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

/* POST */
const createSql ='insert into room_type values ( :room_type_id, :room_type, :description, :capacity, :price);';

//insert into room_type values ( :room_type_id, :room_type,:description,:capacity,:price) returning room_type_id into :room_type_id

async function create(emp) {
  const roomType = Object.assign({}, emp);
  
  /*roomType.room_type_id = {
    dir: oracledb.BIND_OUT,
    type: oracledb.NUMBER
  }*/
  
  const result = await database.simpleExecute(createSql, roomType);
  //console.log(result);

  //roomType.room_type_id = result.outBinds.room_type_id[0];
 
  return roomType;
}
 
module.exports.create = create;

/* PUT */
const updateSql = 'update room_type set room_type = :room_type, description = :description, capacity = :capacity, price = :price where room_type_id = :room_type_id';
 
async function update(emp) {
  const roomType = Object.assign({}, emp);
  const result = await database.simpleExecute(updateSql, roomType);
 
  if (result.rowsAffected && result.rowsAffected === 1) {
    return roomType;
  } else {
    return null;
  }
}
 
module.exports.update = update;

/* DELETE */
const deleteSql = 'begin delete from room_type where room_type_id = :room_type_id; :rowcount := sql%rowcount; end;';

async function del(id) {
  const binds = {
    room_type_id: id,
    rowcount: {
      dir: oracledb.BIND_OUT,
      type: oracledb.NUMBER
    }
  }
  const result = await database.simpleExecute(deleteSql, binds);

  return result.outBinds.rowcount === 1;
}

module.exports.delete = del;