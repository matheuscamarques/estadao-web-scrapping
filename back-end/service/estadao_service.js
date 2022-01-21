import EstadaoExtrator from "../repository/estadao_extrator.js";

export default class EstadaoService{
    static async extrairNoticias(limite = 10){
        return await EstadaoExtrator.extrairNoticias(limite);
    }
}

