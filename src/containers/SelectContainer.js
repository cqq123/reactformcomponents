import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SelectTest from '../demo/SelectTest';
import { changeSelectValue, fetchList } from './../actions';

const mapStateToProps = (state) => {
  return {
    flag: state.flag,
    selectList: state.selectList,
    selectValue: state.selectValue,
    childrenList: state.childrenList,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     changeSelectValue: value => dispatch(changeSelectValue(value)),
//     changeList: bindActionCreators(fetchList, dispatch),
//   };
// };
const mapDispatchToProps = {
  changeSelectValue,
  changeList: fetchList,
};
export default connect(mapStateToProps, mapDispatchToProps)(SelectTest);
