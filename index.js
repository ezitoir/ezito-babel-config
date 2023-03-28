'use strict'; 
require('ezito-utils/server/dotenv')();
const getHomeDir = require('ezito-utils/server/fs/home-dir');
const getRootDir = require('ezito-utils/server/fs/get-root'); 
const importDeclaration = require('./lib/plugins/importDeclaration');
const callFunction = require('./lib/plugins/callFunction');
const exportDeclaration = require('./lib/plugins/exportDeclaration');
const ignoreConfig = require('./lib/config/ignore');
 
function initialConfig(option = {}){
    const optionFileName = option.fileName ;
    
    return {
        ignore : [/(node_module)/ , function(filePath){
            var icNext = null;
            while (icNext = ignoreConfig.configCBList.next()) {
                if(icNext(filePath)){
                   return true; 
                }
            }
            return false;
        }] ,
        presets : [
            ['@babel/preset-env', { targets: { node: 'current' }}] ,
            ['@babel/preset-react', { targets: { node: 'current' }}]
        ] ,
        plugins : [
            ['ezito-babel/plugins/call-import-export', {
                prepareCallFunction : callFunction().prepareCallFunction ,
                prepareImportDeclaration : importDeclaration().prepareImportDeclaration,
                prepareExportDeclaration : exportDeclaration().prepareExportDeclaration,
                fileName : optionFileName,
            }],
            //["ezito/core/utils/babel/plugins/shift-exports-to-up" , { }],
            ["ezito-babel/plugins/commonjs-export",{
                prepareCommonJSExport(nodePath,fileName,{ addSource , addVariable }){
                    return {
                        '*' : ()=>{
                        },
                        'module.exports.*':()=>{  
                        },
                        'exports.*' : ()=>{
                        }
                    }
                }
            }],
            ["ezito-babel/plugins/insert-function" , { }],
            ["ezito-babel/plugins/auto-import" ,{
                prepareAutoImport(nodePath , fileName){
                    fileName = fileName || optionFileName;
                    
                }
            }],
            ["ezito-babel/plugins/add-source" , {
                prepareAddSource(nodePath , fileName){
                    fileName = fileName || optionFileName ;
                },
            }] , 
            ["@babel/plugin-syntax-jsx" , {}] ,
        ] ,
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
        }).code) 
    } 
}
runDev();

