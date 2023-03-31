'use strict';
const exportConfig = require('../../config/export');
function init(option = {}){

    return {
        prepareExportDeclaration(nodePath , fileName , fns){
            fileName = fileName || option.optionFileName; 
            return {
                Default(){  
                    
                }
            }
        },
    }
}

module.exports = init;
