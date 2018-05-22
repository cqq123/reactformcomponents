import React, { Component } from 'react';
import style from './index.scss';

class DrawImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0,
      list: [],
      pointX: 0,
      pointY: 0,
      isDown: false,
    };
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
  }
  componentDidMount() {
    this.init();
  }

  getPointOnCanvas(x, y) {
    const canvasRect = this.canvas.getBoundingClientRect();
    return {
      x: Math.round((x - canvasRect.left) * (this.canvas.width / canvasRect.width)),
      y: Math.round((y - canvasRect.top) * (this.canvas.height / canvasRect.height)),
    };
  }
  init() {
    this.canvas.width = '600';
    this.canvas.height = '500';
    this.ctx = this.canvas.getContext('2d');
  }
  mouseDown(e) {
    const pointOnCanvas = this.getPointOnCanvas(e.pageX, e.pageY);
    this.setState({
      startX: pointOnCanvas.x,
      startY: pointOnCanvas.y,
      isDown: true,
    });
  }
  mouseUp(e) {
    const pointOnCanvas = this.getPointOnCanvas(e.pageX, e.pageY);
    const { startX, startY } = this.state;
    if (startX === pointOnCanvas.x && startY === pointOnCanvas.y) {
      return;
    }
    this.setState({
      isDown: false,
      endX: pointOnCanvas.x,
      endY: pointOnCanvas.y,
    }, () => {
      const {
        endX, endY,
      } = this.state;
      this.ctx.rect(startX, startY, Math.abs(endX - startX), Math.abs(endY - startY));
      this.ctx.strokeStyle = '#000';
      this.ctx.stroke();
    });
    this.setState(prevState => ({
      list: [
        ...prevState.list,
        {
          topLeft: `${prevState.startX}, ${prevState.startY}`,
          topRight: `${prevState.endX}, ${prevState.startY}`,
          bottomLeft: `${prevState.startX}, ${prevState.endY}`,
          bottomRight: `${prevState.endX}, ${prevState.endY}`,
        },
      ],
    }), () => {
      console.log(this.state.list, '----');
    });
  }
  mouseMove(e) {
    const { isDown, startX, startY } = this.state;
    if (isDown) {
      const pointOnCanvas = this.getPointOnCanvas(e.pageX, e.pageY);
      this.setState({
        pointX: pointOnCanvas.x,
        pointY: pointOnCanvas.y,
      });
      this.ctx.beginPath();
      this.ctx.rect(startX, startY, pointOnCanvas.x - startX, pointOnCanvas.y - startY);
      this.ctx.strokeStyle = '#0ff';
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.clearRect(startX, startY, pointOnCanvas.x - startX, pointOnCanvas.y - startY);
    }
  }
  render() {
    return (
      <div
        className={style.main}
      >
        <img className={style.img} ref={(img) => { this.img = img; }} src={require('./timg.jpg')} alt="" />
        <canvas
          className={style.canvas}
          ref={(canvas) => { this.canvas = canvas; }}
          onMouseDown={this.mouseDown}
          onMouseUp={this.mouseUp}
          onMouseMove={this.mouseMove}
        />
      </div>
    );
  }
}

export default DrawImg;
