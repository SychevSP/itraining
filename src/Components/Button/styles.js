import { StyleSheet } from 'react-native';

import { FONT_SIZE } from '../consts';

export default styles = StyleSheet.create({
    shapeCommon: {
        width: '80%',
        height: FONT_SIZE * 2.25,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: FONT_SIZE / 2,
        borderWidth: 3,
        margin: Math.round(FONT_SIZE / 3),
    },
    shapeActive: {
        backgroundColor: 'white',
        borderColor: 'dodgerblue',
    },
    textCommon: {
        color: 'dodgerblue',
        fontSize: FONT_SIZE,
        textAlign: 'center',
    },
});
