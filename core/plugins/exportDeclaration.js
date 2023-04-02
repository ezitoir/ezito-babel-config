'use strict';
const exportConfig = require('../../config/export'); 
function init(option = {}){ 
    return {
        prepareExportDeclaration(nodePath , fileName , fns){
            fileName = fileName || option.optionFileName; 
           
            return {
                Default(f){ 
                    var callaback = {};
                    /// call all setting for export default;
                    while(callaback = exportConfig.default.configCBList.next()){
                        if(typeof callaback === "function"){
                            callaback.call(this , f ,fns)
                        } 
                    }
                    var ff = exportConfig.patternList.getList(fileName);
                    var ff2 = {};
                    while(callaback = ff.next()){
                        while (ff2 = callaback.default.configCBList.next()) {
                            if(typeof ff2 === "function"){
                                ff2.call(nodePath ,f ,fns)  
                            }
                        }
                    }
                },
                Export(f){
                    var callaback = {};
                    /// call all setting for export default;
                    while(callaback = exportConfig.export.configCBList.next()){
                        if(typeof callaback === "function"){
                            callaback.call(nodePath , f ,fns)
                        } 
                    }
                    var ff = exportConfig.patternList.getList(fileName);
                    var ff2 = {};
                    while(callaback = ff.next()){
                        while (ff2 = callaback.export.configCBList.next()) {
                            if(typeof ff2 === "function"){
                                ff2.call(nodePath ,f ,fns)  
                            }
                        }
                    }
                },
                Variable(kind , name , nodeValue){
                    var callaback = {};
                    
                    /// call all setting for export default;
                    while(callaback = exportConfig.variable.configCBList.next()){
                        if(typeof callaback === "function"){
                            callaback.call(nodePath , kind , name , nodeValue ,fns)
                        } 
                    }
                    
                    var ff = exportConfig.patternList.getList(fileName);
                    var ff2 = {};
                    while(callaback = ff.next()){
                        while (ff2 = callaback.variable.configCBList.next()) {
                            if(typeof ff2 === "function"){
                                ff2.call(nodePath ,kind , name , nodeValue ,fns)  
                            }
                        }
                    }

                },
                WithCards(cardsList){
                    var callaback = {};
                    /// call all setting for export default;
                    while(callaback = exportConfig.withCards.configCBList.next()){
                        if(typeof callaback === "function"){
                            callaback.call(this , cardsList ,fns)
                        } 
                    }
                    var ff = exportConfig.patternList.getList(fileName);
                    var ff2 = {};
                    while(callaback = ff.next()){
                        while (ff2 = callaback.withCards.configCBList.next()) {
                            if(typeof ff2 === "function"){
                                ff2.call(nodePath ,cardsList ,fns)  
                            }
                        }
                    }

                },
                WithFrom (importPath , cardsList){

                    var callaback = {};
                    /// call all setting for export default;
                    while(callaback = exportConfig.withFrom.configCBList.next()){
                        if(typeof callaback === "function"){
                            callaback.call(this , importPath , cardsList ,fns)
                        } 
                    }
                    var ff = exportConfig.patternList.getList(fileName);
                    var ff2 = {};
                    while(callaback = ff.next()){
                        while (ff2 = callaback.withFrom.configCBList.next()) {
                            if(typeof ff2 === "function"){
                                ff2.call(nodePath ,importPath , cardsList ,fns)  
                            }
                        }
                    }

                }
            }
        },
    }
}

module.exports = init;
