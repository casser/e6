import {Visitor} from '../../syntax/Visitor'
import {Ast} from '../../syntax/Ast'

export class Translator extends Visitor {
    static translate(source,output){
        new Translator(source,output)
    }
    constructor(source,output){
        super({
            root        :source,
            output      :output,
            sources     :{}
        });
        output.ast = new Ast.Module();
        this.translate(source);
    }
    get sources(){
        return this.$.sources
    }
    get source(){
        return this.$.source
    }
    get output():Source{
        return this.$.output
    }
    translate(source){
        if(!this.sources[source.name]){
            this.sources[source.name] = true;
            this.visit(source.ast);
            for(var s in source.dependencies){
                this.translate(source.dependencies[s])
            }
        }
    }
    visit(node){
        super.visit(node);
    }
    visitModule(node:ImportDeclarationNode){
        for(var child of node.children){
            if(!child.is(Ast.ImportDeclaration)){
                this.output.ast.add(child)
            }
        }
    }
}