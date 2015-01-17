import {Visitor} from '../../syntax/Visitor'
import {Ast} from '../../syntax/Ast'
import {SourceMapGenerator} from '../../mapping/Generator'
import {Token,TokenType} from '../../syntax/Token'
import Path from 'path'

export class Writer extends Visitor {
    static write(output){
        new Writer(output)
    }
    constructor(source){
        super({
            map     : new SourceMapGenerator({
                file        : source.name,
                sourceRoot  : Path.dirname(source.name)
            }),
            line    : '',
            lines   : 1,
            indent  : 0,
            pretty  : true,
            source  : source
        });
        this.visit(this.source.ast);
        this.writeLine();
        source.map = this.$.map.toString()
    }
    get source():Source{
        return this.$.source
    }

    write(value) {
        if (value === null) return;
        if (this.$.pretty && this.$.line.length === 0) {
            for (var i = 0; i < this.$.indent; i++) {
                this.writeRaw('  ');
            }
        }
        this.writeRaw(value);
    }
    writeRaw(value){
        if(value instanceof Token){
            var source = Path.relative(Path.dirname(this.source.name),value.source.name)
            this.$.map.addMapping({
                source: source,
                generated: {
                    line: this.$.lines,
                    column: this.$.line.length
                },
                original: {
                    line: value.location.start.line,
                    column: value.location.start.column
                }
            });
            this.$.line += value.text;
            this.$.map.addMapping({
                source: source,
                generated: {
                    line: this.$.lines,
                    column: this.$.line.length
                },
                original: {
                    line: value.location.end.line,
                    column: value.location.end.column
                }
            });

        }else
        if(value instanceof TokenType){
            this.$.line += value.text;
        }
    }
    writeLine(){
        this.source.content += this.$.line+'\n';
        this.$.lines++;
        this.$.line='';
    }
    // visitors
    visit(node:Node){
        if(!node) return;
        if(Array.isArray(node)){
            for(var child of node){
                this.visit(child);
            }
        }else{
            super.visit(node);
        }
    }
    visitVariableDeclaration(node:VariableDeclarationNode){
        this.write(node.get(Token.VAR));
        this.write(Token.WS);
        this.visit(node.find(Ast.VariableDeclarator));
        this.write(Token.SEMI_COLON);
        this.writeLine();
    }
    visitVariableDeclarator(node:VariableDeclaratorNode){
        this.visit(node.find(Ast.Identifier));
        var init = node.find(Ast.Initializer);
        if(init){
            this.write(Token.EQUAL);
            this.visit(init);
        }
    }
    visitNewExpression(node:NewNode){
        this.write(node.get(Token.NEW));
        this.write(Token.WS);
        this.visit(node.children[1]);
        this.visit(node.children[2]);
    }
    visitArguments(node:ArgumentsNode){
        this.write(node.get(Token.OPEN_PAREN));
        var first = true;
        for(var child of node.children){
            if(!(child instanceof Token)){
                if(!first){
                    this.write(Token.COMMA);
                }
                first = false;
                this.visit(child);
            }
        }
        this.write(node.get(Token.CLOSE_PAREN));
    }
    visitIdentifier(node:IdentifierNode){
        this.write(node.first);
    }
    visitToken(token:Token){
        this.write(token);
        this.write(Token.WS);
    }
}