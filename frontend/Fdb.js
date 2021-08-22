exports.Read = function(key){
    let l = localStorage.getItem(key);
    return JSON.parse(l);
}
exports.SimpleRead = function(key){
    return localStorage.getItem(key);
}
exports.Save = function(key,data){
    let l = localStorage;
    data = JSON.stringify(data);
    l.setItem(key,data);
}
exports.SimpleSave = function(key,data){
    localStorage.setItem(key,data);
}
exports.Delete = function(key){
    let l = localStorage;
    l.removeItem(key); 
}
exports.Clear = function(){
    localStorage.clear();
}
exports.ReadArr = function(key){
    let l = localStorage;
    let query = l.getItem(key);
        query = query == null? 0 : query == ''? 0 : query.split(',').length;
    return query;
}
exports.tryGetTokenAsJSON = function(string){
    try {
      
        string = JSON.parse(string);
      // console.log('OK::',str);
        return JSON.stringify(string);
    } catch (error) {
      // console.log('err::',error);
        return JSON.stringify(string)
    }
}