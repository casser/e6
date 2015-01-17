var Module = require('module');
Module._resolveFileName = Module._resolveFilename;
Module._resolveFilename = function(request, parent) {
    return Module._resolveFileName(request, parent);
};

// bootstrap.js
var traceur = require('traceur');
traceur.require.makeDefault(function(filename,module) {
    return filename.indexOf('e6')>=0;
},{experimental:true,types:true,annotations:true,memberVariables:true});

require('./tests/parser');