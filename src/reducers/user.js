export default function user (state = {}, action = null) {

    switch (action.type) {

        case 'SET_UID':
            return {...state, uid: action.uid};

        default:
            return state;
    }

}
