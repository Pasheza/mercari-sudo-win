import { combineReducers } from 'redux'

import mercari from './reducer'

const bpApp = combineReducers({ mercari });
export default bpApp
