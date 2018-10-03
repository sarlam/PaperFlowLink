import Module from '../Module';
import { isUndefined } from 'lodash';

export default class Links extends Module {
  constructor (...args) {
    super(...args);
    if (isUndefined(this._instance._loadedModules['history'])) throw new Error('Links need History to work');

    this.$root = this._instance.$root.append('svg');
    this.$root.attr('id', 'links-svg');

    this.initializeData();

    this._historyModule = this._instance._loadedModules['history'];
  }

  onResize () {
    this.initializeData();
    this.updateData();
    this.drawLinks();
  }

  initializeData () {
    this.windowX = window.innerWidth;
    this.windowY = window.innerHeight;
    this._lines = [];
    this._nodes = [];
  }

  onHistoryUpdated () {
    this.updateData();
    this.drawLinks();
  }

  updateData () {
    this._nodes = this._historyModule._history.map(h => {
      return this.nodesExtractor(h);
    });

    this._lines = this._nodes.reduce((acc, node, key) => {
      return this.linesReducer(acc, node, key);
    }, []);
  }

  nodesExtractor (h) {
    return {
      x: this.getXRatio(h.x),
      y: this.getYRatio(h.y)
    };
  }

  linesReducer (acc, node, key) {
    const nodesLength = this._nodes.length;

    if (key !== 0) {
      acc[key - 1].x2 = node.x;
      acc[key - 1].y2 = node.y;
    }

    if (key < nodesLength - 1) {
      acc.push({ x1: node.x, y1: node.y });
    }

    return acc;
  }

  drawLinks () {
    const $circles = this.$root.selectAll('circle').data(this._nodes);

    $circles.enter().append('circle')
      .attr('r', 20)
      .merge($circles)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);

    $circles.exit().remove();

    const $lines = this.$root.selectAll('line').data(this._lines);

    $lines.enter().append('line')
      .attr('style', 'stroke:rgb(255,0,0);stroke-width:2')
      .merge($lines)
      .attr('x1', d => d.x1)
      .attr('y1', d => d.y1)
      .attr('x2', d => d.x2)
      .attr('y2', d => d.y2);

    $lines.exit().remove();
  }

  getXRatio (x) {
    return (x / 100) * this.windowX;
  }

  getYRatio (y) {
    return (y / 100) * this.windowY;
  }
}
