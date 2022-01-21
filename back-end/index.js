import grpc from "grpc";
import express from "express";

const PROTO_NOTICIA_PATH = 'grpc/noticias/noticia.proto'
const NoticiaService = grpc.load(PROTO_NOTICIA_PATH).NoticiaService
const noticiaService = new NoticiaService('localhost:50051', grpc.credentials.createInsecure())



const app =  express();

app.get('/', async (req, res) => {
    let promisse = new Promise((resolve, reject) => {
        noticiaService.list({}, (err, response) => {
            if (!err) {
                resolve(response.noticia)
            } else {
                reject(err)
            }
        })
    });

    let noticias = await promisse;
    res.send(noticias);
});



app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});