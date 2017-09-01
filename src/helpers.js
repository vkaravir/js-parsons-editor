const parseVarValues = (variables) => {
  return Object.entries(variables).map(([name, value]) => {
    let type = typeof value;
    if (type === 'number') {
      if ('' + parseInt(value, 10) == value) {
        type = 'int';
      } else {
        type = 'decimal';
      }
    } else if (type === 'boolean') {
      // nothing to do
    } else { // force everything into a string
      type = 'string';
    }
    return {
      name,
      value,
      type: type || 'string'
    };
  });
};

const parseVarTests = (varChecks) => {
  return varChecks.map((check) => {
    return {
      ...check,
      variables: parseVarValues(check.variables)
    };
  });
};

export const parseInitialConfig = (config) => {
  const props = {
    ...config,
    vartests: config.vartests ? parseVarTests(config.vartests) : undefined,
    codelines: Array.isArray(config.codelines) ? config.codelines.join('\n') : config.codelines
  };
  delete props.element;
  return props;
};
