import {Compiler} from '../src/Compiler';
import {Options}  from '../src/Options';

class Main {
    static get SOURCE(){
        return `${__dirname}/src/test.js`;
    }
    static get OUTPUT(){
        return `${__dirname}/out/test.js`;
    }
    static compile(){
        Compiler.compile(Main.SOURCE,Main.OUTPUT);
    }
}

Main.compile();

