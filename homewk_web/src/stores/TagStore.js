
let data =  ["Regular Homework","Hard homework","Idiot homework","Info"];

class Tag {

    indexof(i){
        return data.indexOf(i);
    }

    getfor(i){
        if(i == -1)return data[0];
        if(i > data.length) return data[0];
        else return data[i];
    }

    getAll(){
      return data;
    }

}

export default new Tag();
