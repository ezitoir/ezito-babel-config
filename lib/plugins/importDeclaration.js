'use strict';
const requireDefault = require('./../fn-strings/requireDefault');
const importConfig = require('./../../config/import');
const ezitoTypes = require('ezito-utils/public/validators/types');
function init(){
    return {
        prepareImportDeclaration(nodePath,importPath,fileName,fns){ 
            return {
                ImportDefault(path){ 
                    var imConfig = {};
                    var result = {functionName:'',newModulePath:importPath};
                    while(imConfig = importConfig.importDefault.configCBList.next()){  
                        if(!(result=imConfig.call(nodePath,nodePath,importPath,fileName,fns))) return ;
                    }
                    importConfig.patternList.getList(fileName).forEach(function addCustomImportConfig(cg){
                        var localConfig = {};
                        while (localConfig = cg.importDefault.configCBList.next()) {  
                            if(!(result=localConfig.call(nodePath,nodePath,importPath,fileName,fns))) return ;
                        }
                    });
                    requireDefault.defaultImport.fnList.forEach(function addRequire(fnString){
                        fns.addFunction(fnString.body ,{ insert : 'unshiftContainer' }) 
                    });
                    result = result ?? {};
                    return {
                        newModulePath : result.newModulePath || importPath ,
                        functionName  : [ result.functionName,...requireDefault.defaultImport.fnNames ]
                    } 
                },
                ImportWithCards(path){  
                    var imConfig = {};
                    var result = {functionName:'',newModulePath:importPath};
                    // config for all import file
                    while(imConfig = importConfig.importWithCards.configCBList.next()){
                        if(!(result=imConfig.call(nodePath,nodePath,importPath,fileName,fns))) return ;
                    }
                    importConfig.patternList.getList(fileName).forEach(function addCustomImportConfig(cg){
                        var localConfig = {};
                        while (localConfig = cg.importWithCards.configCBList.next()) { 
                            if(!(result=localConfig.call(nodePath,nodePath,importPath,fileName,fns))) return ;
                        }
                    });
                    requireDefault.withCardsImport.fnList.forEach(function addRequire(fnString){
                        fns.addFunction(fnString.body ,{ insert : 'unshiftContainer' }) 
                    });
                    return {
                        newModulePath : result.newModulePath || importPath ,
                        functionName  : [result.functionName,...requireDefault.defaultImport.fnNames]
                    }
                },
                Import(path){
                    var imConfig = {};
                    var result = {functionName:'',newModulePath:importPath};
                    while(imConfig = importConfig.import.configCBList.next()){
                        if(!(result=imConfig.call(nodePath,nodePath,importPath,fileName,fns))) return ;
                    }
                    importConfig.patternList.getList(fileName).forEach(function addCustomImportConfig(cg){
                        var localConfig = {};
                        while (localConfig = cg.import.configCBList.next()) { 
                            if(!(result=localConfig.call(nodePath,nodePath,importPath,fileName,fns))) return ;
                        }
                    });
                    requireDefault.import.fnList.forEach(function addRequire(fnString){
                        fns.addVariable('const' , fnString.name, fnString.body ,{ insert : 'unshiftContainer' });
                    }); 
                    return {
                        newModulePath : result.newModulePath || importPath ,
                        functionName  : [result.functionName,...requireDefault.defaultImport.fnNames]
                    }
                },
            }
        },
    }
}
module.exports = init;