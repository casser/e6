require('./runtime');
//require('./project/out/index');

var fs = require('fs');
var vm = require('vm');
var path = require('path');

var file = path.resolve(__dirname,'./project/out/index.out.js');

vm.runInThisContext(fs.readFileSync(file,'utf8'),file);
//eval(fs.readFileSync(file,'utf8')+'\n//# sourceURL='+file)
console.info(E6.module('/test-module/index.js').init());