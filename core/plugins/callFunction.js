'use strict';
const getScopeType = require('ezito-babel/utils/get-scope-type');
const babelTypes = require('@babel/types');
const createCallExpression = require('ezito-babel/utils/create-call-expression');
const callFunctionConfig = require('../../config/call-function');

function init(){
    return {
        prepareCallFunction( nodePath , fileName , fns){
            return {
                Require : (modulePath , args) =>{ 
                    var callaback = {};
                    /// call all setting for export default;
                    while(callaback = callFunctionConfig.require.configCBList.next()){
                        if(typeof callaback === "function"){
                            callaback.call(nodePath , modulePath , args , fns)
                        } 
                    }
                    var ff = callFunctionConfig.patternList.getList(fileName);
                    var ff2 = {};
                    while(callaback = ff.next()){
                        while (ff2 = callFunctionConfig.require.configCBList.next()) {
                            if(typeof ff2 === "function"){
                                ff2.call(nodePath , modulePath , cardsList ,fns)  
                            }
                        }
                    } 
                },
                Import : (modulePath ,args) => {
                    var callaback = {};
                    /// call all setting for export default;
                    while(callaback = callFunctionConfig.import.configCBList.next()){
                        if(typeof callaback === "function"){
                            callaback.call(nodePath ,modulePath, args, fns)
                        } 
                    }
                    var ff = callFunctionConfig.patternList.getList(fileName);
                    var ff2 = {};
                    while(callaback = ff.next()){
                        while (ff2 = callFunctionConfig.import.configCBList.next()) {
                            if(typeof ff2 === "function"){
                                ff2.call(nodePath , modulePath , args ,fns)  
                            }
                        }
                    } 
                },
                useServerSideProps : () => {
                    if(getScopeType(nodePath , { endCheck : 'FunctionDeclaration' })){
                        
                    }
                },
            }
        },
    }
}

module.exports = init;