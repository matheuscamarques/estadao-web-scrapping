import SearchCacheSingleton from "../singleton/SearchCache";
class NoticiasRepository{
    static async getAll(){
        return fetch('http://localhost:5000/noticias').then(response => response.json());
    }

    static async getByQuery(query){
        return fetch(`http://localhost:5000/noticias/${query}`).then(response => response.json());
    }

}
export default class NoticiasService{
    static async getAll(){
        return NoticiasRepository.getAll();
    }

    static async search(query){
        if(query.length < 3){
            return []
        }
        query = new URLSearchParams(query.toLowerCase());

        if(SearchCacheSingleton.getInstance().get(query.toString())){
            return []; // Significa que já buscou e não precisa buscar novamente
        }

        SearchCacheSingleton.getInstance().set(query.toString(), await NoticiasRepository.getByQuery(query));

        setTimeout(() => {},6000);
        return SearchCacheSingleton.getInstance().get(query.toString());
    }
}