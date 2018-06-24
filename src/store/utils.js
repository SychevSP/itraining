import { setUID } from '/actions'
import firebase from '/firebaseInit';

export async function getUidFromGoogle (dispatch) {
    let uid;
    try {
        await firebase.auth().onAuthStateChanged(user => {
            uid = user.uid;
        });
    }
    catch (err) {
        uid = 0;
        console.log(err);
    }
    dispatch(setUID(uid));
}
