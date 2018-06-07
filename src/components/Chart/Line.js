import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Line extends Component {
  componentDidMount() {
    this.init();
    this.renderLine();
  }
  componentDidUpdate(prevProps) {
    const { x, y, data, dataKey } = this.props;
    if (
      x.domain() !== prevProps.x.domain() ||
      x.range() !== prevProps.x.range() ||
      y.domain() !== prevProps.y.domain() ||
      y.range() !== prevProps.y.range() ||
      !_.isEqual(data, prevProps.data) ||
      dataKey !== prevProps.dataKey
    ) {
      this.renderLine();
    }
  }
  get line() {
    const { x, y, dataKey, curve } = this.props;
    const lineConstructor = d3.line()
      .x(d => x(d.label))
      .y(d => y(d[dataKey]));
    if (curve) {
      lineConstructor.curve(d3.curveCardinal.tension(0.5));
    }
    return lineConstructor;
  }
  init() {
    this.selection = d3.select(this.g)
      .append('path');
  }
  renderLine() {
    const { data, className } = this.props;
    this.selection
      .datum(data)
      .transition()
      .duration(500)
      .attr('class', className)
      .attr('d', this.line);
  }
  render() {
    const { x } = this.props;
    return (
      <g ref={(g) => { this.g = g; }} transform={`translate(${x.bandwidth() / 2}, 0)`} />
    );
  }
}

Line.defaultProps = {
  curve: false,
};
Line.propTypes = {
  className: PropTypes.string,
  x: PropTypes.func,
  y: PropTypes.func,
  data: PropTypes.array,
  dataKey: PropTypes.string.isRequired,
  curve: PropTypes.bool,
};

export default Line;
