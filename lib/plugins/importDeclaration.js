'use strict';
const requireDefault = require('./../fn-strings/requireDefault');
const importConfig = require('./../config/import');

function init(){
    return {
        prepareImportDeclaration(nodePath,importPath,fileName,fns){ 
            return {
                ImportDefault(path){ 
                    var imConfig = undefined;
                    while(imConfig = importConfig.importDefault.configCBList.next()){
                        if(!imConfig(nodePath,importPath,fileName,fns)) return ;
                    }
                    requireDefault.defaultImport.fnList.forEach(function addRequire(fnString){
                        fns.addVariable('const' , fnString.name, fnString.body ,{ insert : 'unshiftContainer' });
                    });
                    return {
                        newModulePath : importPath ,
                        functionName  : requireDefault.defaultImport.fnNames
                    } 
                },
                ImportWithCards(path){  
                    var imConfig = undefined;
                    while(imConfig = importConfig.importWithCards.configCBList.next()){
                        if(!imConfig(nodePath,importPath,fileName,fns)) return ;
                    }
                    requireDefault.withCardsImport.fnList.forEach(function addRequire(fnString){
                        fns.addVariable('const' , fnString.name, fnString.body ,{ insert : 'unshiftContainer'});
                    });
                    return {
                        newModulePath : importPath ,
                        functionName  : requireDefault.withCardsImport.fnNames
                    }
                },
                Import(path){
                    requireDefault.import.fnList.forEach(function addRequire(fnString){
                        fns.addVariable('const' , fnString.name, fnString.body ,{ insert : 'unshiftContainer' });
                    });
                    var imConfig = undefined;
                    while(imConfig = importConfig.import.configCBList.next()){
                        if(!imConfig(nodePath,importPath,fileName,fns)) return ;
                    }
                    return {
                        newModulePath : importPath ,
                        functionName : requireDefault.import.fnNames
                    }
                },
            }
        },
    }
}
module.exports = init;