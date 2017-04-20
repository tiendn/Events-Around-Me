//import { GET_LANG_DATA, GET_COMPANY_DATA } from '../common/constants';
import { GET_QUERY_SEARCH } from '../common/constants';

export function getQuerySearch(query) {
  return {
    type: GET_QUERY_SEARCH,
    query
  };
}
