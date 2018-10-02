import * as d3 from 'd3';
import { find, remove, isUndefined } from 'lodash';

export default class History {
  constructor (PFL, config) {
    this._instance = PFL;
    this._config = config;
    this._history = [];
  }

  afterInit () {
    const history = this;
    Object.keys(this._instance._layers).map(key => {
      this._instance._layers[key]._entering
        .on('click', function (e) {
          const _e = history.find(e);
          if (isUndefined(_e)) {
            history.add(e);
            d3.select(this).style('background', 'blue');
          } else {
            history.remove(_e);
            d3.select(this).style('background', 'green');
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
