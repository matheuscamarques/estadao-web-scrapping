import got from 'got';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import Filtro from '../utils/filtro.js';

export default class EstadaoExtrator {
    static async extrairSearchNoticias(pattern, limite = 10) {
        const estadao = new EstadaoExtrator();
        const links = await estadao._extrairLinks(`https://busca.estadao.com.br/?q=${pattern}`, limite);
        let noticias = [];
        for (let link of links) {
            try{
                let noticia = await estadao._extrairNoticia(link);
                noticias.push(noticia);
            }
            catch(e){
                fs.writeFileSync('erro.txt', link);
            }
            
        }
        return noticias;
    }

    static async extrairNoticias(limite = 10) {
        const estadao = new EstadaoExtrator();
        const links = await estadao._extrairLinks('https://www.estadao.com.br/ultimas', limite);
        let noticias = [];
        for (let link of links) {
            try {
                const noticia = await estadao._extrairNoticia(link);
                noticias.push(noticia);
            } catch (e) {
                fs.writeFileSync('erro.txt', link);
            }

        }
        return noticias;
    }

    async _extrairLinks(link, limite = 10) {
        const response = await got(link);
        if (response.statusCode !== 200) {
             new Error('Não foi possível obter a página');
        }
        //fs.writeFileSync('index.html', response.body);
        const dom = new JSDOM(response.body);
        const news = [...dom.window.document.querySelectorAll('section.col-md-6.col-sm-6.col-xs-12.col-margin')].slice(0, limite);

        const newsList = news.map(news => {
            const link = news.querySelector('a').href;
            return link
        });

        return newsList;
    }

    async _extrairNoticia(link) {
        const response = await got(link);
        if (response.statusCode !== 200) {
             new Error('Não foi possível obter a página');
        }
        //fs.writeFileSync('index.html', response.body);
        const dom = new JSDOM(response.body);
        var tempTitulo = Filtro.Titulo(dom);
        var tempTexto = Filtro.Texto(dom);
        var tempData = Filtro.Data(dom);
        const titulo = tempTitulo ? tempTitulo.textContent : "Sem título dísponivel";
        const texto = tempTexto ? tempTexto.textContent.slice(0, 300) + "..." : "Sem texto dísponivel";
        const data = tempData ? tempData.textContent : "Sem data dísponivel";
        const noticia = {
            titulo,
            texto,
            data,
            link
        }
        return noticia;
    }


}

