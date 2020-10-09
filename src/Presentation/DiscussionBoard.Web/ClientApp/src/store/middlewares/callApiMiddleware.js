const callAPIMiddleware = ({ dispatch }) => {
  return next => action => {
    const {
      types,
      callAPI,
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

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.')
    }

    const [requestType, successType, failureType] = types

    dispatch({
      ...props,
      type: requestType
    });
  
    return callAPI()
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

export default callAPIMiddleware;