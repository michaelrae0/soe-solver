const log = (state = [], action) => {

  switch (action.type) {
    case 'ADD_SYSTEM':
      return [
        ...state,
        {
          id: action.id,

          a1: action.a1,
          b1: action.b1,
          t1: action.t1,
          a2: action.a2,
          b2: action.b2,
          t2: action.t2,
          
          x: action.x,
          y: action.y,
        }
      ]
    default:
      return state;
  }
}

export default log;