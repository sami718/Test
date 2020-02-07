import {StyleSheet} from 'react-native';
import appstyles from '../../assets/styles/app';
import * as COLORS from '../../assets/styles/colors'

const styles = StyleSheet.create({
  wrap_container: {
    flex: 1,
    padding: 20,
  },
  age_title: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  radio_btns: {
    fontSize: 18,
    marginVertical: 10,
  },
  continue_btn: {
    alignSelf: 'center',
    backgroundColor: '#F2A900',
    marginVertical: 10,
    width: '70%',
    flex: 0,
    alignItems: 'center',
    paddingVertical: 20,
  },
  btn_text: {
    fontSize: 17,
    color: 'white',
  },
});

export default Object.assign(styles, appstyles);
