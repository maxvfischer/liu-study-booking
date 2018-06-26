const admin = require('firebase-admin');
const functions = require('firebase-functions');
const cors = require('cors')({ origin: true  });

admin.initializeApp();

// Remove bookings older than interval
exports.removeOldBookings = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        // Return interval from settings
        let getInterval = function() {
            return new Promise(function (resolve, reject) {
                admin.database().ref('settings/bookingInterval').once('value', snapshotInterval => {
                    resolve(snapshotInterval.val());
                });
            });
        };

        let removeBooking = function (interval) {
            return new Promise(function (resolve, reject) {
                const now = Date.now();
                const cutoff = now - interval;

                admin.database().ref('bookings').orderByKey().endAt(cutoff.toString()).once('value', snapshotBookings => {
                        const bookings = snapshotBookings.val();
                        for (let booking in bookings) {
                            if (bookings.hasOwnProperty(booking)) {
                                const seatNumber = bookings[booking]['seatNumber'];
                                const classroom = bookings[booking]['classroom'];
                                const UID = bookings[booking]['uid'];
                                const startTime = booking;
                                admin.database().ref(`bookedSeats/${classroom}/${seatNumber}`).remove();
                                admin.database().ref(`students/${UID}`).remove();
                                admin.database().ref(`bookings/${startTime}`).remove();
                            }
                        }
                });
                resolve("Sucess");
            });
        };

        getInterval()
            .then(interval => {
                return(removeBooking(interval));
            })
            .catch(error => {
                return error;
            })
            .then(() => {
                res.status(200).end();
                return("Success");
            })
            .catch(error => {
                return (error);
            });
    });
});

// Returns status of all classrooms
exports.getClassrooms = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
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
                        if (bookedSeats.hasOwnProperty(classroom)) {
                            for (let seatNumber in bookedSeats[classroom]) { // Loop over each student who has booked a seat
                                if (bookedSeats[classroom].hasOwnProperty(seatNumber)) {
                                    const col = bookedSeats[classroom][seatNumber]['col'];
                                    const row = bookedSeats[classroom][seatNumber]['row'];

                                    classroomStructure[classroom]['seats'][row][col] = 2; // Set value 2 to indicate occupied seat
                                }
                            }
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
                res.send({ data: classroomStatus });
                return(classroomStatus);
            })
            .catch(error => {
                return(error);
            });
    });
});