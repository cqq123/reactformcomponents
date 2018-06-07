import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class AxisLeft extends Component {
  displayName= 'aaa';
  componentDidMount() {
    this.renderAxis();
  }
  componentDidUpdate(prevProps) {
    const { y } = this.props;
    if (prevProps.y.domain() !== y.domain() || prevProps.y.range() !== y.range()) {
      this.renderAxis();
    }
  }
  get max() {
    const { dataKey, max, data } = this.props;
    if (dataKey === undefined) {
      return max;
    }
    return d3.max(data.map(a => a[dataKey]));
  }
  get yAxis() {
    const { x, y, type } = this.props;
    if (type === 'x') {
      return d3.axisLeft(x);
    }
    y.domain([0, this.max]);
    return d3.axisLeft(y);
  }
  renderAxis() {
    d3.select(this.g)
      .transition()
      .duration(500)
      .call(this.yAxis);
  }
  render() {
    const { className } = this.props;
    return (
      <g ref={(g) => { this.g = g; }} className={className} />
    );
  }
}

AxisLeft.defaultProps = {
  type: 'y',
};
AxisLeft.propTypes = {
  y: PropTypes.func,
  x: PropTypes.func,
  dataKey: PropTypes.string,
  data: PropTypes.array,
  max: PropTypes.number,
  type: PropTypes.string,
  className: PropTypes.string,
};
export default AxisLeft;

