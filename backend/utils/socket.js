module.exports = (io) => {
  io.on('connection', (socket) => {
    // console.log('New client connected');
    
    socket.on('newBooking', (booking) => {
      io.emit('adminNotification', booking);
    });
    
    socket.on('disconnect', () => {
      // console.log('Client disconnected');
    });
  });
};