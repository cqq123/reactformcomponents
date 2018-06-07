import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import _ from 'lodash';

class Bar extends Component {
  componentDidMount() {
    const { label } = this.props;
    this.init();
    this.renderRects();
    if (label) {
      this.renderTexts();
    }
  }
  componentDidUpdate(prevProps) {
    const { x, y, data } = this.props;
    if (
      x.domain() !== prevProps.x.domain() ||
      x.rangeRound() !== prevProps.x.rangeRound() ||
      y.domain() !== prevProps.y.domain() ||
      y.range() !== prevProps.y.range() ||
      !_.isEqual(data, prevProps.data)
    ) {
      this.update();
    }
  }
  init() {
    this.selection = d3.select(this.g);
  }
  update() {
    this.selection.selectAll('rect')
      .remove()
      .exit();
    this.renderRects();
  }
  renderRects() {
    const { svgHeight, y, x, data, dataKey, color } = this.props;
    this.selection.selectAll('rect')
      .data(data.map(a => a[dataKey]))
      .enter()
      .append('rect')
      .attr('width', x.bandwidth())
      .attr('x', (d, i) => x.step() * i)
      .attr('height', svgHeight - y(0))
      .attr('y', y(0))
      .transition()
      .duration(1000)
      .attr('y', d => y(d))
      .attr('height', d => svgHeight - y(d))
      .attr('fill', color);
  }
  renderTexts() {
    const { data, dataKey, x, y, labelPosition } = this.props;
    this.selection.selectAll('text')
      .data(data.map(a => a[dataKey]))
      .enter()
      .append('text')
      .attr('transform', `translate(${x.bandwidth() / 2}, ${labelPosition === 'top' ? -5 : 20})`)
      .attr('x', (d, i) => x.step() * i)
      .attr('y', d => y(d))
      .text(d => d);
  }
  render() {
    const { className, x } = this.props;
    return (
      <g ref={(g) => { this.g = g; }} className={className} transform={`translate(${x.step() * x.paddingOuter()}, 0)`} />
    );
  }
}

Bar.defaultProps = {
  label: false,
  labelPosition: 'top',
  color: '#000',
};

Bar.propTypes = {
  x: PropTypes.func,
  y: PropTypes.func,
  dataKey: PropTypes.string.isRequired,
  data: PropTypes.array,
  svgHeight: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string,
  label: PropTypes.bool,
  labelPosition: PropTypes.oneOf(['top', 'bottom']),
  color: PropTypes.string,
};
export default Bar;

