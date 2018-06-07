import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Area extends Component {
  componentDidMount() {
    this.init();
    this.renderArea();
  }
  componentDidUpdate(prevProps) {
    const { x, y, dataKey, data } = this.props;
    if (
      x.domain() !== prevProps.x.domain() ||
      x.range() !== prevProps.x.range() ||
      y.domain() !== prevProps.y.domain() ||
      y.range() !== prevProps.y.range() ||
      dataKey !== prevProps.dataKey ||
      !_.isEqual(data, prevProps.data)
    ) {
      this.renderArea();
    }
  }
  get area() {
    const { x, y, dataKey, curve } = this.props;
    const areaConstructor = d3.area()
      .x(d => x(d.label))
      .y0(y(0))
      .y1(d => y(d[dataKey]));
    if (curve) {
      return areaConstructor.curve(d3.curveBasis);
    }
    return areaConstructor;
  }
  init() {
    this.selection = d3.select(this.g)
      .append('path');
  }
  renderArea() {
    const { data, className } = this.props;
    this.selection
      .datum(data)
      .transition()
      .duration(500)
      .attr('class', className)
      .attr('d', this.area);
  }
  render() {
    const { x } = this.props;
    return (
      <g ref={(g) => { this.g = g; }} transform={`translate(${x.bandwidth() / 2}, 0)`} />
    );
  }
}

Area.defaultProps = {
  curve: false,
};
Area.propTypes = {
  x: PropTypes.func,
  y: PropTypes.func,
  dataKey: PropTypes.string.isRequired,
  curve: PropTypes.bool,
  data: PropTypes.array,
  className: PropTypes.string,
};

export default Area;
