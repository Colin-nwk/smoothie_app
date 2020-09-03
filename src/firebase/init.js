import firebase from 'firebase'
// eslint-disable-next-line no-unused-vars
import firestore from 'firebase/firestore'
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAAuj5ax-vOwbj2KJfPhVwKmjhMroPfp1M',
  authDomain: 'smoothie-675de.firebaseapp.com',
  databaseURL: 'https://smoothie-675de.firebaseio.com',
  projectId: 'smoothie-675de',
  storageBucket: 'smoothie-675de.appspot.com',
  messagingSenderId: '884540343655',
  appId: '1:884540343655:web:db92995e119493356d9bc2',
  measurementId: 'G-5TK3P3S8J4'
}
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

firebase.analytics()

// export firestore database
export default firebaseApp.firestore()
