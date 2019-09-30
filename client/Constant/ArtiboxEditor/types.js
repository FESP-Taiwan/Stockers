// @flow

export const BLOCK_TYPES = {
  LINE: Symbol('Artibox/Block/LINE'),
  QUOTE: Symbol('Artibox/Block/QUOTE'),
  TITLE: Symbol('Artibox/Block/TITLE'),
  SUBTITLE: Symbol('Artibox/Block/SUBTITLE'),
  TEXT: Symbol('Artibox/Block/TEXT'),
  HIGHLIGHT_AREA: Symbol('Artibox/Block/HIGHLIGHT_AREA'),
};

export const MARKER_TYPES = {
  HIGHTLIGHT: Symbol('Artibox/Marker/HIGHLIGHT'),
  BOLD: Symbol('Artibox/Marker/BOLD'),
  ITALIC: Symbol('Artibox/Marker/ITALIC'),
  ERASE: Symbol('Artibox/Marker/ERASE'),
};

export default null;
