import {Scanner}       from '../src/syntax/Scanner';
import {Parser}        from '../src/syntax/Parser';
import {Options}       from '../src/Options';
import {Source}        from '../src/syntax/Source';


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
        var parser = new Parser({
            options     : new Options(),
            source      : new Source({
                name    : Main.SOURCE_NAME,
                content : Main.SOURCE_FILE
            })
        });
        var tree = parser.parse();
        if(tree){
            tree = tree.toXML();
            console.info(tree);
            Main.FS.writeFileSync(Main.SOURCE_TREE_XML,tree);
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

