module.exports.chatSockets = function (socketServer) {
  const Server = require('socket.io')
  //It will be handling the connections
  let io = Server(socketServer, {
    // Fixing the cors issue
    cors: {
      origin: 'http://localhost:9000',
    },
  })
  //   console.log(io.sockets.on)
  io.sockets.on('connection', function (socket) {
    console.log('New Connect Recieved ::', socket.id)


    socket.on('disconnect', function () {
      console.log('Socket disconnected')
    })

    socket.on('join_room',function (data) {

      console.log('Joining Request Recieved By codeial',data);

      socket.join(data.chatroom)

      io.in(data.chatroom).emit('user_joined',data)
      
    })

    socket.on('send_message',function (data) {

      io.in(data.chatroom).emit('recieve_message',data)
      
    })
  })
}
