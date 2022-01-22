import EstadaoExtrator from "../repository/estadao_extrator.js";

export default class EstadaoService{
    static async extrairNoticias(limite = 10){
        return await EstadaoExtrator.extrairNoticias(limite);
    }

    static async extrairSearchNoticias(pattern,limite = 10){
        return await EstadaoExtrator.extrairSearchNoticias(pattern,limite);
    }
}

