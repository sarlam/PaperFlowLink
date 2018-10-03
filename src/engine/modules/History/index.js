import * as d3 from 'd3';
import { find, remove, isUndefined, map } from 'lodash';

import Module from '../Module';

export default class History extends Module {
  constructor (...args) {
    super(...args);
    this._history = [];
  }

  afterInit () {
    const history = this;
    map(this._instance._layers, _layer => {
      _layer._entering
        .style('cursor', 'pointer')
        .classed('no-select', true)
        .on('click', function (e) {
          const _e = history.find(e);
          if (isUndefined(_e)) {
            history.add(e);
            d3.select(this).classed('in-history', true);
          } else {
            history.remove(_e);
            d3.select(this).classed('in-history', false);
          }
        });
    });
  }

  find (e) {
    return find(this._history, e);
  }

  add (e) {
    this._history.push(e);
  }

  remove (e) {
    remove(this._history, e);
  }
}
