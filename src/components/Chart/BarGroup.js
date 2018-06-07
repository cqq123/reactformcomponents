import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import _ from 'lodash';

class BarGroup extends Component {
  componentDidMount() {
    this.renderGroup();
    this.renderRect();
    const { label } = this.props;
    if (label) {
      this.renderText();
    }
  }
  componentDidUpdate(prevProps) {
    const { x, paddingInner, paddingOuter, data, label } = this.props;
    if (
      x.domain() !== prevProps.x.domain() ||
      x.range() !== prevProps.x.range() ||
      paddingOuter !== prevProps.paddingOuter ||
      paddingInner !== prevProps.paddingInner ||
      !_.isEqual(data, prevProps.data)
    ) {
      this.update();
      this.renderGroup();
      this.renderRect();
      if (label) {
        this.renderText();
      }
    }
  }
  get scale() {
    const { dataKeys, x, paddingOuter, paddingInner } = this.props;
    return d3.scaleBand()
      .domain(dataKeys)
      .range([0, x.bandwidth()])
      .paddingInner(paddingInner)
      .paddingOuter(paddingOuter);
  }
  update() {
    d3.select(this.g)
      .selectAll('g')
      .remove()
      .exit();
  }
  renderGroup() {
    const { data, x } = this.props;
    this.groups = d3.select(this.g)
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(${x.step() * i + (x.step() * x.paddingOuter() / 2)}, 0)`);
  }
  renderRect() {
    const { dataKeys, svgHeight, y, colors } = this.props;
    this.groups
      .selectAll('rect')
      .data(d => Object.values(_.pick(d, dataKeys)))
      .enter()
      .append('rect')
      .attr('x', (d, i) => this.scale.step() * i)
      .attr('width', this.scale.bandwidth())
      .attr('y', y(0))
      .attr('height', svgHeight - y(0))
      .transition()
      .duration(1000)
      .attr('y', d => y(d))
      .attr('height', d => svgHeight - y(d))
      .attr('fill', colors ? (d, i) => colors[i] : '#000');
  }
  renderText() {
    const { dataKeys, y } = this.props;
    this.groups
      .selectAll('text')
      .data(d => Object.values(_.pick(d, dataKeys)))
      .enter()
      .append('text')
      .attr('x', (d, idx) => this.scale.step() * idx)
      .attr('y', d => y(d))
      .attr('transform', `translate(${this.scale.bandwidth() / 2}, -5)`)
      .text(d => d);
  }
  render() {
    const { className, x } = this.props;
    return (
      <g ref={(g) => { this.g = g; }} className={className} transform={`translate(${x.step() * x.paddingOuter()}, 0)`} />
    );
  }
}
BarGroup.defaultProps = {
  paddingOuter: 0.1,
  paddingInner: 0.2,
  label: false,
};
BarGroup.propTypes = {
  x: PropTypes.func,
  y: PropTypes.func,
  svgHeight: PropTypes.number,
  className: PropTypes.string,
  data: PropTypes.array,
  dataKeys: PropTypes.array.isRequired,
  paddingInner: PropTypes.number,
  paddingOuter: PropTypes.number,
  colors: PropTypes.array,
  label: PropTypes.bool,
};
export default BarGroup;
