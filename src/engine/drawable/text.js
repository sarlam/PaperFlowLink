import { isEmpty, isUndefined } from 'lodash';

const setSize = ($elems, sizes) => {
  if (!isEmpty(sizes)) {
    const { WIDTH, HEIGHT } = sizes;
    if (!isUndefined(WIDTH)) $elems.style('width', `${WIDTH}px`);
    if (!isUndefined(HEIGHT)) $elems.style('height', `${HEIGHT}px`);
  }
};

const setContent = ($elems, isHTML) => {
  if (isHTML) {
    // @todo sanitize
    $elems.html(d => d._content);
  } else {
    $elems.text((d) => d._content);
  }
};

export default {
  drawFunction: ($elems, { sizes, isHTML }) => {
    $elems
      .style('left', d => `${d.x}vw`)
      .style('top', d => `${d.y}vh`);

    setContent($elems, isHTML);

    setSize($elems, sizes);
  },
  elemType: 'span',
  wrapperClass: 'text-container'
};
