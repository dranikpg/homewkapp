let data =  ["Regular Homework","Hard homework","Idiot homework","Info"];

class TagStore {

    indexof(i){
        return data.indexOf(i);
    }

    getfor(i){
        if(i===undefined)return undefined;
        if(i == -1)return undefined;
        if(i > data.length) return undefined;
        else return data[i];
    }

    getAll(){
      return data;
    }

}

export default new TagStore();
