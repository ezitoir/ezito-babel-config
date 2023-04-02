'use strict';
const coreConfig = require('./../config');  
const importConfig = require('../../config/import'); 

function init(){
    return {
        prepareImportDeclaration(nodePath , importPath,fileName,fns){ 
            fns.addFunction(function hey( name ){ return {}} ,{insert : 'unshiftContainer'})
            return {
                Default( modulePath , cardsList){
                    var callaback = {};
                    /// call all setting for export default;
                    while(callaback = importConfig.default.configCBList.next()){
                        if(typeof callaback === "function"){
                            callaback.call(nodePath , modulePath || importPath, cardsList, fns)
                        } 
                    }
                    var ff = importConfig.patternList.getList(fileName);
                    var ff2 = {};
                    while(callaback = ff.next()){
                        while (ff2 = importConfig.default.configCBList.next()) {
                            if(typeof ff2 === "function"){
                                ff2.call(nodePath , modulePath || importPath, cardsList ,fns)  
                            }
                        }
                    } 
                },  
                WithCards( modulePath , cardsList){
                    var callaback = {};
                    /// call all setting for export default;
                    while(callaback = importConfig.withCards.configCBList.next()){
                        if(typeof callaback === "function"){
                            callaback.call(nodePath , modulePath , cardsList , fns)
                        } 
                    }
                    var ff = importConfig.patternList.getList(fileName);
                    var ff2 = {};
                    while(callaback = ff.next()){
                        while (ff2 = importConfig.withCards.configCBList.next()) {
                            if(typeof ff2 === "function"){
                                ff2.call(nodePath , modulePath , cardsList ,fns)  
                            }
                        }
                    } 
                },  
                Import(modulePath){
                    var callaback = {};
                    /// call all setting for export default;
                    while(callaback = importConfig.import.configCBList.next()){
                        if(typeof callaback === "function"){
                            callaback.call(nodePath , modulePath)
                        } 
                    }
                    var ff = importConfig.patternList.getList(fileName);
                    var ff2 = {};
                    while(callaback = ff.next()){
                        while (ff2 = importConfig.import.configCBList.next()) {
                            if(typeof ff2 === "function"){
                                ff2.call(nodePath , modulePath)  
                            }
                        }
                    } 
                },
            }
        },
    }
}
module.exports = init;