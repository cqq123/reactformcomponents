import * as d3 from 'd3';
import React, { Component } from 'react';
import style from './BarChart.scss';

class BarChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [12, 25, 23, 23, 24, 55, 25, 30],
      width: 500,
      height: 500,
      svgPaddingTop: 50,
      svgPaddingLeft: 50,
      svgPaddingBottom: 30,
      svgPaddingRight: 10,
    };
  }

  componentDidMount() {
    this.renderGroup();
    this.renderRect();
    this.renderText();
    this.renderAxisBottom();
    this.renderAxisLeft();
    this.renderLine();
    this.renderAreas();
    this.renderPie();
  }
  componentDidUpdate(prevState) {
    if (prevState.data !== this.state.data) {
      this.g.selectAll('g')
        .remove();
      this.renderRect();
      this.renderText();
      this.renderAxisBottom();
      this.renderAxisLeft();
      this.renderPie();
    }
  }
  get svgWidth() {
    const { width, svgPaddingLeft, svgPaddingRight } = this.state;
    return width - svgPaddingLeft - svgPaddingRight;
  }
  get svgHeight() {
    const { height, svgPaddingBottom, svgPaddingTop } = this.state;
    return height - svgPaddingBottom - svgPaddingTop;
  }
  get scaleY() {
    const { data } = this.state;
    return d3.scaleLinear()
      .domain([0, d3.max(data)])
      .range([this.svgHeight, 0]);
  }
  get scaleX() {
    return d3.scaleBand()
      .domain([1, 2, 3, 4, 5, 6, 7, 8])
      .rangeRound([0, this.svgWidth])
      .paddingInner(0.2)
      .paddingOuter(0.1);
  }
  renderGroup() {
    const { svgPaddingLeft, svgPaddingTop } = this.state;
    this.g = d3.select(this.svg)
      .append('g')
      .attr('transform', `translate(${svgPaddingLeft}, ${svgPaddingTop})`);
  }
  renderRect() {
    const {
      data,
    } = this.state;
    this.g.append('g')
      .attr('class', style.rectGroup)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('transform', `translate(${this.scaleX.step() * this.scaleX.paddingOuter()}, 0)`)
      .attr('width', this.scaleX.bandwidth())
      .attr('x', (d, i) => this.scaleX.step() * i)
      .attr('class', `${style.rect}`)
      .attr('height', this.svgHeight - this.scaleY(0))
      .attr('y', this.scaleY(0))
      .transition()
      .duration(1000)
      .attr('y', d => this.scaleY(d))
      .attr('height', d => this.svgHeight - this.scaleY(d));
  }
  renderText() {
    const { data } = this.state;
    this.g.append('g')
      .attr('class', style.textGroup)
      .attr('transform', `translate(${this.scaleX.step() * this.scaleX.paddingOuter()}, 0)`)
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', (d, i) => this.scaleX.step() * i)
      .attr('y', d => this.scaleY(d))
      .text(d => d)
      .attr('transform', `translate(${this.scaleX.bandwidth() / 2}, -5)`)
      .attr('class', style.text);
  }
  renderAxisBottom() {
    this.xAxis = d3.axisBottom(this.scaleX)
      .tickValues([1, 2, 3, 4, 5, 6, 7, 8]);
    this.g
      .append('g')
      .attr('transform', `translate(0, ${this.svgHeight})`)
      .call(this.xAxis);
  }
  renderAxisLeft() {
    this.yAxis = d3.axisLeft(this.scaleY);
    this.g
      .append('g')
      .call(this.yAxis);
  }
  renderLine() {
    this.line = d3.line()
      .x((d, i) => this.scaleX(i + 1))
      .y(d => this.scaleY(d))
      .curve(d3.curveNatural)
    this.g
      .append('g')
      .attr('transform', `translate(${this.scaleX.bandwidth() / 2}, 0)`)
      .append('path')
      .attr('class', style.line)
      .attr('d', this.line(this.state.data));
  }
  renderAreas() {
    this.areas = d3.area()
      .x((d, i) => this.scaleX(i + 1))
      .y1(d => this.scaleY(d))
      .y0(this.scaleY(0))
      .curve(d3.curveBasis);
    this.g.append('g')
      .attr('transform', `translate(${this.scaleX.bandwidth() / 2}, 0)`)
      .append('path')
      .datum(this.state.data)
      .attr('fill', 'steelblue')
      .attr('d', this.areas);
  }
  midAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }
  renderPie() {
    const color = d3.scaleOrdinal(['#00abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00', '#aabbcc']);
    this.pie = d3.pie()
      .sort(null)
      .padAngle(0);
    this.arc = d3.arc()
      .innerRadius(50)
      .outerRadius(100);
    this.arc2 = d3.arc()
      .outerRadius(150)
      .innerRadius(100);
    this.g.append('g')
      .attr('transform', 'translate(200, 100)')
      .selectAll('path')
      .data(this.pie(this.state.data))
      .enter()
      .append('path')
      .transition()
      .delay((d, i) => i * 500)
      .duration(500)
      .attrTween('fill', (d, idx) => {
        const i = d3.interpolateRgb('#fff', color(idx));
        return t => i(t);
      })
      .attrTween('d', (d) => {
        const i = d3.interpolate(d.startAngle, d.endAngle);
        return (t) => {
          d.endAngle = i(t);
          return this.arc(d);
        };
      });
    this.g.append('g')
      .attr('transform', 'translate(200, 100)')
      .selectAll('text')
      .data(this.pie(this.state.data))
      .enter()
      .append('text')
      .attr('transform', (d) => {
        const pos = this.arc2.centroid(d);
        pos[0] += 100 / 2 * (this.midAngle(d) < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .text((d, i) => `${i}12312312312`)
      .attr('text-anchor', d => this.midAngle(d) < Math.PI ? 'start' : 'end');
    this.g.append('g')
      .attr('transform', 'translate(200, 100)')
      .selectAll('polyline')
      .data(this.pie(this.state.data))
      .enter()
      .append('polyline')
      .transition()
      .duration(500)
      .attr('points', (d) => {
        const point1 = this.arc.centroid(d);
        const point2 = this.arc2.centroid(d);
        const point3 = this.arc2.centroid(d);
        point3[0] += 100 / 2 * (this.midAngle(d) < Math.PI ? 1 : -1);
        return [...point1, ...point2, ...point3];
      })
      .attr('fill', 'none')
      .attr('stroke', (d, i) => color(i));
  }
  render() {
    const { width, height } = this.state;
    return (
      <svg ref={(svg) => { this.svg = svg; }} width={width} height={height} className={style.main} />
    );
  }
}

export default BarChart;
