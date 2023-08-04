// firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/storage';
const firebaseConfig = {
apiKey: "AIzaSyB6aVTp4_onloS5r84KALhy-RsDmfzMjWk",
authDomain: "fir-formproject.firebaseapp.com",
databaseURL: "https://fir-formproject-default-rtdb.firebaseio.com",
projectId: "fir-formproject",
storageBucket: "fir-formproject.appspot.com",
messagingSenderId: "597034099790",
appId: "1:597034099790:web:afdfc5981f00be9f3fcf1f"



};

firebase.initializeApp(firebaseConfig);
export  const database = firebase.database();
export const storage =firebase.storage();