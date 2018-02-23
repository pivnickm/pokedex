import storage from '../config/firebase'

export const getImageSuccess = (content, id) => ({
  type: "GET_IMAGE_SUCCESS",
  id,
  payload: content
});

export const getImageError = (err, id) => ({
  type: "GET_IMAGE_ERROR",
  id,
  payload: err
});

export const getImage = (id) => (dispatch, getState) => {
  const storageRef = storage.ref();
  const imageKey = id.split(".png")[0];
  return storageRef.child(id).getDownloadURL()
    .then((url) => {
      console.log("URL", url); // eslint-disable-line
      dispatch(getImageSuccess(url, imageKey))
    })
    .catch((error) => {
      dispatch(getImageError(error, imageKey))
    });
};
