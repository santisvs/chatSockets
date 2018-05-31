/* Recuperamos el modulo express */
var express = require('express');
/* Creamos la app de express llamando al constructor de express */
var app = express();
/* Creamos el servidor http con el modulo http y pasandole la app express */
var server = require('http').Server(app);
/* Creamos el socket indicando que una parte del sochet
* es el servuidor http creado
*/
var io = require('socket.io')(server);

/* Para cargar un vista estatica por defecto con el chat, utilizamos un
 * middleware que nos proporciona express. Indicamos que todos los html
 * de la carpeta client van a ser htmls estaticos
 */
app.use(express.static('client'));

/* Creamos una ruta con express */
app.get('/hola-mundo', function(req,res){
    res.status(200).send('Hola mundo desde una ruta');
});

var messages = [{
    id: 1,
    text: 'Bienvenido al chat privado de SAntiago VAllejo',
    nickname: 'Bot servidor'
}];

/* Abrimos la conexion al socket para que dicha conexion se encargue de
 * recibir los eventos de conexion por parte de los clientes. La funcion
 * callback va a detectar a todos los clientes que se quieran conectar.
 */
io.on('connection', function(socket){
    console.log('El cliente con IP: ' + socket.handshake.address + "se ha conectado.");

    socket.emit('messages',messages);

    socket.on('add-message', function(data){
        messages.push(data);

        io.sockets.emit('messages', messages);
    });
});

/* Creamos un servidor con Express*/
server.listen(6677, function(){
    console.log('Servidor esta funcionando en http://localhost:6677');
});
