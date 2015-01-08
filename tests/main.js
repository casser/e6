/**
 * Created by Sergey on 12/3/14.
 */
import {Parser} from '../src/syntax/Parser';
import {SourceFile} from '../src/syntax/SourceFile';
import {Compiler} from '../src/Compiler';

class NODE {
    static get FS(){
        return require('fs');
    }
    static get VM(){
        return require('vm');
    }

    static get SOURCE_FILE(){
        return `${__dirname}/src/test.js`;
    }
    static get TEST_MAP_FILE(){
        return `${__dirname}/out/test.map`;
    }
    static get TEST_SRC_FILE(){
        return `${__dirname}/out/test.js`;
    }
    static get TEST_SRC_ES5_TREE(){
        return `${__dirname}/out/test.es5.json`;
    }
    static get TEST_SRC_ES6_TREE(){
        return `${__dirname}/out/test.es6.json`;
    }
    static compile(){
        var compiler = new Compiler({
            types           : true,
            typeAssertions  : true,
            memberVariables : true,
            annotations     : true,
            sourceMaps      : true,
            moduleName      : true,
            require         : true,
            module          : 'register',
            rtn             : 'E$6'
        });


        var source = compiler.compile(
            NODE.FS.readFileSync(NODE.SOURCE_FILE,'utf8'),'zero.js','zero.js'
        );

        NODE.FS.writeFileSync(NODE.TEST_SRC_ES6_TREE,JSON.stringify(compiler.es6Tree,null,2));
        NODE.FS.writeFileSync(NODE.TEST_SRC_ES5_TREE,JSON.stringify(compiler.es5Tree,null,2));

        NODE.FS.writeFileSync(NODE.TEST_MAP_FILE,compiler.getSourceMap());
        NODE.FS.writeFileSync(NODE.TEST_SRC_FILE,source);
        console.info(source);
        //require('./test.js');
    }

}
NODE.compile();

//NODE.VM.runInNewContext(NODE.RUNTIME_SOURCE,NODE.CONTEXT,NODE.RUNTIME_FILE)
//NODE.VM.runInNewContext(NODE.TEST_SOURCE,NODE.CONTEXT,NODE.TEST_FILE)
