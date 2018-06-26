import { db } from './firebase';

export const getUserByUID = (UID) => {

    // Check if student has booking in index list
    db.ref('studentClassroomIndex').orderByChild('uid').equalTo(UID).once('value', snapshot => {
        const studentBookingExists = snapshot.val();

        // If student exist in index list database, find student information
        if (studentBookingExists) {
            let classroom = studentBookingExists[UID]['classroom'];
            db.ref(`bookedSeats/${classroom}/${UID}`).once('value', bookingData => {
                console.log(bookingData.val());
                return bookingData.val()
            });
        } else {
            return false;
        }
    });
};