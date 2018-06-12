import {
    FETCH_UID_FIREBASE_START,
    CANCEL_BOOKING_START,
    HIDE_CANCEL_BOOKING_MODAL,
    FETCH_CLASSROOMS_FIREBASE_START,
    CLOSE_BOOKING,
    STUDENT_CHOOSE_SEAT,
    UPDATE_BOOKABLE_CLASSROOMS,
    REGRET_CHOSEN_SEAT,
    SAVE_BOOKING_FIREBASE_START,
    CLOSE_BOOKING_CONFIRMATION_MODAL,
    UPDATE_SELECTED_CLASSROOM,
} from "../types";

import { db } from '../firebase/firebase';

const bookingActions = {
    listenToBookableClassrooms() {
        return (dispatch) => {
            let classrooms = db.ref('classrooms');
            classrooms.on('value', snapshot => {
                let bookableClassrooms = snapshot.val();
                let classroomNames = [];

                for (let classroom in bookableClassrooms) {
                    if (bookableClassrooms.hasOwnProperty(classroom)) {
                        classroomNames.push(classroom);
                    }
                }

                dispatch({ type: UPDATE_BOOKABLE_CLASSROOMS,
                    classrooms: bookableClassrooms,
                    classroomNames: classroomNames });

                dispatch({ type: UPDATE_SELECTED_CLASSROOM, selectedClassroomName: classroomNames[0]})
            })
        }
    },
    updateSelectedClassroom(selectedClassroomName) {
        return (dispatch) => {
            dispatch({ type: UPDATE_SELECTED_CLASSROOM, selectedClassroomName: selectedClassroomName });
        }
    },
    fetchUserFromFirebase(UID) {
        return (dispatch) => {
            dispatch({ type: FETCH_UID_FIREBASE_START, UID: UID});
            // TODO Firebase call to fetch info about UID
            // TODO Set student related store
            // TODO If cardChecked = true and studentIsActive = true -> Dispatch SHOW_CANCEL_BOOKING_MODAL
        }
    },
    fetchClassroomsFromFirebase() {
        return (dispatch) => {
            dispatch({ type: FETCH_CLASSROOMS_FIREBASE_START });
            // TODO Firebase call to fetch classrooms
            // TODO When Firebase call done -> Dispatch FETCH_CLASSROOMS_FIREBASE_DONE
            // TODO browserHistory.push('/booking')
        }
    },
    cancelBooking() {
        return (dispatch) => {
            dispatch({ type: CANCEL_BOOKING_START });
            // TODO Firebase call to cancel booking
            // TODO When cancel booking is done -> Dispatch CANCEL_BOOKING_DONE
            // TODO Set timeout 3000 ms -> Dispatch SHOW_CANCEL_BOOKING_DONE_MODAL to HIDE_CANCEL_BOOKING_DONE_MODAL
        }
    },
    regretCancelBooking() {
        return (dispatch) => {
            dispatch({ type: HIDE_CANCEL_BOOKING_MODAL });
        }
    },
    regretBooking() {
        return (dispatch) => {
            dispatch({ type: CLOSE_BOOKING });
            // TODO browserHistory.push('/blipp')
        }
    },
    regretChosenSeat() {
        return (dispatch) => {
            dispatch({ type: REGRET_CHOSEN_SEAT });
        }
    },
    studentChooseSeat(bookingObject) {
        return (dispatch) => {
            dispatch({ type: STUDENT_CHOOSE_SEAT, bookingObject: bookingObject})
        }
    },
    studentBookSeat(bookingObject) {
        return (dispatch) => {
            dispatch({ type: SAVE_BOOKING_FIREBASE_START });
            // TODO Firebase call to book seat
            // TODO When done -> Dispatch SAVE_BOOKING_FIREBASE_DONE
            // TODO browserHistory.push('/blipp')
            // TODO When redirect done -> dispatch -> SHOW_BOOKING_CONFIRMATION_MODAL
        }
    },
    closeBookingConfirmationModal() {
        return (dispatch) => {
            dispatch({ type: CLOSE_BOOKING_CONFIRMATION_MODAL });
        }
    }
};

export default bookingActions;