import {Scanner} from '../src/syntax/Scanner';
import {Parser} from '../src/syntax/Parser';
import {Options} from '../src/Options';
import {Source} from '../src/syntax/Source';
import {Visitor} from '../src/syntax/Visitor';

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
    static parse(){
        try{
            var source = Parser.parse(new Source({
                name    : Main.SOURCE_NAME,
                content : Main.SOURCE_FILE
            }));
            if(source.ast){
                console.info(source.ast.toXML(1,false,false));
                Main.FS.writeFileSync(Main.SOURCE_TREE_XML,source.ast.toXML(0,true));
            }
        }catch(e){
            console.info(e.stack)
        }

        //Main.print(tree);
        //Main.write(tree);
    }
    static inspect(value){
        console.log(require('util').inspect(value, { showHidden: true, depth: null }));
    }
    static print(value){
        console.log(JSON.stringify(value,null,'  '));
    }
}

Main.parse();

