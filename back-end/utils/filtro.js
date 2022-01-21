

export default class Filtro {
    static Titulo(dom) {
        return [...dom.window.document.querySelectorAll('h1.n--noticia__title')][0] ??
            [...dom.window.document.querySelectorAll('h1.title')][0] ??
            [...dom.window.document.querySelectorAll('h1.post-title')][0] ??
            [...dom.window.document.querySelectorAll('h1')][0];
    }

    static Texto(dom) {
        let tempData;

        if (tempData = [...dom.window.document.querySelectorAll('p.linha-fina')][0])
            return tempData;


        if (tempData = [...dom.window.document.querySelectorAll('div.linha-fina')][0]) {
            if (tempData.querySelector('p')) {
                return tempData.querySelector('p');
            }
        }

        if (tempData = [...dom.window.document.querySelectorAll('h2.n--noticia__subtitle')][0]) {
            return tempData;
        }

        if (tempData = [...dom.window.document.querySelectorAll('div.n--noticia__content')][0])
            return tempData;


        if (tempData = [...dom.window.document.querySelectorAll('div.n--noticia__content')][0]) {
            return tempData;
        }


        if (tempData = [...dom.window.document.querySelectorAll('div.content')][0]) {
            return tempData;
        }

        return [...dom.window.document.querySelectorAll('h2')][0];
    }

    static Data(dom) {
        var tempData ;
        if (tempData = [...dom.window.document.querySelectorAll('div.n--noticia__state')][0]) {
            if (tempData.getElementsByTagName('p')[1]) {
                return tempData.getElementsByTagName('p')[1];
            }
        }

        if(tempData = [...dom.window.document.querySelectorAll('div.n--noticia__state-desc')][0]) {
            if (tempData.querySelector('p')) {
                return tempData.querySelector('p');
            }
        }

        if(tempData = [...dom.window.document.querySelectorAll('span.post-date')][0]) {
            return tempData;
        }
    }
}

