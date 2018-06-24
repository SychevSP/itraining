import { StyleSheet } from 'react-native';

import { TITLE_FONT_SIZE } from 'Components/consts';

export default styles = StyleSheet.create({
    mainVew: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: '2%',
    },
    rect: {
        width: '40%',
        height: TITLE_FONT_SIZE * 3,
        //marginVertical: '2%',
        borderRadius: TITLE_FONT_SIZE / 2,
        elevation: 1,
        opacity: 0.8,
        alignItems: 'center',
        justifyContent:'center',
        borderWidth: 3,
    },
    name: {
        backgroundColor: 'gray',
        borderColor: 'gray',
    },
    input: {
        backgroundColor: 'lightblue',
        borderColor: 'dodgerblue',
    },
    text: {
        color: 'white',
        fontSize: TITLE_FONT_SIZE,
        textAlign: 'center',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'black',
        opacity: 0.9,
        padding: '10%',
        alignItems: 'stretch',
    },
});