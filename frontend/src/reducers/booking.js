import {
    FETCH_UID_FIREBASE_START,
    FETCH_UID_FIREBASE_DONE,
    SHOW_CANCEL_BOOKING_MODAL,
    HIDE_CANCEL_BOOKING_MODAL,
    CANCEL_BOOKING_START,
    CANCEL_BOOKING_DONE,
    SHOW_CANCEL_BOOKING_DONE_MODAL,
    HIDE_CANCEL_BOOKING_DONE_MODAL,
    FETCH_CLASSROOMS_FIREBASE_START,
    FETCH_CLASSROOMS_FIREBASE_DONE,
    CANCEL_BOOKING,
    CHOOSE_SEAT,
    SAVE_BOOKING_FIREBASE_START,
    SAVE_BOOKING_FIREBASE_DONE,
    HIDE_BOOKING_CONFIRMATION_MODAL,
    REGRET_CHOSEN_SEAT,
} from '../types';


const bookingInitialState = {
    serviceAvailable: false,
    classRooms: [],

    UID: null,
    isFetchingIfActiveStudent: false,
    cardChecked: false,
    studentIsActive: false,
    studentBookedSeat: null,

    isCancellingBooking: false,
    showCancelBookingModal: false,
    showCancelBookingDoneModal: false,

    isFetchingClassRoom: false,

    bookingObject: null,

    isSavingBooking: false,
    showBookingDecisionModal: false,
    showBookingConfirmationModal: false

};

const booking = (state = bookingInitialState, action) => {
    switch(action.type) {
        case(FETCH_UID_FIREBASE_START): {
            return {
                ...state,
                UID: action.UID,
                isFetchingIfActiveStudent: true,
            }
        }
        case(FETCH_UID_FIREBASE_DONE): {
            return {
                ...state,
                isFetchingIfActiveStudent: false,
                cardChecked: true,
                studentIsActive: action.studentIsActive,
                studentBookedSeat: action.studentBookedSeat,
            }
        }
        case(SHOW_CANCEL_BOOKING_MODAL): {
            return {
                ...state,
                showCancelBookingModal: true,
            }
        }
        case(HIDE_CANCEL_BOOKING_MODAL): {
            return {
                ...state,
                showCancelBookingModal: false,
                UID: null,
                cardChecked: false,
                studentIsActive: false,
                studentBookedSeat: null,
            }
        }
        case(CANCEL_BOOKING_START): {
            return {
                ...state,
                isCancellingBooking: true
            }
        }
        case(CANCEL_BOOKING_DONE): {
            return {
                ...state,
                isCancellingBooking: false,
                showCancelBookingModal: false,
                UID: null,
                cardChecked: false,
                studentIsActive: false,
                studentBookedSeat: null,
            }
        }
        case(SHOW_CANCEL_BOOKING_DONE_MODAL): {
            return {
                ...state,
                showCancelBookingDoneModal: true,
            }
        }
        case(HIDE_CANCEL_BOOKING_DONE_MODAL): {
            return {
                ...state,
                showCancelBookingDoneModal: false,
            }
        }
        case(FETCH_CLASSROOMS_FIREBASE_START): {
            return {
                ...state,
                isFetchingClassRoom: true,
            }
        }
        case(FETCH_CLASSROOMS_FIREBASE_DONE): {
            return {
                ...state,
                isFetchingClassRoom: false,
                classRooms: action.classRooms,
            }
        }
        case(CANCEL_BOOKING): {
            return {
                ...state,
                classRooms: null,
                UID: null,
                cardChecked: null
            }
        }
        case(CHOOSE_SEAT): {
            return {
                ...state,
                bookingObject: action.bookingObject,
                showBookingDecisionModal: true,
            }
        }
        case(SAVE_BOOKING_FIREBASE_START): {
            return {
                ...state,
                isSavingBooking: true,
            }
        }
        case(SAVE_BOOKING_FIREBASE_DONE): {
            return {
                ...state,
                showBookingDecisionModal: false,
                isSavingBooking: false,
                bookingObject: null,
                classRooms: null,
                UID: null,
                cardChecked: false,
                showBookingConfirmationModal: true,
            }
        }
        case(HIDE_BOOKING_CONFIRMATION_MODAL): {
            return {
                ...state,
                showBookingConfirmationModal: false,
            }
        }
        case(REGRET_CHOSEN_SEAT): {
            return {
                ...state,
                bookingObject: null,
                showBookingDecisionModal: false,
            }
        }
        default:
            return state;
    }
};

export default booking;