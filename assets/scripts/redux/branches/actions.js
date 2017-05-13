import {createAsyncAction} from '../actions'
import {fetch} from '../../core/http'
import {ERROR} from '../notifications/actions'

const fetchBranches = createAsyncAction('FETCH_BRANCHES', function() {
  let url = '/api/branches';//'http://www.message.com/api/'//`/api/branches1`
  // let url = 'http://country.io/continent.json';
  return (dispatch) => {
    return fetch(url, {})
      .catch((err) => {
        dispatch(ERROR(...err.errors));//
        dispatch(this.failed(err));
        throw err
      })
      .then((res) => {
        const out = {branches: res}
        dispatch(this.success(out))
        return res
      })      
  }
})


export default {
  ...fetchBranches
}

