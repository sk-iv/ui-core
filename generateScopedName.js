const incstr = require('incstr')
// Импортируем две новых функции
const {
  getGeneratorData,
  saveGeneratorData,
} = require('./generatorHelpers');

const createUniqueIdGenerator = (generatorIdentifier) => {
  // Восстанавливаем сохраненные данные
  const uniqIds = getGeneratorData(generatorIdentifier);

  // нельзя начинать название селектора с цифры
  const alphabets = {
    componentName: 'abcdefghijklmnopqrstuvwxyz',
    localName: 'abcdefghijklmnopqrstuvwxyz0123456789',
  }

  const generateNextId = incstr.idGenerator({
    alphabet: alphabets[generatorIdentifier],
  });

  return (name) => {
    if (!uniqIds[name]) {
      uniqIds[name] = generateNextId();

      // Сохраняем данные каждый раз,
      // когда обработали новое имя класса
      // (можно заменить на debounce для оптимизации)
      saveGeneratorData(generatorIdentifier, uniqIds);
    }

    return uniqIds[name];
  };
};

// Создаем генераторы с уникальными идентификаторами,
// чтобы для каждого из них можно было сохранить данные
const localNameIdGenerator = createUniqueIdGenerator('localName');
const componentNameIdGenerator = createUniqueIdGenerator('componentName');

module.exports = (localName, resourcePath) => {
  const componentName = resourcePath
    .split(/\\/g)
    .slice(-1)[0].replace('.mdl.css', '')

  const localId = localNameIdGenerator(localName)
  const componentId = componentNameIdGenerator(componentName)

  return `${componentId}_${localId}`
};
