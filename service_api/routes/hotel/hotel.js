const router = require('express').Router();
const {resError, resSuccess} = require("../../consts");
const ctrl = require('../../controllers/hotel/hotel');
const router_hotelSchedule = require('./schedule/schedule');

router.use("/schedule",router_hotelSchedule);

router.post('/getAvailableRooms', (req,res) => {
  ctrl.getAvailableRooms(req).then(rooms => resSuccess(res, rooms)).catch(err => resError(res, err));
});

router.put('/addRooms', (req,res) => {
  ctrl.addRooms(req).then(str => resSuccess(res, str)).catch(err => resError(res, err));
});

router.put('/create', (req,res) => {
  ctrl.createHotel(req).then(hotel => resSuccess(res, hotel)).catch(err => resError(res, err));
});

module.exports = router;
