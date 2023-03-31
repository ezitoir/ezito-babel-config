'use strict'; 
require('ezito-utils/server/dotenv')();
const babelTypes = require('@babel/types');
const getHomeDir = require('ezito-utils/server/fs/home-dir');
const getRootDir = require('ezito-utils/server/fs/get-root'); 
const ezitoTypes = require('ezito-utils/public/validators/types'); 
const importDeclaration = require('./core/plugins/importDeclaration');
const callFunction = require('./core/plugins/callFunction');
const exportDeclaration = require('./core/plugins/exportDeclaration');
const ignoreConfig = require('./config/ignore');
const customPluginsConfig = require('./config/custom-plugins');
const customPresetsConfig = require('./config/custom-presets');
const exportsConfig =require('./config/export'); 
const resolve = require('ezito-utils/server/fs/resolve');
const importConfig =require('./config/import'); 
const coreConfig = require('./core/config');

importConfig.import.add(function(){
    return {
        functionName  : '_ddd'
    }
});
function initialConfig(option = {}){
    const optionFileName = option.fileName ;
    customPluginsConfig.add(["@babel/plugin-syntax-jsx" , {}]);
    customPluginsConfig.add(['ezito-babel/plugins/call-import-export', {
        prepareCallFunction : callFunction().prepareCallFunction ,
        prepareImportDeclaration : importDeclaration().prepareImportDeclaration,
        prepareExportDeclaration : exportDeclaration().prepareExportDeclaration,
        fileName : optionFileName,
    }]);
    customPluginsConfig.add(["ezito-babel/plugins/commonjs-export",{
        prepareCommonJSExport(nodePath,fileName,{ addSource , addVariable }){
            return {
                '*' : ()=>{
                },
                'module.exports.*': (ddd ,f,ri) => { 
                    return {
                        right : babelTypes.callExpression(
                            babelTypes.identifier('hey') ,
                            [ri] 
                        ),
                        value : 'exports.d',
                        spliter : 3
                    }
                },
                'exports.*' : ()=>{
                },
                'exports' : ()=>{
                    
                }
            }
        }
    }]);
    customPluginsConfig.add(["ezito-babel/plugins/insert-function",{ prepareInsertFunction(){ 
        return []
    }, fileName : '1'}],);
    customPluginsConfig.add(["ezito-babel/plugins/auto-import" ,{
        prepareAutoImport(nodePath , fileName){
            fileName = fileName || optionFileName;
        },
        fileName : optionFileName
    }]);
    customPluginsConfig.add(["ezito-babel/plugins/add-source" , {
        prepareAddSource(nodePath , fileName){
            fileName = fileName || optionFileName ;
        },
    }]);
    customPresetsConfig.add(['@babel/preset-env', { targets: { node: 'current' }}]);
    customPresetsConfig.add(['@babel/preset-react', { targets: { node: 'current' }}]);


    return {
        ignore : [/(node_module)/ , function(filePath){
            console.log('dasd')
            var icNext = null;
            while (icNext = ignoreConfig.configCBList.next()) {
                if(icNext(filePath)){
                   return true; 
                }
            }
            return false;
        }] ,
        presets : [ 
            ...customPresetsConfig.getList()
        ] ,
        plugins : [  
            ...customPluginsConfig.getList()
        ],
    }
}

function runDev(){
    if(process.env.NODE_ENV !== 'production' ){ 
        process.env.BABEL_DISABLE_CACHE = 0;
        const ctx = initialConfig()
        require('regenerator-runtime');
        require('@babel/register')({
            extensions: [".es6", ".es", ".jsx", ".js", ".mjs"] , 
            ignore :  [...ctx.ignore] ,
            presets : [...ctx.presets] ,
            plugins : [...ctx.plugins] ,
            cache : false ,
        }); 
        const fs = require('fs');
        var babel = require('@babel/core');
        console.log(babel.transformSync(fs.readFileSync('./i.js' ,'utf-8'),{ 
            presets : [...ctx.presets] ,
            plugins : [...ctx.plugins] , 
        }).code);
    } 
}
runDev();
require('./i');
require('./pages')
module.exports.__esModule = true ;
module.exports.runDev = runDev;