'use strict';

function flattenStyle(style) {
  if (style == null || typeof style !== 'object') {
    return {};
  }
  if (!Array.isArray(style)) {
    return { ...style };
  }
  return style.reduce((acc, piece) => {
    if (piece == null || typeof piece !== 'object') {
      return acc;
    }
    return { ...acc, ...flattenStyle(piece) };
  }, {});
}

function processColor(color) {
  if (typeof color === 'number') {
    return color >>> 0;
  }
  if (typeof color === 'string') {
    const s = color.trim();
    if (s.startsWith('#')) {
      let h = s.slice(1);
      if (h.length === 3) {
        h = h
          .split('')
          .map((c) => c + c)
          .join('');
      }
      if (h.length === 8) {
        h = h.slice(0, 6);
      }
      if (h.length !== 6) {
        return null;
      }
      const n = parseInt(h, 16);
      if (Number.isNaN(n)) {
        return null;
      }
      return (0xff000000 | n) >>> 0;
    }
    if (s === 'red' || s === 'rgb(255, 0, 0)') {
      return 0xffff0000 >>> 0;
    }
  }
  return null;
}

module.exports = {
  processColor,
  StyleSheet: {
    flatten: flattenStyle,
  },
};
