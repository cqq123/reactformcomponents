export const CHANGE_SELECT_VALUE = 'select/CHANGE_SELECT_VALUE ';
export const CHANGE_CHILDREN_LIST = 'select/CHANGE_CHILDREN_LIST';

export const changeSelectValue = value => ({
  type: CHANGE_SELECT_VALUE,
  payload: value,
});

export const changeList = list => ({
  type: CHANGE_CHILDREN_LIST,
  payload: list,
});
export const fetchList = () =>
  (dispatch) => {
    console.log('xixixi');
    return fetch('https://www.reddit.com/r/reactjs.json')
      .then(res => res.json())
      .then(({ data: { children } }) => dispatch(changeList(children)));
  };
