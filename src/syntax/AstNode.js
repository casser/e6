import {Entity} from '../util/Entity.js';
export class AstNode extends Entity {
    static get TYPE(){
        return this;
    }
    get type(){
        return this.constructor;
    }
    get parent():AstNode{
        return this.$.parent;
    }
    get children():Array{
        if(!this.$.children){
            this.$.children=[]
        }
        return this.$.children;
    }
    get first():AstNode{
        return this.children[0];
    }
    get last():AstNode{
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
    toXML(l=1,pl=false){
        var tab = Entity.repeat(l);
        var lst = [];
        var sLoc = `${this.location.start.line}:${this.location.start.column}`;
        var eLoc = `${this.location.end.line}:${this.location.end.column}`;
        var loc  = pl?` pos="${this.range.join('-')}" loc="${sLoc}-${eLoc}"`:'';
        lst.push(`${tab}<${this.type.name}${loc}>`);
        for(var child of this.$.children){
            if(child){
                lst.push(child.toXML(l+1,pl));
            }else{
                lst.push('<ERROR>');
            }
        }
        lst.push(`${tab}</${this.type.name}>`);
        return lst.join('\n')
    }
}
