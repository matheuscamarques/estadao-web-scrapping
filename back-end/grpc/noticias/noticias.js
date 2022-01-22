import  EstadaoService  from "../../service/estadao_service.js";
import grpc from "grpc";
const noticiaProto = grpc.load('grpc/noticias/noticia.proto')
var noticias = [];
let UMA_HORA = 1000 * 60 * 60;
(async () => {
    noticias = await EstadaoService.extrairNoticias(10);
    setInterval(async () => {
        noticias = await EstadaoService.extrairNoticias(10);
    },UMA_HORA);  
})();

const server = new grpc.Server();

server.addService(noticiaProto.NoticiaService.service, {
    list: (_, callback) => {
        callback(null, noticias)
    },
})
server.bind('localhost:50051', grpc.ServerCredentials.createInsecure())
console.log('Server running at http://localhost:50051')
server.start()