#RQ
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.onreadystatechange = this._handlersp.bind(this, xhr);
xhr.open("GET", B.BASE_URL+"/pend", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send();
# RQ CATCH
if (xhr.readyState === 4 && xhr.status === 200) {
  console.log(xhr.responseText)
  try{
    var json = JSON.parse(xhr.responseText);
    console.log(json);
    if(json.id != undefined){
        user.id = json.id;
      }
    }catch(error){
      console.log(error)
    }
    console.log("UM -> req end");
    this.emit(CHANGE);
  }
