import {Entity} from '../util/Entity.js';
import {Token,TokenType} from '../syntax/Token';
export class Node extends Entity {
    static get TYPE(){
        return this;
    }
    static is(node,...types){

        for(var type of types){
            if(node instanceof Token){
                return (node.type == type);
            } else
            if(typeof type=='function'){
                if(node.constructor == type){
                    return true;
                }
            }else
            if(typeof type=='string'){
                if(node.name == type){
                    return true;
                }
            }
        }
        return false;
    }
    get type(){
        return this.constructor;
    }
    get name(){
        return this.type.name.substring(0,this.type.name.length-4)
    }
    get attributes(){
        return false;
    }
    get parent():Node{
        return this.$.parent;
    }
    get children():Array{
        if(!this.$.children){
            this.$.children=[]
        }
        return this.$.children;
    }
    get first():Node{
        return this.children[0];
    }
    get last():Node{
        return this.children[this.children.length-1];
    }
    get range(){
        return [
            this.first?this.first.range[0]:NaN,
            this.last?this.last.range[1]:NaN
        ];
    }
    get location(){
        return {
            start   : this.first?this.first.location.start:NaN,
            end     : this.last?this.last.location.end:NaN
        }
    }
    find(name) {
        var result = this.children.filter((child)=> {
            return Node.is(child,name);
        });
        if(!result.length && (name instanceof TokenType)){
            result.push(name);
        }
        return result;
    }
    get(name) {
        if(typeof name=='number'){
            return this.children[name];
        }
        for(var child of this.children){
           if(Node.is(child,name)){
               return child;
           }
        }
        if(name instanceof TokenType){
            return name;
        }
    }
    add(child){
        return (this.children.push(child),child);
    }
    inspect(){
        return this.toString();
    }
    toString() {
        return this.toXML();
    }
    toJSON(){
        var node = AstNode.merge({
            type : this.type.name
        },this.$);
        delete node.location;
        return node;
    }
    is(...types){
        return Node.is(this,...types);
    }
    toXML(l=1,positions=false,tokens=true){
        var tab = Entity.repeat(l);
        var lst = [];
        var sLoc = `${this.location.start.line}:${this.location.start.column}`;
        var eLoc = `${this.location.end.line}:${this.location.end.column}`;
        var loc  = positions?` pos="${this.range.join('-')}" loc="${sLoc}-${eLoc}"`:'';
        var att  = this.attributes
        if(att){
            var list = [];
            for(var key in att){
                list.push(`${key}=${JSON.stringify(att[key].toString())}`);
            }
            att = list.join(' ');
        }
        lst.push(`${tab}<${this.name}${loc}${att?' '+att:''}>`);
        for(var child of this.$.children){
            if(child){
                if(tokens || (child instanceof Node)){
                    lst.push(child.toXML(l+1,positions,tokens));
                }
            }else{
                lst.push('<ERROR>');
            }
        }
        if(lst.length>1){
            lst.push(`${tab}</${this.name}>`);
        }else{
            lst[0]=lst[0].substring(0,lst[0].length-1)+'/>'
        }

        return lst.join('\n')
    }
    build(){
        console.info(this.name)
        for(var child of this.children){
            if(child instanceof Node){
                child.build();
            }
        }
    }
}
