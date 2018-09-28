import './assets/styles/index.less';

import 'd3';

import PaperFlowLink from '@engine';

import config from './config';
import data from './data';

const paperFlowLink = new PaperFlowLink(config, data);

console.log(paperFlowLink);

/**
 * MAXI TODO
 *
 * * refactor styles to be more easy to theme everything
 * * refactor engine as an object that does things
 * * describe data better than that !
 *
 */
