export default class NoticiasService{
    static async getAll(){
        return fetch('http://localhost:30001/').then(response => response.json());
    }
}