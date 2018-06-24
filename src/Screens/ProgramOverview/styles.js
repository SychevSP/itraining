import { StyleSheet} from 'react-native';
import { TITLE_FONT_SIZE, FONT_SIZE } from '/Components/consts';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    exerciseBlob: {
        borderRadius: 4,
        borderWidth: 2,
        backgroundColor: 'beige',
        margin: 3
    },
    textComplete: {
        color: 'green',
        fontSize: TITLE_FONT_SIZE,
        textAlign: 'center'
    },
    textNormal: {
        fontSize: FONT_SIZE,
    }
});
