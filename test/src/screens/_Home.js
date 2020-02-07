import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import _TouchItem from '../components/_TouchItem/_TouchItem';
import styles from '../assets/styles/app';
import NavService from '../navigators/navigationService'

export default class Home extends Component {
  render() {
    return (
      <View style={[styles.screen, {justifyContent: 'center'}]}>
        <Image
          source={require('../assets/images/logo.jpeg')}
          resizeMode="contain"
          style={styles.logo}
        />
        <_TouchItem
          onPress={() => NavService.navigate('root', 'Login')}
          style={styles.continue_btn}>
          <Text style={styles.btn_text}>Login</Text>
        </_TouchItem>
        <_TouchItem
          onPress={() => NavService.navigate('root', 'Register')}
          style={styles.continue_btn}>
          <Text style={styles.btn_text}>Register</Text>
        </_TouchItem>
        <Text style={styles.reg_text}>Don't Have Account? </Text>
      </View>
    );
  }
}
