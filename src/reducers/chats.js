import update from 'immutability-helper';

export default function chats (state = {}, action = null) {

    switch (action.type) {

        case 'NEW_CHAT':
            return {...state, chats: {key: action.chatKey}};

        default:
            return state;
    }
}
