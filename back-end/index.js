import grpc from "grpc";
import express from "express";
import cors from "cors";
const PROTO_NOTICIA_PATH = 'grpc/noticias/noticia.proto'
const NoticiaService = grpc.load(PROTO_NOTICIA_PATH).NoticiaService
const noticiaService = new NoticiaService('localhost:50051', grpc.credentials.createInsecure())
const noticiaSearchService = new NoticiaService('localhost:50052', grpc.credentials.createInsecure())


const app =  express();

// set CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET');
    app.use(cors());
    next();
});

app.get('/noticias', async (req, res) => {
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


app.get('/noticias/:search', async (req, res) => {
    const search = req.params.search;
    console.log(search);
    let promisse = new Promise((resolve, reject) => {
        noticiaSearchService.list({search:search}, (err, response) => {
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



app.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
});