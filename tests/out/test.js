System.registerModule("zero.js", [], function(require) {
  "use strict";
  var __moduleName = "zero.js";
  var Some = function Some() {
    console.info('Barev');
  };
  ($traceurRuntime.createClass)(Some, {}, {});
  new Some();
  return {};
});

//# sourceMappingURL=zero.map
//# sourceURL=zero.js