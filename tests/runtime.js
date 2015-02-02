
(function(global){
    var Path = {
        resolve:function(base,path){
            path = (base+'/./'+path).split('/');
            base = [];
            while(path.length){
                var next = path.shift();
                if(next!='.'){
                    if(next=='..'){
                        base.pop();
                    }else{
                        base.push(next);
                    }  
                }
            }
            return base.join('/');
        },
        dirname:function(path){
            path = path.split('/');
            path.pop();
            return path.join('/');
        },
        extname:function(path){
            var parts = path.match(/^.*(\.[a-z]+)$/)
            if(parts){
                return parts[1];
            }
        }
    };
    var MODULES = [];
    function Class(name,initializer){
        this.name  = function(){
            return name;
        };
        this.init = function(){
            var P,CI,CS,MI={},MS={},GI={},GS={},SI={},SS={};
            new initializer({
                F : function (mod,name) {
                    console.info(mod,name);
                },
                M : function(mod,name,method){
                    if(name=='constructor'){
                        if((mod&1)==1){
                            CS = method;
                        }else{
                            CI = method;
                        }
                    }else{
                        if((mod&1)==1){
                            MS[name] = method;
                        }else{
                            MI[name] = method;
                        }
                    }
                },
                G : function(mod,name){
                    console.info(mod,name);
                },
                S : function(mod,name){
                    console.info(mod,name);
                },
                P : function(parent){
                    P = parent;
                }
            });
            for(var m in MI){
                Object.defineProperty(CI.prototype,m,{
                    value : MI[m]
                }) 
            }
            for(var m in MS){
                Object.defineProperty(CI,m,{
                    value : MS[m]
                })
            }
            for(var m in GI){
                Object.defineProperty(CI.prototype,m,{
                    value : GI[m]
                })
            }
            for(var m in GS){
                Object.defineProperty(CI,m,{
                    value : GS[m]
                })
            }
            for(var m in SI){
                Object.defineProperty(CI.prototype,m,{
                    value : SI[m]
                })
            }
            for(var m in SS){
                Object.defineProperty(CI,m,{
                    value : SS[m]
                })
            }
            if(CS){
                CI.static = CS;
            }
            CI.prototype.__proto__=P.prototype;
            CI.prototype.constructor = CI;
            return CI;
        }
    }
    function Module(name,initializer){
        var scope   = {};
        var imports = {};
        var exports = {};
        var classes = {};

        this.scope = function(){
          return scope;
        };
        this.name  = function(){
            return name;
        };
        
        initializer.call(scope,{
            I:function(module){
                imports[module] = false;
            }.bind(scope),
            E:function(module){
                exports[module] = false;
            }.bind(scope),
            C:function(name,initializer){
                classes[name] = new Class(name,initializer);
            }.bind(scope)
        });
        
        this.init = function(){
            for(var i in imports){
                 var exports = E6.module(Path.resolve(Path.dirname(this.name()),'./'+i)).init();
                 for(var e in exports){
                     scope[e]=exports[e];
                 }
            }
            for(var i in classes){
                scope[i] = classes[i].init();
                if(typeof scope[i].static == 'function'){
                    scope[i].static.call(scope[i]);
                    delete scope[i].static;
                }
            }
            //console.info(scope)
            return scope;
        }
    }
    function E6(main,initializer){
        initializer(function(name,initializer){
            MODULES.push(new Module('/'+main+'/'+name,initializer))
        });
    }
    E6.module = function(name){
        if(Path.extname(name)!='.js'){
            name=name+'.js'
        }
        for(var i=0;i<MODULES.length;i++){
            if(name==MODULES[i].name()){
                return MODULES[i];
            }          
        }
    };
    
    global.E6 = E6;

})((typeof global != 'undefined')?global:window);
