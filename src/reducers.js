import { CHANGE_SELECT_VALUE, CHANGE_CHILDREN_LIST } from './actions';

const initState = {
  flag: false,
  selectList: [
    { label: '海曙区', id: '33001' },
    { label: '鄞州区', id: '33002' },
    { label: '江北区', id: '33003' },
  ],
  selectValue: '',
  childrenList: [],
};
export const reducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_SELECT_VALUE:
      return {
        ...state,
        selectValue: action.payload,
      };
    case CHANGE_CHILDREN_LIST:
      return {
        ...state,
        childrenList: action.payload,
      };
    default: return state;
  }
};
