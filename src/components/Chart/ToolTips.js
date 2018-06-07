import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';
import style from './index.scss';

class ToolTips extends Component {
  componentDidMount() {
    this.renderGroup();
    this.renderTips();
  }
  renderGroup() {
    const { data, x, svgHeight } = this.props;
    d3.select(this.g)
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .append('rect')
      .attr('x', (d, i) => x.step() * i)
      .attr('width', x.bandwidth())
      .attr('y', 0)
      .attr('height', svgHeight)
      .on('mouseover', (d) => {
        this.tips.transition().duration(200)
          .style('opacity', 1);
        this.tips.html('aaaa')
          .style('left', `${d3.event.pageX}px`)
          .style('top', `${d3.event.pageY}px`);
      })
      .on('mouseout', () => {
        this.tips.transition()
          .duration(200)
          .style('opacity', 0);
      });
  }
  renderTips() {
    this.tips = d3.select('body')
      .append('div')
      .attr('class', style.toolTips)
      .style('opacity', 0);
  }
  render() {
    const { x, className } = this.props;
    return (
      <g className={className} ref={(g) => { this.g = g; }} transform={`translate(${x.step() * x.paddingOuter()}, 0)`} />
    );
  }
}
ToolTips.propTypes = {
  x: PropTypes.func,
  data: PropTypes.array,
  svgHeight: PropTypes.number,
  className: PropTypes.string,
};
export default ToolTips;

