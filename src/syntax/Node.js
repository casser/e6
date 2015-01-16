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
    toXML(l=1,pl=false){
        var tab = Entity.repeat(l);
        var lst = [];
        var sLoc = `${this.location.start.line}:${this.location.start.column}`;
        var eLoc = `${this.location.end.line}:${this.location.end.column}`;
        var loc  = pl?` pos="${this.range.join('-')}" loc="${sLoc}-${eLoc}"`:'';
        lst.push(`${tab}<${this.name}${loc}>`);
        for(var child of this.$.children){
            if(child){
                lst.push(child.toXML(l+1,pl));
            }else{
                lst.push('<ERROR>');
            }
        }
        lst.push(`${tab}</${this.name}>`);
        return lst.join('\n')
    }
}
