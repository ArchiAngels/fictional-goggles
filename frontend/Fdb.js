exports.Read = function(key){
    let l = localStorage;
    return l.getItem(key);
}
exports.Save = function(key,data){
    let l = localStorage;
    l.setItem(key,data);
}
exports.Delete = function(key){
    let l = localStorage;
    l.removeItem(key); 
}