const incstr = require("incstr");

const createUniqueIdGenerator = () => {
  const index = {};
  const generateNextId = incstr.idGenerator({
    alphabet: "abcdefghijklmnopqrstuvwxyz"
  });
  return name => {
    if (index[name]) {
      return index[name];
    }
    let nextId = generateNextId();
    index[name] = nextId;
    return nextId;
  };
};

module.exports = createUniqueIdGenerator;
