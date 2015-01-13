import {SourceMapConsumer}  from '../src/mapping/Consumer';
import {SourceMapGenerator} from '../src/mapping/Generator';
import {SourceNode}         from '../src/mapping/Node';
import FS from 'fs';

var smc = new SourceMapConsumer({
    version: 3,
    file: 'min.js',
    names: ['bar', 'baz', 'n'],
    sources: ['one.js', 'two.js'],
    sourceRoot: 'http://example.com/www/js/',
    mappings: 'CAAC,IAAI,IAAM,SAAUA,GAClB,OAAOC,IAAID;CCDb,IAAI,IAAM,SAAUE,GAClB,OAAOA'
});

console.info(smc.sources);
console.info(smc.generatedPositionFor({
    source: 'http://example.com/www/js/two.js',
    line: 2,
    column: 10
}));


var map = new SourceMapGenerator({
    file: "source-mapped.js"
});

map.addMapping({
    generated: {
        line: 10,
        column: 35
    },
    source: "foo.js",
    original: {
        line: 33,
        column: 2
    },
    name: "christopher"
});

console.log(map.toString());

map = new SourceNode(1,0,"add.js",[
    new SourceNode(1,0,"add.js","HELLO","hello"),
    new SourceNode(1,5,"add.js","+"),
    new SourceNode(1,10,"add.js","WORLD","world")
]).toStringWithSourceMap({
        file:'add.min.js'
});
console.log(map.code.toString());
console.log(map.map.toString());
FS.writeFileSync('./tests/out/add.js','hello add world');
FS.writeFileSync('./tests/out/add.min.js',map.code.toString());
FS.writeFileSync('./tests/out/add.min.map',map.map.toString());

