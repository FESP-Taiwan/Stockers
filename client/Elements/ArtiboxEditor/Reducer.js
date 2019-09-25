// @flow

export function initializer(initialArg = { blocks: [] }) {
  return {
    ...initialArg,
    blocks: [
      ...initialArg.blocks.map(block => ({
        ...block,
        focus: false,
      })),
    ],
  };
}

export default function reducer(state, action) {
  switch (action.type) {

  }
}
