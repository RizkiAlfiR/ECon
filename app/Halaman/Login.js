import React from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  AsyncStorage
} from 'react-native';
import { Button, Icon, Toast } from 'native-base';
import GlobalConfig from '../GlobalConfig';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "agung",
      password: "agung",
      isLoggedIn: false
    };
  }

  static navigationOptions = {
    header: null
  }
  
  checkLogin() {
    var url = GlobalConfig.SERVERHOST + '/auth/login';
    var formData = new FormData();
    formData.append("username", this.state.username)
    formData.append("password", this.state.password)

    fetch(url, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: 'POST',
      body: formData
    }).then((response) => response.json())
      .then((response) => {
        if (response.code == 200) {
          // AsyncStorage.setItem('[data]', response.data).then(() => {
            this.setState({ isLoggedIn: true });
            this.props.navigation.navigate('Beranda')
          // })
        } else {
          Alert.alert('Error', 'Username or Password Wrong', [{
            text: 'Okay'
          }])
        }
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../Gambar/siswa.jpg')} style={styles.backgroundImage}>
          <ScrollView>
            <View style={styles.content}>
              <View style={styles.inputContainer}>
                <Image source={require('../Gambar/logo.png')} style={styles.headerImage}></Image>

                <Text style={styles.logo}>Aplikasi Monitoring dan Pengajuan SKTM</Text>
                <Text style={styles.logoChild}>Login in. to see it in action.</Text>

                <TextInput value={this.state.username} underlineColorAndroid='transparent' style={styles.input} placeholder='Username'
                  onChangeText={(text) => this.setState({ username: text })}></TextInput>
                <TextInput value={this.state.password} secureTextEntry={true} underlineColorAndroid='transparent' style={styles.input} placeholder='Password'
                  onChangeText={(text) => this.setState({ password: text })}></TextInput>

                <Button block style={{
                  alignSelf: 'stretch',
                  marginTop: 20,
                  marginBottom: 20,
                  height: 45,
                  alignItems: 'center',
                  borderWidth: 0,
                  backgroundColor: '#03b799',
                  borderColor: '#03b799',
                  borderRadius: 4
                }} onPress={() => this.checkLogin()}>
                  <Text style={styles.buttonText}>Login</Text>
                  <Icon name="paper-plane" />
                </Button>
                {/* this.state.isLoading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <ActivityIndicator size="large" color="#330066" animating />
                </View>
                : */}
                <Text style={styles.logoFooter}>Created by Dev4Gov © 2018</Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  backgroundImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
    height: null,
    justifyContent: 'center'
  },

  headerImage: {
    alignSelf: 'center',
    width: 200,
    height: 160
  },

  content: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20
  },

  logo: {
    textAlign: 'center',
    color: '#000',
    fontSize: 24,
    margin: 15
  },

  logoChild: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#03b799',
    fontSize: 14,
    marginBottom: 20,
  },

  logoFooter: {
    textAlign: 'center',
    color: '#03b799',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 20,
  },

  inputContainer: {
    margin: 20,
    padding: 20,
    paddingBottom: 10,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },

  input: {
    fontSize: 16,
    height: 40,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.9)'
  },

  buttonContainer: {
    alignSelf: 'stretch',
    margin: 20,
    height: 10,
    padding: 20,
    borderWidth: 1,
    backgroundColor: '#00cc99',
    borderColor: '#00cc99',
    borderRadius: 4
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#03b799',
  }
});