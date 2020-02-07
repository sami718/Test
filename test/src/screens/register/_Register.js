import React from 'react';
import {
  SafeAreaView,
  Image,
  View,
  Text,
  StatusBar,
  Alert,
  ScrollView
} from 'react-native';

import _TouchItem from '../../components/_TouchItem/_TouchItem';
import _Input from '../../components/Input/_Input';

import * as globals from '../../lib/_global';
import {transPurple} from '../../assets/styles/colors';
import styles from './style';
import NavService from '../../navigators/navigationService';
import ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'dsfdsf',
      phoneNumber: '1234567890',
      email: 'dsacds@dc.vom',
      location: {},
      data: {},
      avatarSource: {},
      submitted: false,
      img_title: ''
    };
  }

  componentDidMount() {
   this.getLocation()
  }

  getLocation = () => {
    data = {};
    Geolocation.getCurrentPosition(
      (position) => {
        data['lat'] = position.coords.latitude;
        data['lon'] = position.coords.longitude;
      },
      (error) => {
        data['lat'] = '';
        data['lon'] = '';
      },
      { timeout: 20000 },
    );
    this.setState({data}, () => {
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + data.lat + ',' + data.lon + '&key=' + 'AIzaSyDPsVh6znJ-58uKWyTwtj3he4EgbwuKkJI')
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.error_message) {
            // Alert.alert('Warning', 'Unable to fetch location. Please get paid API keys')
          } else {
            this.setState({
              data: JSON.stringify(responseJson)
            }) 
          }
        }) 
    })
  }

  validate1(input) {
    if (globals.checkInputValidation(input) && !globals.isEmptyObject(this.state.avatarSource)) {
      this.setState({ submitted: true })
    } else {
      Alert.alert('Warning', 'please provide all the details')
    }
  }

  selectImage() {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source,
          img_title: response.fileName
        });
      }
    });
  }

  renderStep2() {
    const inputValidation = () =>
      this.validate1([
        this.input_name,
        this.input_number,
        this.input_email
      ]);
    return (
      <View tabLabel="Address Details" style={styles.wrap_container}>
        <_Input
          ref={input => (this.input_name = input)}
          label="Name: *"
          editable={!this.state.submitted}
          placeholder={'Enter Your Name '}
          validationMode={'req'}
          text={this.state.name}
          keyboardType="default"
          onChangeText={t => {
            this.setState({ name: t });
          }}
          autoComplete="off"
          autoCorrect={false}
          wrapperStyle={{ flex: 0 }}
          textStyle={styles.text_style}
          inputStyle={{ backgroundColor: 'white' }}
          borderContainer={styles.input_borderContainer}
          returnKeyType='next'
          onSubmitEditing={() => this.input_number.focusInput()}
        />
        <_Input
          ref={input => (this.input_number = input)}
          editable={!this.state.submitted}
          label="Mobile: *"
          placeholder={'Enter Your Mobile Number'}
          validationMode={'req|phone_number'}
          text={this.state.phoneNumber}
          keyboardType="default"
          onChangeText={t => {
            this.setState({phoneNumber: t});
          }}
          autoComplete="off"
          autoCorrect={false}
          wrapperStyle={{ flex: 0 }}
          textStyle={styles.text_style}
          inputStyle={{ backgroundColor: 'white' }}
          borderContainer={styles.input_borderContainer}
          returnKeyType="next"
          onSubmitEditing={() => this.input_email.focusInput()}
        />
        <_Input
          ref={input => (this.input_email = input)}
          label="Email: *"
          editable={!this.state.submitted}
          placeholder={'Enter Your Mail Address'}
          validationMode={'req|mail'}
          text={this.state.email}
          keyboardType='default'
          onChangeText={t => this.setState({ email: t})}
          autoComplete="off"
          autoCorrect={false}
          wrapperStyle={{ flex: 0 }}
          textStyle={styles.text_style}
          inputStyle={{ backgroundColor: 'white' }}
          borderContainer={styles.input_borderContainer}
          returnKeyType='next'
          onSubmitEditing={() => this.input_city.focusInput()}
        />
        <View style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row'
        }}>
          <Text style={{ flex: 0.5 }}>
            Photo Upload
          </Text>
          {!this.state.submitted ? <_TouchItem onPress={() => this.selectImage()} style={[styles.continue_btn, { width: '45%' }]}>
            <Text style={styles.btn_text}>{this.state.img_title ? this.state.img_title : 'Browse'}</Text>
          </_TouchItem> :
          <View style={{ width: 200, height: 200 }}>
            <Image source={this.state.avatarSource} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
          </View>}
        </View>
        <_TouchItem onPress={inputValidation} style={styles.continue_btn}>
          <Text style={styles.btn_text}>{this.state.submitted ? 'Reset' : 'Register'}</Text>
        </_TouchItem>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.screen}>
        <StatusBar
          barStyle="dark-content"
          translucent={false}
          backgroundColor={transPurple}
          animated={true}
        />
        <SafeAreaView style={styles.screen}>
          <ScrollView>
          {this.renderStep2()}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default Register;
