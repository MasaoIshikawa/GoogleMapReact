import _ from 'lodash'
import {handleAction, handleActions} from 'redux-actions'
import {fromJS, OrderedSet, Map, Set} from 'immutable'
import {createAsyncHandlers} from '../actions'

const initialState = Map({
  branches: Map()
})

const FETCH_BRANCHES = createAsyncHandlers('FETCH_BRANCHES', {
  success(state, action) {
  	const {branches} = action.payload;
    return state.set('branches', fromJS(branches));
  }
})

export default handleActions({
  ...FETCH_BRANCHES,
}, initialState)
