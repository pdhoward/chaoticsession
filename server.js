/* eslint import/no-unresolved:0 */


require('babel-core/register')({
    presets: ['es2015']
});
require('babel-polyfill');
require('./server/index');
