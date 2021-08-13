exports.Read = function(key){
    let l = localStorage.getItem(key);
    return JSON.parse(l);
}
exports.Save = function(key,data){
    let l = localStorage;
    data = JSON.stringify(data);
    l.setItem(key,data);
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