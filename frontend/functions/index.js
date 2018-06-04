const admin = require('firebase-admin');
const functions = require('firebase-functions');

admin.initializeApp();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

// Returns status of all classrooms
exports.getClassrooms = functions.https.onRequest((request, response) => {

    // Return class room structure
    let getClassroomStructure = function() {
        return new Promise(function (resolve, reject) {
            admin.database().ref('classrooms').once('value', snapshotClassrooms => {
                resolve(snapshotClassrooms.val());
            });
        });
    };

    // Return classroomStatus
    let getClassroomStatus = function (classroomStructure) {
        return new Promise(function (resolve, reject) {

            // Fetch booked seats
            admin.database().ref('bookedSeats').once('value', snapshotBookedSeats => {
                const bookedSeats = snapshotBookedSeats.val();

                for (let classroom in bookedSeats) { // Loop over each classroom with booked seats
                    for (let student in bookedSeats[classroom]) { // Loop over each student who has booked a seat
                        const room = classroom;
                        const col = bookedSeats[classroom][student]['col'];
                        const row = bookedSeats[classroom][student]['row'];

                        classroomStructure[room]['seats'][row][col] = 2; // Set value 2 to indicate occupied seat
                    }
                }

                resolve(classroomStructure);
            })

        });
    };

    getClassroomStructure()
        .then(classroomStructure => {
            return(getClassroomStatus(classroomStructure));
        })
        .catch(error => {
            return(error);
        })
        .then(classroomStatus => {
            response.send(classroomStatus);
            return(classroomStatus);
        })
        .catch(error => {
            return(error);
        });
});