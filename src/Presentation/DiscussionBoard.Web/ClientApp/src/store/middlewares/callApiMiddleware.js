const callApiMiddleware = ({ dispatch }) => {
  return next => action => {
    const {
      types,
      callApi,
      ...props 
    } = action

    if (!types) {
      return next(action)
    }

    if (!Array.isArray(types) ||
        types.length !== 3 ||
        !types.every(type => typeof type === 'string')) {

      throw new Error('Expected an array of three string types.')
    }

    if (typeof callApi !== 'function') {
      throw new Error('Expected callApi to be a function.')
    }

    const [requestType, successType, failureType] = types

    dispatch({
      ...props,
      type: requestType
    });
  
    return callApi()
      .then(response => {
        console.log(response.data)
        dispatch({
          ...props,
          type: successType,
          data: response.data
        })})
      .catch(error => {
        dispatch({
          ...props,
          type: failureType,
          error: error.message
        })});
  }
}

export default callApiMiddleware;