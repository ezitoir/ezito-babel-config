'use strict';
const isFunction = require('ezito-utils/public/is/function');
const makeError = require('ezito-utils/public/make-error');
const ezitoTypes = require('ezito-utils/public/validators/types');
 
const customPresetsConfig = {
    add : function (array){ 
        var isValidParam = ezitoTypes.array (
            array,
            [
                ezitoTypes.oneOfType(
                    ezitoTypes.function ,
                    ezitoTypes.string
                ),
                ezitoTypes.object
            ]
        ); 
        
        if(!isValidParam) throw makeError(
            '[PARAM-TYPE-ERROR]' ,
            'cb param must be functin type',
            1
        );
        for (const iterator of this.configCBList.list) {
            if(iterator[0] === array[0]) return ;
        }
        this.configCBList.add(array);
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
    },
    getList : function(){
        return this.configCBList.list
    }
};

module.exports = customPresetsConfig;