import React from "react";

export default class NoticiaItem extends React.Component {
    render() {
        return <ul className='noticia-item'>
            <li className="noticia-title">{this.props.noticia.titulo}</li>
            <li className="noticia-texto">{this.props.noticia.texto}</li>
            <li className="noticia-data">{this.props.noticia.data}</li>
            <li>
                <a href={this.props.noticia.link}> Leia Mais </a>
            </li>
        </ul>
    }

}