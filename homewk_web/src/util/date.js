export function formatd(date){
    if(date < 10)return "0" + date;
    else return ""+date;
}

export function ffd(date){
    return parseInt(""+date.getFullYear()+""+formatd(date.getMonth()+1)+formatd(date.getDate()));
}

export function parsed(datei){
    let dates = ""+datei;
    let ys = dates.substr(0,4);
    let ms = dates.substr(4,2);
    let ds = dates.substr(6,2);
    return new Date(
      parseInt(ys),
      parseInt(ms)-1,
      parseInt(ds)
    )
}

export function fetchdd(date){
   if(date == undefined) return 0;
   let d = date.getDay();
   return d-1;
}
