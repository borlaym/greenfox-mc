const diTools = require('lab-di/tools')();
const path = require('path');

const di = diTools.getDI();
di.registerModule(require('lab-config'), 'config');
di.registerModule(require('lab-config/implementations/memory'), 'config-memory');

diTools.registerDir(path.resolve(__dirname, 'external'));

export default di;

// Why are we using both commonjs and es6 imports? What's the difference?
