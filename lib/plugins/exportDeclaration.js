'use strict';
const exportConfig = require('./../config/export');
function init(){
    return {
        prepareExportDeclaration(nodePath , fileName , fns){
            fileName = fileName || optionFileName;
            //fns.addVariable('const' , '__esModule', `Object.defineProperty(exports, "__esModule", { value: true });`);
            return {
                Default(){  
                    //fns.addVariable('const' , '______ezitoPageConfig',"require('ezito/core/utils/fn/setPageConfig');",{insert :"unshiftContainer"});
                    //fns.addSource(`module.exports.default = ______ezitoPageConfig(module.exports).default;` , { push : true });
                }
            }
        },
    }
}

module.exports = init;
