'use strict';  
require('ezito-utils/server/dotenv')();
const babelTypes = require('@babel/types'); 
const babelTemplate = require('@babel/template');
const { createArrayTemplate } = require('ezito-babel/utils/function-name-creator'); 
const importDeclaration = require('./core/plugins/importDeclaration'); 
const callFunctionExpresion = require('./core/plugins/callFunction');
const exportDeclaration = require('./core/plugins/exportDeclaration');
const commonJSExport = require('./core/plugins/commonJSExport');
const ignoreConfig = require('./config/ignore');
const customPluginsConfig = require('./config/custom-plugins');
const customPresetsConfig = require('./config/custom-presets');
const exportsConfig =require('./config/export');  
const importConfig =require('./config/import'); 
const callFunctionConfig =require('./config/call-function'); 
const coreConfig = require('./core/config');
const path = require('path');

if(coreConfig.enable){
    importConfig.default.add(function Default(modulePath , cardsList ,fns){
        fns.addFunction(coreConfig._interopRequireDefault);
        var names = []; 
        for (const iterator of cardsList) {
            names.push(iterator.template);
        }
        this.replaceWith(babelTemplate.default('const { NAMES } = ' + createArrayTemplate(['_interopRequireDefault','require'], 'MODULE_PATH'))({
            NAMES : names .join(' , ') ,
            MODULE_PATH : babelTypes.stringLiteral(modulePath) ,
        }));
        this.skip();
    });
    importConfig.withCards.add(function withCards(modulePath , cardsList ,fns){
        fns.addFunction(coreConfig._getRequireWildcardCache);
        fns.addFunction(coreConfig._interopRequireWildcard);
        var names = []; 
        for (const iterator of cardsList) {
            names.push(iterator.template);
        }
        this.replaceWith(babelTemplate.default('const { NAMES } = ' + createArrayTemplate(['_interopRequireWildcard','require'], 'MODULE_PATH'))({
            NAMES : names .join(' , ') ,
            MODULE_PATH : babelTypes.stringLiteral(modulePath) ,
        }));
        this.skip();
    });
    importConfig.import.add(function Import(modulePath){ 
        this.replaceWith(babelTemplate.default('require(MODULE_PATH);')({
            MODULE_PATH : babelTypes.stringLiteral(modulePath)
        }));
        this.skip();
    });


    exportsConfig.default.add(function Default( value ,fns){ 
        this.replaceWith(babelTemplate.default('module.exports.default = VALUE;')({
            VALUE : value
        }));
        this.skip();
    });
    exportsConfig.export.add(function Export(f ,fns){  
        this.replaceWith(
            babelTemplate.default('module.exports.NAME = NAME;')({
                NAME : f
            })
        )
    });
    exportsConfig.variable.add(function Variable(kind , name , nodeValue,fns){ 
        this.insertBefore(babelTemplate.default(`${kind} ${name} = VALUE;`)({
            VALUE : nodeValue
        }));
        this.replaceWith(babelTemplate.default(`Object.defineProperty(exports, 'NAME' ,{
            writable : false ,
            value : VALUE
        })`)({
            NAME : name ,
            VALUE : name
        })); 
    });
    exportsConfig.withCards.add(function withCards(cardsList ,fns){
        for (const iterator of cardsList) { 
            this.insertBefore(babelTemplate.default('module.exports.NAME = WITH')({
                NAME : iterator.name ,
                WITH : iterator.withAs ? iterator.withAs +'.'+iterator.name : iterator.name
            }));
        }
        this.remove();
    });
    exportsConfig.withFrom.add(function withFrom(importPath,cardsList , fns){
        var name = 'e' + fns.makeId(8);
        fns.addVariable('var' , name , `require('${importPath}')`);
        for (const iterator of cardsList) {
            this.insertBefore(babelTemplate.default('module.exports.NAME = WITH')({
                NAME : iterator.name ,
                WITH : iterator.withAs ? name  +'.' + iterator.withAs : name + '.' + iterator.name
            }));
        }
        this.remove()
    });

    callFunctionConfig.import.add(function importCall(importPath, args , fns){
        fns.addFunction(coreConfig._getRequireWildcardCache);
        fns.addFunction(coreConfig._interopRequireWildcard);
        this.replaceWith(babelTemplate.default('Promise.resolve().then(() => _interopRequireWildcard(require(MODULE_PATH)))')({
            MODULE_PATH : babelTypes.stringLiteral(importPath)
        }));
        this.skip();
    });
    callFunctionConfig.require.add(function importCall(importPath, args , fns){
        fns.addFunction(coreConfig._getRequireWildcardCache);
        fns.addFunction(coreConfig._interopRequireWildcard);
        this.replaceWith(babelTemplate.default('_getRequireWildcardCache(require(MODULE_PATH)))')({
            MODULE_PATH : babelTypes.stringLiteral(importPath)
        }));
        this.skip();
    });
}
 
 
function initialConfig(option = {}){
    const optionFileName = option.fileName ;
    customPluginsConfig.add(["@babel/plugin-syntax-jsx" , {}]);
    customPluginsConfig.add(['ezito-babel/plugins/all', {
        prepareCallFunction : callFunctionExpresion().prepareCallFunction ,
        prepareImportDeclaration : importDeclaration().prepareImportDeclaration,
        prepareExportDeclaration : exportDeclaration().prepareExportDeclaration,
        prepareCommonJSExport : commonJSExport().prepareCommonJSExport,
        fileName : optionFileName,
    }]); 
    customPluginsConfig.add(["ezito-babel/plugins/insert-function",{ prepareInsertFunction(){ 
        return [function hey( name ){ return {}} ]
    }, fileName : optionFileName}],);
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
        const ctx = initialConfig({ fileName : path.resolve('./i.js')})
        require('regenerator-runtime');
        require('@babel/register')({
            extensions: [".es6", ".es", ".jsx", ".js", ".mjs"] , 
            ignore :  [...ctx.ignore] ,
            presets : [...ctx.presets] ,
            plugins : [...ctx.plugins] ,
            cache : false ,
        });    
    } 
}  
module.exports.__esModule = true ;
module.exports.runDev = runDev; 