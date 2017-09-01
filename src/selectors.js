import {createSelector} from 'reselect';
const getMode = (state) => state.mode;
const getCodelines = (state) => state.codelines;
const getProgrammingLang = (state) => state.programmingLang;
const getExecutableCode = (state) => state.executableCode;
const getTurtleConfig = (state) => state.turtle;
const getUnittestConfig = (state) => state.unittests;
const getVartestConfig = (state) => state.vartests;

const createVartestConfig = createSelector(
  [getVartestConfig],
  (varChecks) => {
    return varChecks.map((check) => {
      return {
        ...check,
        variables: check.variables.reduce((memo, variable) => {
          memo[variable.name] = variable.value;
          return memo;
        }, {})
      };
    });
  }
);

const createExecutableConfig = createSelector(
  [getProgrammingLang, getExecutableCode],
  (lang, executableCode) => {
    const res = { programmingLang: lang };
    if (lang !== 'python') { res.executableCode = executableCode; }
    return res;
  }
);

const createEditorConfig = createSelector(
  [getMode, getTurtleConfig, getUnittestConfig, createVartestConfig],
  (mode, turtle, unittests, vartests) => {
    const config = { mode: mode };
    if (mode === 'unit') {
      config.unittests = unittests;
    } else if (mode === 'turtle') {
      Object.assign(config, turtle);
    } else if (mode === 'var') {
      config.vartests = vartests;
    }
    return config;
  }
);

export const getConfiguration = createSelector(
  [getCodelines, createEditorConfig, createExecutableConfig],
  (codelines, editor, executable) => {
    return Object.assign({codelines: codelines}, editor, executable);
  }
);
