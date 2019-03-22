export function addSystem (system) {
  return {
    type: 'ADD_SYSTEM',

    ...{ a1, b1, t1, a2, b2, t2, x, y } = system,
  }
}

export function removeSystem (index) {
  return {
    type: 'REMOVE_SYSTEM',
    index,
  }
}