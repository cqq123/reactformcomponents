import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cn from 'classnames';
import style from './Carousel.scss';

class Carousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      direction: 'next',
    };
  }
  componentDidMount() {
    const { autoplay } = this.props;
    if (autoplay) {
      this.auto();
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  get prev() {
    const { items } = this.props;
    const { index } = this.state;
    if (index === 0) {
      return items.length - 1;
    }
    return index - 1;
  }
  auto() {
    this.interval = setInterval(() => {
      this.changeNext();
    }, 1000);
  }
  changeAuto = () => {
    clearInterval(this.interval);
  }
  changePrev = () => {
    const { items } = this.props;
    this.setState(prevState => ({
      index: prevState.index === 0 ? items.length - 1 : prevState.index - 1,
      direction: 'prev',
    }));
  }
  changeNext = () => {
    const { items } = this.props;
    this.setState(prevState => ({
      index: prevState.index === items.length - 1 ? 0 : prevState.index + 1,
      direction: 'next',
    }));
  }
  render() {
    const {
      items, width, height, duration, type, className,
    } = this.props;
    const { index, direction } = this.state;
    return (
      <div
        className={cn(style.main, className)}
        style={{ width }}
      >
        <div className={style.slideView} style={{ width, height }}>
          <div className={style.container} style={{ width: width * items.length }}>
            {
              items.map((item, idx) => (
                <div
                  key={item.value}
                  className={style.imgDiv}
                  style={{
                    width,
                    height,
                    position: 'relative',
                    left: -width * idx,
                    transform: `translateX(${width}px)`,
                    ...(index === idx && { transition: `transform ${duration}ms`, transform: 'translateX(0)' }),
                    ...(direction === 'next' && this.prev === idx && { transform: `translateX(${-width}px)`, transition: `transform ${duration}ms` }),
                    ...(direction === 'next' && !_.includes([this.prev, index], idx) && {}),
                    ...(direction === 'prev' && this.prev === idx && { transform: `translateX(${-width}px)` }),
                    ...(direction === 'prev' && !_.includes([this.prev, index], idx) && { transition: `transform ${duration}ms` }),
                  }}
                >
                  {
                    type === 'img' && (
                      <img src={item.content} alt={item.value} className={style.img} />
                    )
                  }
                  {
                    type === 'component' && item.content
                  }
                </div>
              ))
            }
          </div>
        </div>
        <div className={style.btnContainer}>
          <span
            className={cn(style.buttonNext, style.button)}
            onClick={this.changeNext}
          />
          <span
            className={cn(style.buttonPrev, style.button)}
            onClick={this.changePrev}
          />
        </div>
      </div>
    );
  }
}
Carousel.defaultProps = {
  width: 500,
  height: 300,
  duration: 500,
  type: 'img',
  autoplay: false,
};
Carousel.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({
    content: PropTypes.any,
    value: PropTypes.string,
  })).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  duration: PropTypes.number,
  type: PropTypes.oneOf(['img', 'component']),
  autoplay: PropTypes.bool,
};
export default Carousel;
