
//if (!process.env.NODE_ENV)
//{
//    console.log("server not activated, execute [NODE_ENV=PROD nodemon index] or [NODE_ENV=TEST nodemon index]");
//    process.exit(1);
//}
var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io',io);

http.listen(8080, function() {
    console.log("running as a plumbus! - Port 8080");
})
