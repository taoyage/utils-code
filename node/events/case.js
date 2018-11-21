const EventEmitter = require('./events');
const util = require('util');

function Bell() {
  EventEmitter.call(this);
}

util.inherits(Bell, EventEmitter);

let bell = new Bell();

function studentInClassroom(roomNumber, things) {
  console.log(`student take a ${things} in ${roomNumber} classroom `);
}

function teacherInClassroom(roomNumber, things) {
  console.log(`teacher take a ${things} in ${roomNumber} classroom`);
}

function masterClassroom(roomNumber, things) {
  console.log(`master take a ${things} in ${roomNumber} classroom`);
}

bell.on('a', studentInClassroom);
bell.on('a', teacherInClassroom);
bell.once('a', masterClassroom);

bell.emit('a', '301', 'book');
