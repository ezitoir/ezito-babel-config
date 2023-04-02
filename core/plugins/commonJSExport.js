'use strict';
const coreConfig = require('./../config');  
const importConfig = require('../../config/import'); 
const babelTypes = require('@babel/types');
function init(){
    return {
        prepareCommonJSExport(nodePath,){
            
            return {
                '*' : ()=>{
                },
                'module.exports.*': (objectList,f,right) => { 
                    if(objectList.indexOf('default') > -1)
                    return {
                        right : babelTypes.callExpression(
                            babelTypes.identifier('hey') ,
                            [right]
                        ),
                        spliter : 0
                    }
                },
                'exports.*' : (objectList , f,right )=>{
                    if(objectList.indexOf('default') > -1)
                    return {
                        right : babelTypes.callExpression(
                            babelTypes.identifier('hey') ,
                            [right]
                        ),
                        spliter : 0
                    }
                },
                'exports' : ()=>{

                }
            }
        },
    }
}
module.exports = init;