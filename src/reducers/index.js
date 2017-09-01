import {combineReducers} from 'redux';

import mode from './mode';
import codelines from './codelines';
import unittests from './unittests';
import programmingLang from './programmingLang';
import executableCode from './executableCode';
import turtle from './turtle';
import vartests from './vartests';

export default combineReducers({
  mode,
  codelines,
  unittests,
  programmingLang,
  executableCode,
  turtle,
  vartests
});
