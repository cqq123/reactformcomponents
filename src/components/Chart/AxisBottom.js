import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';

class AxisBottom extends Component {
  componentDidMount() {
    this.renderAxis();
  }
  componentDidUpdate(prevProps) {
    const { x } = this.props;
    if (prevProps.x.domain() !== x.domain() || prevProps.x.rangeRound() !== x.rangeRound()) {
      this.renderAxis();
    }
  }
  get xAxis() {
    const { x, y, type } = this.props;
    if (type === 'y') {
      return d3.axisBottom(y);
    }
    return d3.axisBottom(x);
  }
  renderAxis() {
    d3.select(this.g)
      .transition()
      .duration(500)
      .call(this.xAxis);
  }
  render() {
    const { svgHeight, className } = this.props;
    return (
      <g ref={(g) => { this.g = g; }} transform={`translate(0, ${svgHeight})`} className={className} />
    );
  }
}

AxisBottom.defaultProps = {
  type: 'x',
};
AxisBottom.propTypes = {
  x: PropTypes.func,
  y: PropTypes.func,
  svgHeight: PropTypes.number,
  className: PropTypes.string,
  type: PropTypes.string,
};
export default AxisBottom;
