import React, { Component } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

class Pie extends Component {
  componentDidMount() {
    const { label } = this.props;
    this.init();
    this.renderPie();
    if (label === 'inner') {
      this.renderLabel();
    }
    if (label === 'outer') {
      this.renderPolylineLabel();
    }
  }
  componentDidUpdate(prevProps) {
    const { data, label } = this.props;
    if (!_.isEqual(data, prevProps)) {
      this.update();
      this.renderPie();
      if (label === 'inner') {
        this.renderLabel();
      }
      if (label === 'outer') {
        this.renderPolylineLabel();
      }
    }
  }
  get outerRadius() {
    const { outerRadius, svgHeight, svgWidth } = this.props;
    if (outerRadius === undefined) {
      return d3.max([svgWidth, svgHeight]) / 2;
    }
    return outerRadius;
  }
  midAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }
  init() {
    const { innerRadius, colors } = this.props;
    this.pie = d3.pie()
      .sort(null)
      .padAngle(0);
    this.arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(this.outerRadius);
    this.arc1 = d3.arc()
      .innerRadius(this.outerRadius)
      .outerRadius(this.outerRadius);
    this.arcLabel = d3.arc()
      .innerRadius(this.outerRadius)
      .outerRadius(this.outerRadius + 20);
    this.color = d3.scaleOrdinal(colors);
    this.selection = d3.select(this.g);
  }

  update() {
    this.selection.selectAll('.pie')
      .remove()
      .exit();
    this.selection.selectAll('.label')
      .remove()
      .exit();
    this.selection.selectAll('.polyline')
      .remove()
      .exit();
  }

  renderPie() {
    const { data, dataKey, innerRadius } = this.props;
    const outerRadius = this.outerRadius;
    const path = this.selection
      .append('g')
      .attr('class', 'pie')
      .selectAll('path')
      .data(this.pie(data.map(a => a[dataKey])))
      .enter()
      .append('path');
    path.transition()
      .duration(500)
      .attr('fill', (d, i) => this.color(i))
      .attr('stroke', '#fff')
      .attrTween('d', (d) => {
        const i = d3.interpolate(d.startAngle, d.endAngle);
        return (t) => {
          d.endAngle = i(t);
          return this.arc(d);
        };
      });
    path.on('mouseenter', function (d) {
      const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius + 10)
        .endAngle(d.endAngle)
        .startAngle(d.startAngle);
      d3.select(this)
        .attr('stroke-width', 3)
        .attr('d', arc);
    })
      .on('mouseout', function (d) {
        const arc = d3.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);
        d3.select(this)
          .attr('stroke-width', 1)
          .attr('d', arc(d))
          .style('z-index', 1);
      });
  }
  renderLabel() {
    const { data, dataKey } = this.props;
    this.selection
      .append('g')
      .attr('class', 'label')
      .selectAll('text')
      .data(this.pie(data.map(a => a[dataKey])))
      .enter()
      .append('text')
      .attr('transform', d => `translate(${this.arc.centroid(d)})`)
      .text(d => d.value)
      .attr('text-anchor', d => (this.midAngle(d) < Math.PI ? 'start' : 'end'));
  }
  renderPolylineLabel() {
    const { data, dataKey } = this.props;
    this.selection
      .append('g')
      .attr('class', 'polyline')
      .selectAll('polyline')
      .data(this.pie(data.map(a => a[dataKey])))
      .enter()
      .append('polyline')
      .attr('points', (d) => {
        const point1 = this.arc1.centroid(d);
        const point2 = this.arcLabel.centroid(d);
        const point3 = this.arcLabel.centroid(d);
        point3[0] += this.outerRadius / 2 * (this.midAngle(d) < Math.PI ? 1 : -1);
        return [...point1, ...point2, ...point3];
      })
      .attr('fill', 'none')
      .attr('stroke', (d, i) => this.color(i));
    this.selection
      .append('g')
      .attr('class', 'label')
      .selectAll('text')
      .data(this.pie(data.map(a => a[dataKey])))
      .enter()
      .append('text')
      .attr('transform', (d) => {
        const point = this.arcLabel.centroid(d);
        point[0] += this.outerRadius / 2 * (this.midAngle(d) < Math.PI ? 1 : -1);
        return `translate(${point})`;
      })
      .text(d => d.value)
      .attr('text-anchor', d => (this.midAngle(d) < Math.PI ? 'start' : 'end'))
      .attr('dominant-baseline', 'middle');
  }
  render() {
    const { svgHeight, svgWidth } = this.props;
    return (
      <g ref={(g) => { this.g = g; }} transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`} />
    );
  }
}

Pie.defaultProps = {
  innerRadius: 0,
  label: 'none',
  colors: ['#00abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00', '#aabbcc'],
};

Pie.propTypes = {
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  svgHeight: PropTypes.number,
  svgWidth: PropTypes.number,
  data: PropTypes.array,
  dataKey: PropTypes.string.isRequired,
  label: PropTypes.oneOf(['none', 'inner', 'outer']),
  colors: PropTypes.array,
};
export default Pie;
