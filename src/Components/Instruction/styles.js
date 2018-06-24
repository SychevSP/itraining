import { StyleSheet } from 'react-native';

import { TITLE_FONT_SIZE } from '../consts';

export default styles = StyleSheet.create({
    mainVew: {
        flex: 2,
        marginHorizontal: '8%',
        marginVertical: '4%',
        alignItems: 'center',
    },
    rect: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: TITLE_FONT_SIZE / 2,
        borderWidth: 2,
        borderColor: 'black',
        padding: TITLE_FONT_SIZE / 2,
        opacity: 0.6,
        backgroundColor: 'black',
    },
    triangle: {
        width: 0,
        height: 0,
        opacity: 0.6,
        alignSelf: 'flex-start',
        marginLeft: '15%',
        borderTopWidth: 10,
        borderTopColor: 'black',
        borderLeftWidth: 20,
        borderLeftColor: 'transparent',
        borderRightWidth: 20,
        borderRightColor: 'transparent',
    },
    text: {
        color: 'white',
        fontSize: TITLE_FONT_SIZE,
        textAlign: 'center',
        opacity: 1,
    },
});

