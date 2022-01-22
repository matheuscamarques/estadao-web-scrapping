import  EstadaoService  from "../../service/estadao_service.js";
import grpc from "grpc";
const noticiaProto = grpc.load('grpc/noticias/noticia.proto')
var noticias = {};
let UMA_HORA = 1000 * 60 * 60;

const server = new grpc.Server();

async function searchNoticia (pattern)  {
    console.log(pattern);
    if(!noticias[pattern]){
        noticias[pattern] = await EstadaoService.extrairSearchNoticias(pattern,10);
    }
    
    setTimeout(async () => {
        noticias[pattern] = await EstadaoService.extrairSearchNoticias(pattern,10);
    },UMA_HORA);

    return noticias[pattern];
}

server.addService(noticiaProto.NoticiaService.service, {
    list: async (call, callback) => {
        callback(null, await searchNoticia(call.request.search))
    },
})
server.bind('localhost:50052', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://localhost:50052')
server.start()