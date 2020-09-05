const emptyViewGenerator = require('./plop-templates/empty.view/empty.view');
const standardViewGenerator = require('./plop-templates/standard.view/standard.view');

module.exports = function(plop) {
    // create generators here
    plop.setGenerator('empty view', emptyViewGenerator);
    plop.setGenerator('standard view', standardViewGenerator);
};
