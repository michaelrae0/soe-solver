import _ from 'lodash';

const log = (state = [], action) => {

  // If action is equal to one of the objects in
  // the state array, return true.
  let alreadyAdded = (arr, obj) => {
    for (let i = 0; i < arr.length; i++) {
      if (_.isEqual(arr[i], obj)) {
        return i; // index
      }
    }
    return false;
  }

  switch (action.type) {
    // Add item.
    case 'ADD_SYSTEM': 
      let i = alreadyAdded(state, action);

      // If already present, delete previous entry and
      // add action to the end.
      if (i !== false) {
        return [
          ...state.slice(0, i),
          ...state.slice(i + 1),
          {
            ...{ a1, b1, t1, a2, b2, t2, x, y } = action,
          }
        ]
      }
      // Otherwise, add it normally.
      else return [
        ...state,
        {
          ...{ a1, b1, t1, a2, b2, t2, x, y } = action,
        }
      ];

    // Remove item
    case 'REMOVE_SYSTEM':
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ];

    default:
      return state;
  }
}

export default log;