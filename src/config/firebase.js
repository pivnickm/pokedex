import * as firebase from 'firebase';

// export const getStorage = (id) => {

//   const storageRef = storage.ref();

//   return storageRef.child(id).getDownloadURL()
//     .then((url) => {
//       return url;
//     })
//     .catch((error) => {
//       return error;
//     });
// }
  var config = {
    apiKey: "AIzaSyA-lA8Tt8EZpaEMmVCjSKL0tZu6G3zieS0",
    authDomain: "pokedex-39022.firebaseapp.com",
    databaseURL: "https://pokedex-39022.firebaseio.com",
    projectId: "pokedex-39022",
    storageBucket: "pokedex-39022.appspot.com",
    messagingSenderId: "977106112783"
  };
  firebase.initializeApp(config);
  const storage = firebase.storage();
  //database = firebase.database()

export default storage;