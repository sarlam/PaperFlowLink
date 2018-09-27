import './assets/styles/index.less';

import 'jquery';
import 'd3';

import PaperFlowLink from './engine';

import config from './config';

const data = {};

new PaperFlowLink(config, data);

/**
 * MAXI TODO
 *
 * * refactor styles to be more easy to theme everything
 * * refactor engine as an object that does things
 * * describe data better than that !
 *
 */
