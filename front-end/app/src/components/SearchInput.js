import React from "react";
import NoticiasService from "../services/NoticiasService";

export default class SearchInput extends React.Component {
    render() {
        return (<div>
            <div>
                <p class="info-text">Para buscar mais dados clique em buscar.</p>
            </div>
            <div>
                <input onInput={this.input.bind(this)} className='search-input' type="text" placeholder="Search" />
                <button onClick={this.click.bind(this)} className='search-button'>Buscar</button>
            </div>
        </div>)
    }

    click(e) {
        let value = e.target.parentElement.querySelector("input").value;
        this.filtro(value);
        this.props.callbackSearch(NoticiasService.search(value));
    }

    input(e) {
        let value = e.target.value;
        this.filtro(value);
    }
    filtro(value) {
        let childs = document.getElementsByClassName(this.props.classSearch);
        for (let i = 0; i < childs.length; i++) {
            let child = childs[i];
            if (child.innerText.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                child.classList.remove('hide');
            } else {
                child.classList.add('hide');
            }
        }
    }
}