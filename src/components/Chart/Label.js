import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

class Label extends Component {
  componentDidMount() {
    this.init();
    this.renderLabel();
  }
  componentDidUpdate(prevProps) {
    const { data, x, y, position } = this.props;
    if (
      !_.isEqual(data, prevProps.data) ||
      x.domain() !== prevProps.x.domain() ||
      x.range() !== prevProps.x.range() ||
      y.domain() !== prevProps.y.domain() ||
      y.range() !== prevProps.y.range() ||
      position !== prevProps.position
    ) {
      this.update();
    }
  }
  init() {
    this.selection = d3.select(this.g);
  }
  update() {
    this.selection.selectAll('text')
      .remove()
      .exit();
    this.renderLabel();
  }
  renderLabel() {
    const { data, dataKey, x, y, position } = this.props;
    this.selection
      .selectAll('text')
      .data(data.map(a => a[dataKey]))
      .enter()
      .append('text')
      .attr('x', (d, i) => x.step() * i)
      .attr('y', d => y(d))
      .text(d => d)
      .attr('transform', `translate(${x.step() * x.paddingOuter() + x.bandwidth() / 2}, ${position === 'top' ? -5 : 20})`);
  }

  render() {
    const { className } = this.props;
    return (
      <g ref={(g) => { this.g = g; }} className={className} />
    );
  }
}

Label.defaultProps = {
  position: 'top',
};
Label.propTypes = {
  className: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  data: PropTypes.array,
  x: PropTypes.func,
  y: PropTypes.func,
  position: PropTypes.oneOf(['top', 'bottom']),
};
export default Label;
