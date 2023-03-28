'use strict';



function init(){
    return {
        prepareCallFunction( nodePath , fileName , fns){  
            
            return {
                Require : (args) =>{ 
                     
                },
                Import : (args) => {
                    //return config(args,fileName,fns);
                },
                useServerSideProps : () => {
                    
                },
            }
        },
    }
}

module.exports = init;