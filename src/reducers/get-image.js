const initialState = {
  urls: {},
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
  case "GET_IMAGE_SUCCESS":
    const newUrls = { ...state.urls };
    newUrls[action.id] = action.payload
    return {
      ...state,
      urls: {
        ...newUrls
      }
    };
  case "GET_IMAGE_ERROR":
    return {...state, url: action.payload };
  default:
    return state;
  }
};
