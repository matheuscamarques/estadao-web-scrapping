

 class SearchCache {

    constructor() {
        this.cache = {};
    }

    get(query) {
        return this.cache[query];
    }

    set(query, value) {
        this.cache[query] = value;
    }

    delete(query) {
        delete this.cache[query];
    }
}


export default class SearchCacheSingleton{
    static getInstance(){
        if(!SearchCacheSingleton.instance){
            SearchCacheSingleton.instance = new SearchCache();
        }
        return SearchCacheSingleton.instance;
    }
}