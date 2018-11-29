const room_type = require('../db_apis/room_type.js');

/* GET */
async function get(req, res, next) {
  try {
    const context = {};
 
    context.id = parseInt(req.params.id, 10);
 
    const rows = await room_type.find(context);
 
    if (req.params.id) {
      if (rows.length === 1) {
        res.status(200).json(rows[0]);
      } else {
        res.status(404).end();
      }
    } else {
      res.status(200).json(rows);
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.get = get;

/* POST */
function getRoomTypeFromRec(req) {
  const roomType = {
    room_type_id: req.body.room_type_id,
    room_type: req.body.room_type,
    description: req.body.description,
    capacity: req.body.capacity,
    price: req.body.price
  };
 
  return roomType;
}
 
async function post(req, res, next) {
  try {
    let roomType = getRoomTypeFromRec(req);
    
    roomType = await room_type.create(roomType);
        
    res.status(201).json(roomType);
  } catch (err) {
    next(err);
  }
}
 
module.exports.post = post;

/* PUT */
async function put(req, res, next) {
  try {
    let roomType = getRoomTypeFromRec(req);
 
    roomType.room_type_id = parseInt(req.params.id, 10);
 
    roomType = await room_type.update(roomType);
 
    if (roomType !== null) {
      res.status(200).json(roomType);
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.put = put;

/* DELETE */
async function del(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);
 
    const success = await room_type.delete(id);
 
    if (success) {
      res.status(204).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
}
 
module.exports.delete = del;
