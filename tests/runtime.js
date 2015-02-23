(function(global) {
    // Classes
    function Field(){}
    function Method(c,f,n,i){
        Object.defineProperties(this,{
            name    : {value:n},
            closure : {value:i.m}
        });
        Object.defineProperty(i.m,'inspect',{
            value:function(){return '[function '+n+']'}
        });
        Object.defineProperty(i.m,'toString',{
            value:function(){return '[function '+n+']'}
        });
    }
    function Class(name,initializer){
        var sc,ic,sm={},im={},cp=Object,c=this;
        Object.defineProperties(this,{
            inspect   : {
                value : function(){
                    return '[class '+name+']';
                }
            },
            toString  : {
                value : function(){
                    return '[class '+name+']';
                }
            },
            closure   : {
                get     : function(){return ic.closure}
            },
            // temp variables
            e6        : {
                configurable  : true,
                get : function(){
                    initializer.call(c);
                    ic.closure.__proto__ = cp;
                    ic.closure.prototype = {
                        __proto__     : cp.prototype,
                        constructor   : ic.closure
                    };
                    Object.keys(sm).forEach(function (k) {
                        if(sm[k] instanceof Field){
                            if(sm[k].getter || sm[k].setter) {
                                Object.defineProperty(ic.closure, k, {
                                    get: sm[k].getter,
                                    set: sm[k].setter
                                })
                            }
                        }else{
                            Object.defineProperty(ic.closure,k,{
                                value : sm[k].closure
                            })
                        }
                    });
                    Object.keys(im).forEach(function (k) {
                        if(im[k] instanceof Field){
                            if(im[k].getter || im[k].setter) {
                                Object.defineProperty(ic.closure.prototype,k,{
                                    get: im[k].getter,
                                    set: im[k].setter
                                })
                            }
                        }else{
                            Object.defineProperty(ic.closure.prototype,k,{
                                value : im[k].closure
                            })
                        }
                    });
                    Object.defineProperty(ic.closure,'class',{value:this});
                    Object.defineProperty(ic.closure.prototype,'class',{value:this});
                    sc.closure.call(ic.closure);
                    delete c.e6;
                    delete c.E6;
                    return ic.closure;
                }
            },
            E6        : {
                configurable  : true,
                value : {
                    P  : function(p){
                        cp = p;
                    },
                    F  : function(f,n,i){
                        if(f==1){
                            sm[n] = new Field(c,f,n,i);
                        }else{
                            im[n] = new Field(c,f,n,i);
                        }
                    },
                    M  : function(f,n,i){
                        if(f==1){
                            if(n=='constructor'){
                                sc = new Method(c,f,n,i);
                            }else{
                                sm[n] = new Method(c,f,n,i);
                            }
                        }else{
                            if(n=='constructor'){
                                ic = new Method(c,f,n,i);
                            }else{
                                im[n] = new Method(c,f,n,i);
                            }
                        }
                    }
                }
            }
        });
    }
    function Module(name,initializer){
        var scope={},exports=[],imports={},init;
        Object.defineProperties(this,{
            name    : { value : name },
            exports : {
                configurable  : true,
                get           : function(){
                    var map = {};
                    exports.forEach(function(key){
                        if(scope[key]){
                            Object.defineProperty(map,key,{
                                value:scope[key]
                            });
                        }
                    });
                    Object.defineProperty(this,'exports',{value:map});
                    return map;
                }
            }
        });
        Object.defineProperties(scope,{
            E6      : {
                configurable  : true,
                value : {
                    C  : function(n,i){
                        Object.defineProperty(scope,n,{
                            configurable  : true,
                            get           : function(){
                                Object.defineProperty(scope,n,{
                                    value : new Class(n,i).e6
                                });
                                return scope[n];
                            }
                        })
                    },
                    I  : function(m,o){
                        if(!imports[m]){
                            imports[m] = {};
                        }
                        Object.keys(o).forEach(function(k){
                            imports[m][k] = o[k];
                        });
                    },
                    E  : function(){
                        for(var a=0;a<arguments.length;a++){
                            exports.push(arguments[a]);
                        }
                    },
                    M  : function(i){
                        init = i;
                    }
                }
            }
        });
        if(!MODULES[name]){
            initializer.call(scope,this);
            Object.keys(imports).forEach(function(m){
                var opt = imports[m];
                var mod = MODULES[m];
                Object.keys(opt).forEach(function(k){
                    var target = mod.exports[k],name=(opt[k]==='*'?k:opt[k]);
                    Object.defineProperty(scope,name,{value:target});
                })
            });
            var map = {};
            exports.forEach(function(key){
                if(scope[key]){
                    Object.defineProperty(map,key,{
                        value:scope[key]
                    });
                }
            });
            Object.defineProperty(this,'exports',{
                value:map
            });

            delete scope.E6;
            if(init){
                init.call(scope);
            }
            Object.defineProperty(MODULES,name,{
                value:this
            })
        }
    }
    // DEFINITIONS
    var MODULES={}, CLASSES={};
    Object.defineProperty(global,'E6',{
        value : function(name,initializer){
            return new Module(name,initializer);
        }
    });
    Object.defineProperties(global.E6,{
        super   : {
            value : function(cls,object,key,val){
                var v,d,
                    s=object.class.closure===object,
                    p=cls.prototype.__proto__.constructor;
                if(key){
                    d = Object.getOwnPropertyDescriptor(s?p:p.prototype,key);
                    if(val){
                        v=d.set
                    }else{
                        v=(d.get||d.value)
                    }
                }else{
                    v=p;
                }
                return v.bind(object);
            }
        },
        spread  : {
            value : function(){
                var res = [];
                for(var a =0;a<arguments.length;a++){
                    for(var s=0;s<arguments[a].length;s++){
                        res.push(arguments[a][s]);
                    }
                }
                return res;
            }
        },
        modules : {value:MODULES},
        classes : {value:CLASSES}
    });
})(typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : this);
