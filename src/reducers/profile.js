import update from 'immutability-helper';

export default function profile (state = {}, action = null) {

    switch (action.type) {

        case 'UPDATE_PROFILE':
            return update(state, {$set: action.profile});

        default:
            return state;
    }
}

