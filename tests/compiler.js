import {Compiler} from '../src/Compiler';
import {Options}  from '../src/Options';

class Main {
    static get SOURCE(){
        return `${__dirname}/project/package.json`;
    }
    static compile(){
        Compiler.compile(Main.SOURCE);
    }
}

Main.compile();

