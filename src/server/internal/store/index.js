
function Store(container) {

  function getSchema(name) {
    return container.get(name);
  }

  return Object.freeze({
    getSchema
  });
}

Store.type = 'factory';

module.exports = Store;
