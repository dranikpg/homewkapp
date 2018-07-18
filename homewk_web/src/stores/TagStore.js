
let data =  ["Homework","Info"]

class Tag {


    indexof(i){
        return data.indexOf(i);
    }

    getfor(i){
        if(i == -1)return undefined;
        if(i > data.length) return undefined;
        else return data[i];
    }

    getAll(){
      return data;
    }

}

export default new Tag();
