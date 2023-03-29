var _interopRequireDefault = function _interopRequireDefault(obj)  { return obj && obj.__esModule ? obj : { default: obj }; };
var  _getRequireWildcardCache = function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap(); 
    return cache;
}
var _interopRequireWildcard = function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }
  
    if (obj === null || typeof (obj) !== "object" && typeof obj !== "function") {
      return {
        "default" : obj
      };
    }
  
    var cache = _getRequireWildcardCache();
  
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
  
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
  
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
  
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
  
    newObj["default"] = obj;
  
    if (cache) {
      cache.set(obj, newObj);
    }
  
    return newObj;
};
module.exports = {
    withCardsImport : {
        fnNames : ['_interopRequireWildcard' , 'require'],
        fnList  : [
            { 
                name : '_getRequireWildcardCache' ,
                body : Function.prototype.toString.call(_getRequireWildcardCache)
            } ,
            {
                name : '_interopRequireWildcard' ,
                body : Function.prototype.toString.call(_interopRequireWildcard)
            }
        ]
    },
    defaultImport : {
        fnNames : ['_interopRequireDefault' , 'require'],
        fnList  : [
            { 
                name : '_interopRequireDefault' ,
                body : Function.prototype.toString.call(_interopRequireDefault)
            } 
       ], 
    },
    import : {
        fnNames  : ['require'] ,
        fnList : [ 
        ]
    }
};

module.exports["default"] = module.exports;
module.exports.__esModule = true;
_interopRequireDefault = undefined;
_getRequireWildcardCache = undefined;
_interopRequireWildcard = undefined;