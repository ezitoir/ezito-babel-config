'use strict';
const isFunction = require('ezito-utils/public/is/function');
const ezitoTypes = require('ezito-utils/public/validators/types');
const makeError = require('ezito-utils/public/make-error');
const cloneObject = require('ezito-utils/public/object/clone');
const $$typeC = Symbol.for('custom-import-config');
const $$typeA = Symbol.for('all');
const settingImportConfig = {
    import : {
        add : function ( cb){
            if(!isFunction(cb)) throw makeError(
                '[PARAM-TYPE-ERROR]' ,
                'cb param must be functin type',
                1
            );
            this.configCBList.add(cb);
        },
        configCBList : {
            add : function(cb){
                this.list.push(cb);
            },
            list : [],
            counter : -1,
            next : function(){
                this.counter ++;
                if(this.counter == this.list.length){
                    this.counter = -1;
                    return false;
                }
                return this.list.at(this.counter);
            }
        }
    },
    default : {
        add : function ( cb){
            if(!isFunction(cb)) throw makeError(
                '[PARAM-TYPE-ERROR]' ,
                'cb param must be functin type',
                1
            );
            this.configCBList.add(cb);
        },
        configCBList : {
            add : function(cb){
                this.list.push(cb);
            },
            list : [] ,
            counter : -1,
            next : function(){
                this.counter ++;
                if(this.counter == this.list.length){
                    this.counter = -1;
                    return false;
                }
                return this.list[this.counter];
            }
        }
    }, 
    withCards : {
        add : function ( cb){
            if(!isFunction(cb)) throw makeError(
                '[PARAM-TYPE-ERROR]' ,
                'cb param must be functin type',
                1
            );
            this.configCBList.add(cb);
        },
        configCBList : {
            add : function(cb){
                this.list.push(cb);
            },
            list : [] ,
            counter : -1,
            next : function(){
                this.counter ++;
                if(this.counter == this.list.length){
                    this.counter = -1;
                    return false;
                }
                return this.list[this.counter];
            }
        }
    }, 
    $$type : $$typeA
}
const importConfig = {
    ...cloneObject(settingImportConfig),
    createImportConfig (patternPath){
        var newCustomImportConfin = cloneObject(settingImportConfig);
        newCustomImportConfin.currentPath = patternPath;
        newCustomImportConfin.$$type = $$typeC;
        return newCustomImportConfin;
    },
    currentPath : '*' ,
    patternList : {
        add(config){
            if(!ezitoTypes.object(config)) throw makeError(
                '[PARAM-TYPE-ERROR]',
                'config param must be have object type',
                1
            );
            if(config.$$type !== $$typeC) throw makeError(
                '[PARAM-TYPE-ERROR]',
                'config must be created by importConfig',
                1
            )
            this.list.push(config)
        },
        getList(patternPath , type){
            var obj = {
                list : [],
                counter : -1,
                next(){ 
                    if(this.counter > this.list.length){
                        this.counter = -1;
                        return false;
                    } 
                    this.counter ++; 
                    return this.list[this.counter]; 
                }
            }; 
            obj.list = this.list.filter( c => {
                return c.currentPath === patternPath.slice(0,c.currentPath.length) 
            }); 
            return obj;
        },
        list : [],
    },
}; 
module.exports = importConfig;