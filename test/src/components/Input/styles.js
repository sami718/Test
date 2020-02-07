import { StyleSheet } from 'react-native'
import { SMALL_DEVICE_H, SMALL_DEVICE_W } from '../../lib/_global';
import * as COLORS from '../../assets/styles/colors';

const style = StyleSheet.create({
    wrapperStyle: {
        width: '100%',
        marginTop: 0,
        paddingBottom: 10,
        marginBottom: 10,
    },
    labelWrapper: {
        marginBottom: 0
    },
    right_border: {
        borderRightWidth: 1,
        borderRightColor: COLORS.darkGrey,
        paddingHorizontal: 10,
        marginRight: 10
    },
    labelStyle: {
        color: COLORS.darkGrey,
        fontSize: 15,
        backgroundColor: 'transparent',
    },
    lightLabelStyle: {
        color: COLORS.white,
        fontSize: 12,
        fontWeight: '600',
        backgroundColor: 'transparent',
    },
    labelError: {
        color: COLORS.inputError,
        fontSize: 12,
        backgroundColor: 'transparent',
        paddingRight: 0,
    },
    inputStyle: {
        backgroundColor: 'transparent',
    },
    textInputStyle: {
        backgroundColor: 'transparent',
        color: COLORS.text,
        fontSize: 15,
        paddingVertical: 12,
        paddingHorizontal: 14,
        zIndex: 5,
        height: 50,
        flex: 1,
    },
    lightInputStyle: {
        backgroundColor: 'transparent',
        color: COLORS.lightGrey,
        fontSize: 17,
        padding: 14,
        zIndex: 5,
        flex: 1
    },
    rightIconPosition: {
        height: SMALL_DEVICE_H ? 20 : 30,
        width: SMALL_DEVICE_W ? 20 : 40,
        backgroundColor: 'transparent'
    },
    borderContainer: {
        borderWidth: 1,
        borderRadius: 3,
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    normalBorder: {
        borderColor: COLORS.lightGrey,
        zIndex: 1
    },
    lightBorder: {
        borderColor: 'rgba(255,255,255,0.5)',
        zIndex: 1
    },
    lightValidatedBorder: {
        borderColor: COLORS.green,
        zIndex: 2
    },
    focusBorder: {
        borderColor: COLORS.text,
        zIndex: 3
    },
    lightFocusBorder: {
        borderColor: COLORS.lightGrey,
        zIndex: 3
    },
    errorBorder: {
        borderColor: COLORS.inputError,
        zIndex: 3
    },
    validatedBorder: {
        borderColor: COLORS.lightGrey,
        zIndex: 2
    },
    inputInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        zIndex: 20
    }
});

export default style;
