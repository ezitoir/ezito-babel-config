'use strict';
const isFunction = require('ezito-utils/public/is/function');
const makeError = require('ezito-utils/public/make-error');
const importConfig = {
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
                if(this.counter > this.list.length){
                    this.counter = -1;
                    return false;
                }
                this.counter ++;
                return this.list.at(this.counter);
            }
        }
    },
    importDefault : {
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
                if(this.counter > this.list.length){
                    this.counter = -1;
                    return false;
                }
                this.counter ++;
                return this.list.at(this.counter);
            }
        }
    },
    importWithCards : {
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
                if(this.counter > this.list.length){
                    this.counter = -1;
                    return false;
                }
                this.counter ++;
                return this.list.at(this.counter);
            }
        }
    },
};

module.exports = importConfig;