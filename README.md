

```javascript
const ezitoBabelConfig = requrie('ezito-babel-config');
const ignoreConfig = require('ezito-babel-config/config/ignore');
const customPluginsConfig = require('ezito-babel-config/config/custom-plugins');
const customPresetsConfig = require('./config/custom-presets');
const exportsConfig =require('ezito-babel-config/config/export');  
const importConfig =require('ezito-babel-config/config/import'); 
const callFunctionConfig =require('./config/call-function'); 
const coreConfig = require('ezito-babel-config/core/config');
// example 1
// auto default parse babel
ezitoBabelConfig.runDev();
/*
   import isfunction from 'ezito-utils/public/is/function';

   // out put
   function _interopRequireDefault(obj) {
       return obj && obj.__esModule ? obj : {
          default: obj
       };
    }
   const {default : isfunction} = _interopRequireDefault(require("ezito-utils/public/is/function"));
*/

// for all file Path
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
        fns.addFunction(coreConfig._interopRequireDefault);
        this.replaceWith(babelTemplate.default('_getRequireWildcardCache(require(MODULE_PATH)))')({
            MODULE_PATH : babelTypes.stringLiteral(importPath)
        }));
        this.skip();
    });
