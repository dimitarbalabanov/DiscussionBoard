const effectsMiddleware = ({ dispatch, getState }) => {
  return next => action => {
    const nextValue = next(action);
    const {
      effect,
      type
    } = action;

    if (effect) {
      if (typeof effect !== 'function') {
        throw new Error('Expected effect to be a function.')
      }

      effect({
        dispatch: dispatch,
        state: getState(),
        type: type
      });

      delete action.effect;
    }

    return nextValue;
  };
}

export default effectsMiddleware;