exports.isGoodEmail = function(string){
    // console.log('VERIFY EMAIL START');
    let reqx = /^\w+([.-]\w+)?@(\w+[.-])+\w+$/g;
    let output = string.match(reqx);
        // console.log('MM::',output);
        if(output == null){
            // Problems
            // console.log(`PROBLEM:: "${output}"`);
            if(string.length == 0){
                return {boll:false};
            }else{
                return {boll:false,why:'Bad email adress \nMaybe you did use something hot'};
            }
            
        }
        else{
            // console.log(`GOOD :: "${output}" length:${output.length}`);
            return {boll:true};
        }
};
exports.isNotHaveDigits = function(string){
    let reqx = /\d/g;
    let output = string.match(reqx);
        if(output == null){
            // Zero digits
            // console.log('NO PROBLEMS digits');
            if(string.length == 0){
                return {boll:false};
            }else{
                return {boll:true};
            }
            
        }else{
            // Have digits
            // console.log(`PROBLEM:: "${output}" length:${output.length}`);
            return {boll:false,why:'Bad field \nMaybe you did use numbers? it\'s not allowed '};
        }
};
exports.isNotHaveDangerSymbols = function(string){
    let reqx = /\W/gi;
    let output = string.match(reqx);
        if(output == null){
            // ZERO dangerSymbols
            // console.log('NO PROBLEMS danger');
            if(string.length == 0){
                return {boll:false};
            }else{
                return {boll:true};
            }
            
        }else{
            //  > 0 problems
            // console.log(`PROBLEM:: "${output}" length:${output.length}`);
            return {boll:false,why:'Bad field \nMaybe you did use special characters? it\'s not allowed'};
        }

};
exports.isPass = function(string){
    if(string.length >= 8){
        return {boll:true};
    }else{
        return {boll:false,why:'Bad field \n password must be longer that 7 characters'};
    }
}