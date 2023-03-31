'use strict';
const coreConfig = require('./../config');  
const importConfig = require('../../config/import');
const ezitoTypes = require('ezito-utils/public/validators/types');
const objectToNode = require('ezito-babel/utils/object-to-node'); 

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
                    coreConfig.importFucntions.defaultImport.fnList.forEach(function addRequire(fnString){
                        fns.addFunction(fnString.body ,{ insert : 'unshiftContainer' }) 
                    });
                    result = result ?? {};
                    return {
                        newModulePath : result.newModulePath || importPath ,
                        functionName  : [ result.functionName,...coreConfig.importFucntions.defaultImport.fnNames ]
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
                    coreConfig.importFucntions.withCardsImport.fnList.forEach(function addRequire(fnString){
                        fns.addFunction(fnString.body ,{ insert : 'unshiftContainer' }) 
                    });
                    result = result ?? {}; 
                    return {
                        newModulePath : result.newModulePath || importPath ,
                        functionName  : [result.functionName,...coreConfig.importFucntions.withCardsImport.fnNames ]
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
                    coreConfig.importFucntions.import.fnList.forEach(function addRequire(fnString){
                        fns.addVariable('const' , fnString.name, fnString.body ,{ insert : 'unshiftContainer' });
                    });
                    result = result ?? {};
                    return {
                        newModulePath : result.newModulePath || importPath ,
                        functionName  : [result.functionName,...coreConfig.importFucntions.import.fnNames ]
                    }
                },
            }
        },
    }
}
module.exports = init;