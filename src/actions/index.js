let nextId = 0;

export function addSystem (system) {
  return {
    type: 'ADD_SYSTEM',
    key: nextId++,

    a1: +system.a1,
    b1: +system.b1,
    t1: +system.t1,
    a2: +system.a2,
    b2: +system.b2,
    t2: +system.t2,

    x: system.x,
    y: system.y,
  }
}