import {
    FETCH_UID_FIREBASE_START,
    FETCH_UID_FIREBASE_DONE,
    FETCH_UID_FIREBASE_FAILED,
    SHOW_CANCEL_BOOKING_MODAL,
    HIDE_CANCEL_BOOKING_MODAL,
    CANCEL_BOOKING_START,
    CANCEL_BOOKING_DONE,
    SHOW_CANCEL_BOOKING_DONE_MODAL,
    HIDE_CANCEL_BOOKING_DONE_MODAL,
    FETCH_CLASSROOMS_FIREBASE_START,
    FETCH_CLASSROOMS_FIREBASE_DONE,
    CLOSE_BOOKING,
    STUDENT_CHOOSE_SEAT,
    SAVE_BOOKING_FIREBASE_START,
    SAVE_BOOKING_FIREBASE_DONE,
    CLOSE_CONFIRMATION_MODAL,
    REGRET_CHOSEN_SEAT,
    SHOW_CONFIRMATION_MODAL,
    UPDATE_BOOKABLE_CLASSROOMS,
    UPDATE_SELECTED_CLASSROOM,
    UPDATE_BOOKABLE_CLASSROOM_NAMES,
    SHOW_BOOKING_MODAL,
    HIDE_BOOKING_MODAL,
    CHANGE_SETTINGS,
    SET_SERVICE_AVAILABILITY
} from '../types';

const bookingInitialState = {
    serviceAvailable: true,
    classrooms: [],
    selectedClassroomName: null,
    classroomNames: [],

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
    showConfirmationModal: false,
    confirmationModalMessage: '',
    confirmationModalType: '',

    bookingInterval: 0,
    idleTime: 0,
    confirmationModalTime: 0,
    fetchTimeOut: 0
};

const booking = (state = bookingInitialState, action) => {
    switch (action.type) {
        case (UPDATE_SELECTED_CLASSROOM): {
            return {
                ...state,
                selectedClassroomName: action.selectedClassroomName
            };
        }
        case (UPDATE_BOOKABLE_CLASSROOMS): {
            return {
                ...state,
                classrooms: action.classrooms
            };
        }
        case (UPDATE_BOOKABLE_CLASSROOM_NAMES): {
            return {
                ...state,
                classroomNames: action.classroomNames
            };
        }
        case (FETCH_UID_FIREBASE_START): {
            return {
                ...state,
                UID: action.UID,
                isFetchingIfActiveStudent: true
            };
        }
        case (FETCH_UID_FIREBASE_DONE): {
            return {
                ...state,
                UID: action.UID,
                isFetchingIfActiveStudent: false,
                cardChecked: true,
                studentIsActive: action.studentIsActive,
                studentBookedSeat: action.studentBookedSeat
            };
        }
        case (FETCH_UID_FIREBASE_FAILED): {
            return {
                ...state,
                UID: null,
                isFetchingIfActiveStudent: false,
                cardChecked: false,
                studentIsActive: false,
                studentBookedSeat: null
            };
        }
        case (SHOW_CANCEL_BOOKING_MODAL): {
            return {
                ...state,
                showCancelBookingModal: true
            };
        }
        case (HIDE_CANCEL_BOOKING_MODAL): {
            return {
                ...state,
                showCancelBookingModal: false,
                UID: null,
                cardChecked: false,
                studentIsActive: false,
                studentBookedSeat: null
            };
        }
        case (CANCEL_BOOKING_START): {
            return {
                ...state,
                isCancellingBooking: true
            };
        }
        case (CANCEL_BOOKING_DONE): {
            return {
                ...state,
                isCancellingBooking: false,
                showCancelBookingModal: false,
                UID: null,
                cardChecked: false,
                studentIsActive: false,
                studentBookedSeat: null
            };
        }
        case (SHOW_CANCEL_BOOKING_DONE_MODAL): {
            return {
                ...state,
                showCancelBookingDoneModal: true
            };
        }
        case (HIDE_CANCEL_BOOKING_DONE_MODAL): {
            return {
                ...state,
                showCancelBookingDoneModal: false
            };
        }
        case (FETCH_CLASSROOMS_FIREBASE_START): {
            return {
                ...state,
                isFetchingClassRoom: true
            };
        }
        case (FETCH_CLASSROOMS_FIREBASE_DONE): {
            return {
                ...state,
                isFetchingClassRoom: false,
                classrooms: action.classrooms
            };
        }
        case (CLOSE_BOOKING): {
            return {
                ...state,
                UID: null,
                cardChecked: false,
                studentIsActive: false,
                bookingObject: null,
                showBookingDecisionModal: false
            };
        }
        case (STUDENT_CHOOSE_SEAT): {
            return {
                ...state,
                bookingObject: action.bookingObject
            };
        }
        case (SHOW_BOOKING_MODAL): {
            return {
                ...state,
                showBookingDecisionModal: true
            };
        }
        case (HIDE_BOOKING_MODAL): {
            return {
                ...state,
                showBookingDecisionModal: false,
                bookingObject: null
            };
        }
        case (SAVE_BOOKING_FIREBASE_START): {
            return {
                ...state,
                isSavingBooking: true
            };
        }
        case (SAVE_BOOKING_FIREBASE_DONE): {
            return {
                ...state,
                showBookingDecisionModal: false,
                isSavingBooking: false,
                bookingObject: null,
                UID: null,
                cardChecked: false
            };
        }
        case (SHOW_CONFIRMATION_MODAL): {
            return {
                ...state,
                showConfirmationModal: true,
                confirmationModalMessage: action.message,
                confirmationModalType: action.confirmationModalType
            };
        }
        case (CLOSE_CONFIRMATION_MODAL): {
            return {
                ...state,
                showConfirmationModal: false,
            };
        }
        case (REGRET_CHOSEN_SEAT): {
            return {
                ...state,
                bookingObject: null,
                showBookingDecisionModal: false
            };
        }
        case (CHANGE_SETTINGS): {
            return {
                ...state,
                bookingInterval: action.bookingInterval,
                idleTime: action.idleTime,
                confirmationModalTime: action.confirmationModalTime,
                fetchTimeOut: action.fetchTimeOut
            };
        }
        case (SET_SERVICE_AVAILABILITY): {
            return {
                ...state,
                serviceAvailable: action.serviceAvailable
            };
        }
        default:
            return state;
    }
};

export default booking;