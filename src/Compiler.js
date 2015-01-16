import {Entity} from './util/Entity'
import {Options} from './Options'
import {Parser} from './syntax/Parser'
import {Source} from './syntax/Source'
import {Translator} from './targets/ES5/Translator'
import {Writer} from './targets/ES5/Writer'

import {DependencyResolver} from './helpers/DependencyResolver'

import FS from 'fs';
import Path from 'path';

export class Compiler extends Entity {
    static compile(src,out,options){
        return new Compiler(options).compile(src,out);
    }
    constructor(options){
        options = options||new Options();
        super({
            options : options
        })
    }
    get sources(){
        if(!this.$.sources){
            this.$.sources={}
        }
        return this.$.sources;
    }
    get options(){
        return this.$.options;
    }
    compile(src,out){
        var source = this.compileFile(src);
        var output = new Source({
            name    : out
        });
        Translator.translate(source,output,this.options)
        Writer.write(output,this.options);
        console.info(output.content);
        console.info(output.map);
        FS.writeFileSync(output.name,output.content);
        FS.writeFileSync(output.name+'.map',output.map);

    }
    compileFile(src){
        if(!this.sources[src]){
            var source = new Source({
                name    : src,
                content : FS.readFileSync(src,'utf8')
            });
            Parser.parse(source,this.options);
            var dependencies = DependencyResolver.resolve(source,this.options);
            this.sources[src] = source;
            for(var path in dependencies){
                source.dependencies[path] = this.compileFile(this.resolveDependency(source.name,path));
            }
        }
        return this.sources[src]
    }
    resolveDependency(base,path){
        path = Path.resolve(Path.dirname(base),path);
        if(Path.extname(path)!='.js'){
            path = path+'.js'
        }
        return path;
    }

}