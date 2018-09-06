const Room  = require('../../schemas/room');
const User  = require('../../schemas/user');

exports.getRoom = (req) => {
  return new Promise((resolve, reject) => {
    let {room_id} = req.body;
    if(!room_id) reject('room_id param is missing');

    Room.findById(room_id).populate('user').populate('hotel_id').exec((err, room) => {
      if(err) reject(err.message);
      if(!room) reject(`Room: ${room_id} not exists`);
      resolve(room);
    });
  });
}

exports.checkIn = (req) => {
  return new Promise((resolve, reject) => {
    let {room_id, user_id} = req.body;
    if(!room_id || !user_id) reject('room_id || user_id params are missing');

    Room.checkIn(room_id, user_id).then((room) => {
      resolve(room);
    }).catch((e) => {
      reject(e.message);
    });
  });
}
exports.checkOut = (req) => {
  return new Promise((resolve, reject)  => {
    let {room_id, user_id} = req.body;
    if(!room_id || !user_id) reject('room_id || user_id params are missing');

    Room.checkOut(room_id, user_id).then(room => resolve(room)).catch(e => reject(e.message));
  });
}
/*
exports.checkOut = (req) => {
  return new Promise((resolve, reject)  => {
    let {room_id, user_id} = req.body;
    if(!room_id || !user_id) return reject('room_id || user_id params are missing');

    User.findById(user_id).exec((err, user) => {
      if(!user) return reject(`user ${user_id} not exists`);

      Room.findById(room_id).exec((err, room) => {
        if(!room) return reject(`room ${room_id} is not exists`);
        else if(room.user == null) return reject('room is already empty');
        else if(room.user != user._id) return reject(`room is occupied by another user: ${room.user}`);

        room.user = null;
        room.save((err, room) => {
          if(err) return reject(err.message);
          resolve(room);
        })
      });
    })
  });
}
*/
