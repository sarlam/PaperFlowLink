import { forEach } from 'lodash';

import Module from '@engine/modules/Module';

const builtInEvents = ['resize'];

export default class Events extends Module {
  constructor (...args) {
    super(...args);

    forEach(builtInEvents, event => {
      window.addEventListener(event, (payload) => {
        this._instance.trigger(event, payload);
      });
    });
  }
}
