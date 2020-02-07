import {StyleSheet} from 'react-native';
import * as colors from './colors';

const style = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  btn_text: {
    fontSize: 17,
    color: 'white',
  },
  reg_text: {
    fontSize: 16,
    color: colors.darkGrey,
    alignSelf: 'center',
    bottom: 45,
  },
  continue_btn: {
    alignSelf: 'center',
    backgroundColor: '#702197',
    marginVertical: 50,
    width: '70%',
    flex: 0,
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    alignSelf: 'center',
    bottom: 10,
  },
  backgroundImage: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '120%',
  },
  iconStyle: {
    color: colors.darkGrey,
    height: 30,
    width: 30,
    paddingLeft: 8,
    fontSize: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default style;
