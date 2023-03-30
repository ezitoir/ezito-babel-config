

```javascript
const ezitoBabelConfig = requrie('ezito-babel-config');

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
const importConfig = require('ezito-babel-config/config/import');
importConfig.importDefault.add(function(nodePath,importPath,fileName,fns){
    return {
        functionName : 'withRouter',
        newModulePath : importPath
    }
});


// example 3
const importConfig =require('./config/import');
const newCustomImportConfig = importConfig.createImportConfig(resolve('./pages'));
newCustomImportConfig.importDefault.add(function(nodePath,importPath,fileName,fns){
    fns.addImport('withRouter','example/withRouter', true);
    return {
        functionName : 'withRouter',
        newModulePath : importPath
    }
});
importConfig.patternList.add(newCustomImportConfig);

// example 4
const coreConfig = require('./core/config');
coreConfig.importFucntions.clearAll()
