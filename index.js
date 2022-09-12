const once = require('node:events');
const express = require('express');
const cors = require('cors');
const consign = require('consign')

const db_conection = require('./bd_conection/db_conection')

async function handler(request, response) {

    try {
        const data = JSON.parse(await once.once(request, 'data'))
        console.log('\nErro detetado', data)
        response.writeHead(200)
        response.end(JSON.stringify(data))
    } catch (error) {
        console.error('ERRO NO BACK-END', error.stack)
        response.writeHead(500)
        response.end()
    }


}

//capturar erros não tratados
process.on('uncaughtException', (error, origin) => {
    console.log(`\n${origin} erro detetado.\n${error}`)
})
process.on('unhandledRejection', (error) => {

    console.log(`\nErro na requisição`)

})

const app = express(handler)
//const server = express(handler);
app.use(cors())
app.use(express.json());
consign().include('routes').into(app);
const server = require('http').createServer(app)

process.on('SIGTERM', () => {
    console.log('servidor encerrando ', new Date().toISOString())
    server.listen(4000).close(() => {
        console.log(`Servidor encerrando - ${new Date().toISOString()}`)
        process.exit()
    })
})

var io = require('socket.io')(app,{cors:{origin:"*"}});

io.on('connection',(socket)=>
{
    console.log(`usuário conectado id : ${socket.id}`)
   
    socket.on('send-message',(e)=>
    {
        socket.broadcast.emit('get-message',`${e}`)
    })
    socket.on('disconnect',()=>
    {
      console.log(`disconectado disconectado ${socket.id}:` )
      
    })
    socket.on('update-friend-list',(e)=>
    {
        socket.broadcast.emit('friend-list-update',`${e}`)
    })
    socket.on('update-friendRequestList-server',(e)=>
    {
        socket.broadcast.emit('update-friendRequestList-front')
    })
    socket.on('send-notification',(e)=>
    {
        socket.broadcast.emit('recive-notification',(e))
    })
})



const port = process.env.PORT ||  4000;

server.listen(port).once('listening', () => {
    console.log(`Servidor iniciando no processo: ${process.pid}`)

})



//const io = require('socket.io')({ cors: { origin: "*" } });
