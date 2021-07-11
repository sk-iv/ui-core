const fs = require('fs');
const path = require('path');

const getGeneratorDataPath = (generatorIdentifier) => (
  path.resolve(__dirname, `meta/${generatorIdentifier}.json`)
);

const getGeneratorData = (generatorIdentifier) => {
  const dir = getGeneratorDataPath(generatorIdentifier);

  if (fs.existsSync(dir)) {
    return require(dir);
  }

  return {};
};

const saveGeneratorData = (generatorIdentifier, uniqIds) => {
  const dir = getGeneratorDataPath(generatorIdentifier);
  const data = JSON.stringify(uniqIds, null, 2);

  fs.writeFileSync(dir, data, 'utf-8');
};

module.exports = {
  getGeneratorData,
  saveGeneratorData,
};
