import { StyleSheet } from 'react-native';
import { FONT_SIZE } from 'Compoenents/consts';

export default styles = StyleSheet.create({
    message: {
        backgroundColor: 'beige',
        width: '80%',
        margin: 2,
        borderRadius: FONT_SIZE / 2,
        borderBottomWidth: 10,
        borderBottomColor: 'beige',
        padding: FONT_SIZE / 2,
    },
    myMessage: {
        alignSelf: 'flex-start',
        borderLeftWidth: 15,
        borderLeftColor: 'transparent',
        //paddingLeft: 4,
    },
    theirMessage: {
        alignSelf: 'flex-end',
        borderRightWidth: 15,
        borderRightColor: 'lightgray',
        paddingRight: 4,
    },
    sendButton: {
        height: SQUARE_SIDE,
        width: SQUARE_SIDE,
        borderRadius: SQUARE_SIDE / 2,
        borderColor: 'dodgerblue',
        borderWidth: 2,
        backgroundColor: 'dodgerblue'
    },
    inputBox: {
        width: INPUT_WIDTH,
        borderColor: 'dodgerblue',
        backgroundColor: 'ivory',
        borderRadius: FONT_SIZE / 2,
        borderWidth: 2,
        fontSize: FONT_SIZE,
    },
    textUser: {
        textAlign: 'left',
        color: 'green',
    },
    textDate: {
        textAlign: 'right',
        color: 'gray',
    },
});

