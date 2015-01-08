import {Scanner} from '../src/syntax/Scanner';
import {Parser} from '../src/syntax/Parser';
import {Options} from '../src/Options';
import {ErrorReporter} from '../src/util/ErrorReporter';
import {Source} from '../src/syntax/Source';


class Main {
    static get FS(){
        return require('fs');
    }
    static get SOURCE_TREE_XML(){
        return `${__dirname}/out/test.xml`;
    }
    static get SOURCE_NAME(){
        return `${__dirname}/src/test.js`;
    }
    static get SOURCE_FILE(){
        return Main.FS.readFileSync(Main.SOURCE_NAME,'utf8');
    }
    static scan(){
        var scanner = new Scanner ({
            source      : new Source({
                name    : Main.SOURCE_NAME,
                content : Main.SOURCE_FILE
            }),
            reporter    : new ErrorReporter(),
            options     : new Options()
        });
        while(!scanner.isAtEnd()){
            console.info(scanner.nextToken())
        }
        console.info(scanner.nextToken())
    }
    static parse(){
        var parser = new Parser({
            source      : new Source({
                name    : Main.SOURCE_NAME,
                content : Main.SOURCE_FILE
            }),
            reporter    : new ErrorReporter(),
            options     : new Options()
        });
        var tree = parser.parseModule().toXML();
        console.info(tree);
        Main.FS.writeFileSync(Main.SOURCE_TREE_XML,tree);
        //Main.print(tree);
        //Main.write(tree);
    }

    static write(tree){
        var writer = new ParseTreeWriter(new Options());
        writer.visitAny(tree);
        console.log(writer.toString());
    }
    static inspect(value){
        console.log(require('util').inspect(value, { showHidden: true, depth: null }));
    }
    static print(value){
        console.log(JSON.stringify(value,null,'  '));
    }
}

Main.parse();

