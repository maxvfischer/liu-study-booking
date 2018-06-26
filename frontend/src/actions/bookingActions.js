import {
    FETCH_UID_FIREBASE_START,
    FETCH_UID_FIREBASE_FAILED,
    SAVE_BOOKING_FIREBASE_DONE,
    CANCEL_BOOKING_START,
    HIDE_CANCEL_BOOKING_MODAL,
    FETCH_CLASSROOMS_FIREBASE_START,
    CLOSE_BOOKING,
    STUDENT_CHOOSE_SEAT,
    UPDATE_BOOKABLE_CLASSROOMS,
    REGRET_CHOSEN_SEAT,
    SAVE_BOOKING_FIREBASE_START,
    UPDATE_SELECTED_CLASSROOM,
    UPDATE_BOOKABLE_CLASSROOM_NAMES,
    FETCH_UID_FIREBASE_DONE,
    SHOW_CANCEL_BOOKING_MODAL,
    SHOW_BOOKING_MODAL,
    HIDE_BOOKING_MODAL,
    CHANGE_SETTINGS,
    CANCEL_BOOKING_DONE,
    SHOW_CONFIRMATION_MODAL,
    CLOSE_CONFIRMATION_MODAL,
    SET_SERVICE_AVAILABILITY
} from '../types';

import { db } from '../firebase/firebase';

const bookingActions = {
    listenToBookableClassrooms() {
        return (dispatch) => {
            let classrooms = db.ref('classrooms');
            classrooms.on('value', snapshot => {
                let bookableClassrooms = snapshot.val();
                let classroomNames = [];
                const firstClassroomIndex = 0;
                for (let classroom in bookableClassrooms) {
                    if (bookableClassrooms.hasOwnProperty(classroom)) {
                        classroomNames.push(classroom);
                    }
                }
                dispatch({
                    type: UPDATE_BOOKABLE_CLASSROOM_NAMES,
                    classroomNames: classroomNames
                });
                dispatch({
                    type: UPDATE_SELECTED_CLASSROOM,
                    selectedClassroomName: classroomNames[firstClassroomIndex]
                });

                if (!bookableClassrooms) {
                    dispatch({
                        type: SET_SERVICE_AVAILABILITY,
                        serviceAvailable: false
                    });
                } else {
                    dispatch({
                        type: SET_SERVICE_AVAILABILITY,
                        serviceAvailable: true
                    });
                }
            });
        };
    },
    listenToSettings() {
        return (dispatch) => {
            let settings = db.ref('settings');
            settings.on('value', snapshot => {
                let bookingInterval = parseInt(
                    snapshot.val()['bookingInterval'], 0);
                let idleTime = parseInt(
                    snapshot.val()['idleTime'], 0);
                let confirmationModalTime = parseInt(
                    snapshot.val()['confirmationModalTime'], 0);
                let fetchTimeOut = parseInt(
                    snapshot.val()['fetchTimeOut'], 0);
                dispatch({
                    type: CHANGE_SETTINGS,
                    bookingInterval: bookingInterval,
                    idleTime: idleTime,
                    confirmationModalTime: confirmationModalTime,
                    fetchTimeOut: fetchTimeOut
                });
            });
        };
    },
    updateSelectedClassroom(selectedClassroomName) {
        return (dispatch) => {
            dispatch({
                type: UPDATE_SELECTED_CLASSROOM,
                selectedClassroomName: selectedClassroomName
            });
        };
    },
    fetchUserFromFirebase(confirmationModalTime, fetchTimeOut, UID) {
        function fetchTimeout(ms, promise){
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error('timeout'));
                }, ms);
                promise.then(resolve, reject);
            });
        }

        return (dispatch) => {
            dispatch({
                type: FETCH_UID_FIREBASE_START,
                UID: UID
            });

            const fetchRemoveOldBookingsUrl =
                'https://us-central1-liu-study-booking'
                + '.cloudfunctions.net/removeOldBookings';
            const fetchGetClassroomsUrl =
                'https://us-central1-liu-study-booking'
                + '.cloudfunctions.net/getClassrooms';
            const httpAcceptStatus = 200;

            fetch(fetchRemoveOldBookingsUrl)
                .then((responseRemOldBook) => {
                    if (responseRemOldBook.status === httpAcceptStatus) {
                        // Fetch timeout if Firebase fetch takes to long
                        fetchTimeout(fetchTimeOut, fetch(fetchGetClassroomsUrl))
                            .then((response) => response.json())
                            .then((json) => {
                                dispatch({
                                    type: UPDATE_BOOKABLE_CLASSROOMS,
                                    classrooms: json['data']
                                });

                                // Check if student has booking in index list
                                db.ref('students')
                                    .orderByChild('uid')
                                    .equalTo(UID)
                                    .once('value', snapshot => {
                                        let studentBookingData = snapshot.val();

                                        // If student exist in index list database,
                                        // find student information
                                        if (studentBookingData) {
                                            studentBookingData =
                                                studentBookingData[UID];
                                            dispatch({
                                                type: FETCH_UID_FIREBASE_DONE,
                                                studentIsActive: true,
                                                studentBookedSeat: studentBookingData,
                                                UID: UID
                                            });

                                            dispatch({
                                                type: SHOW_CANCEL_BOOKING_MODAL
                                            });
                                        } else {
                                            dispatch({
                                                type: FETCH_UID_FIREBASE_DONE,
                                                studentIsActive: false,
                                                studentBookedSeat: null,
                                                UID: UID
                                            });
                                        }
                                    });
                            })
                            .catch(() => {
                                const message = 'Det gick inte att hämta ' +
                                    'klassrummen, vänligen försök igen!';
                                const type = 'error';

                                dispatch({
                                    type: FETCH_UID_FIREBASE_FAILED
                                });

                                dispatch({
                                    type: SHOW_CONFIRMATION_MODAL,
                                    message: message,
                                    confirmationModalType: type
                                });

                                setTimeout(() => {
                                    dispatch({
                                        type: CLOSE_CONFIRMATION_MODAL
                                    });
                                }, confirmationModalTime);
                            });
                    }
                });
        };
    },
    fetchClassroomsFromFirebase() {
        return (dispatch) => {
            dispatch({
                type: FETCH_CLASSROOMS_FIREBASE_START
            });
        };
    },
    cancelBooking(studentBookedSeat, UID, confirmationModalTime) {
        return (dispatch) => {
            dispatch({
                type: CANCEL_BOOKING_START
            });

            let classroom = studentBookedSeat['classroom'];
            let seatNumber = studentBookedSeat['seatNumber'];
            let startTime = studentBookedSeat['startTime'];

            db.ref(`bookedSeats/${classroom}/${seatNumber}`).remove();
            db.ref(`students/${UID}`).remove();
            db.ref(`bookings/${startTime}`).remove();

            dispatch({
                type: CANCEL_BOOKING_DONE
            });

            const message = 'Din plats är avbokad!';
            const type = 'success';

            dispatch({
                type: SHOW_CONFIRMATION_MODAL,
                message: message,
                confirmationModalType: type
            });

            setTimeout(() => {
                dispatch({
                    type: CLOSE_CONFIRMATION_MODAL
                });
            }, confirmationModalTime);

        };
    },
    regretCancelBooking() {
        return (dispatch) => {
            dispatch({
                type: HIDE_CANCEL_BOOKING_MODAL
            });
        };
    },
    regretBooking() {
        return (dispatch) => {
            dispatch({
                type: CLOSE_BOOKING
            });
        };
    },
    regretChosenSeat() {
        return (dispatch) => {
            dispatch({
                type: REGRET_CHOSEN_SEAT
            });
        };
    },
    studentChooseSeat(bookingObject) {
        return (dispatch) => {
            dispatch({
                type: SHOW_BOOKING_MODAL
            });
            dispatch({
                type: STUDENT_CHOOSE_SEAT,
                bookingObject: bookingObject
            });
        };
    },
    closeBookingModal() {
        return (dispatch) => {
            dispatch({
                type: HIDE_BOOKING_MODAL
            });
        };
    },
    studentBookSeat(bookingObject, confirmationModalTime) {
        return (dispatch) => {
            dispatch({
                type: SAVE_BOOKING_FIREBASE_START
            });
            const classroom = bookingObject['classroom'];
            const UID = bookingObject['UID'];
            const seatNumber = parseInt(bookingObject['seatNumber'], 0);
            const startTime = bookingObject['startTime'];

            // Write to booking to bookedSeats (Firebase)
            db.ref(`bookedSeats/${classroom}/${seatNumber}`).set({
                col: parseInt(bookingObject['col'], 0),
                row: parseInt(bookingObject['row'], 0),
                startTime: bookingObject['startTime']
            });

            // Write to booking to students (Firebase)
            db.ref(`students/${UID}`).set({
                classroom: bookingObject['classroom'],
                uid: bookingObject['UID'],
                seatNumber: parseInt(bookingObject['seatNumber'], 0),
                startTime: bookingObject['startTime']
            });

            // Write to booking to bookings (Firebase)
            db.ref(`bookings/${startTime}`).set({
                uid: bookingObject['UID'],
                classroom: bookingObject['classroom'],
                seatNumber: bookingObject['seatNumber']
            });

            dispatch({
                type: SAVE_BOOKING_FIREBASE_DONE
            });

            const message = 'Din plats är bokad!';
            const type = 'success';

            dispatch({
                type: SHOW_CONFIRMATION_MODAL,
                message: message,
                confirmationModalType: type
            });

            setTimeout(() => {
                dispatch({
                    type: CLOSE_CONFIRMATION_MODAL
                });
            }, confirmationModalTime);
        };
    },
    closeBookingConfirmationModal() {
        return (dispatch) => {
            dispatch({
                type: CLOSE_CONFIRMATION_MODAL
            });
        };
    }
};

export default bookingActions;