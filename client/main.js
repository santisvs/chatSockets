/* Funcion de conexion del cliente al servidor socket.
 * Los parametros de conexion son:
 *      ip publica(ipconfig) del servidor
 *      forceNew para forzar la conexion
 */
var socket = io.connect('http://104.168.1.107:6677',{'forceNew':true})

/* Recuperamos el mensaje enviado desde el servidor */
socket.on('messages', function(data){
    console.log(data);
    render(data);
});

/* Creamos una función para enviar la información recibida
 * del socket al html del cliente.
 */
function render(data){
    /* Funcion map que me permite recorrer el objeto array
     * recibido. Cada elemento del array lo guarda en la
     * variable message y el indice del array se guarda en
     * la variable index */
    var html = data.map(function(message, index){
        return (`
            <div class="message">
                <strong>${message.nickname}</strong> dice:
                <p>${message.text}</p>
            </div>
        `);
    }).join(' ');

    var div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
};

function addMessage(e){
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    document.getElementById('nickname').style.display = 'none';
    socket.emit('add-message', message);

    return false;
};
