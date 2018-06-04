import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/functions';

const config = {
    apiKey: "AIzaSyCWqRexdqJReim667DQKytHu5OZN1jiSP0",
    authDomain: "liu-study-booking.firebaseapp.com",
    databaseURL: "https://liu-study-booking.firebaseio.com",
    projectId: "liu-study-booking",
    storageBucket: "liu-study-booking.appspot.com",
    messagingSenderId: "383223850257"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const func = firebase.functions();

export {
    db,
    func,
};