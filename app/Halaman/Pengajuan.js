import React, { Component } from 'react';
import { StyleSheet, Alert, ToastAndroid, BackHandler, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import {
    Container,
    Content,
    Text,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Card,
    CardItem,
    Thumbnail,
    Footer,
    TouchableHighlight,
    FooterTab,
    Form,
    Item,
    Picker,
    Textarea
} from 'native-base';
var thats;
import { StackNavigator } from "react-navigation";
import GlobalConfig from '../GlobalConfig';

class LogoTitle extends React.Component {
    render() {
        return (
            <Image
                source={require('../Gambar/logo.png')}
                style={{ width: 42, height: 36, alignContent: 'center', marginTop: 10 }}
            />
        );
    }
}

export default class Pengajuan extends Component {
    constructor(props) {
        super();
        this.state = {
            // active: 'true',
            // dataSource: [],
            // dataProfile: [],
            // isloading: true,
            selectedKeperluan: '1',
        };
    }

    onValueChange2(value) {
        // this.setState({
        //   selectedAPD: value
        // });
        setTimeout(() => {
            this.setState({
                selectedKeperluan: value
            });
        }, 1000);
    }

    navigateToScreen(route) {
        this.props.navigation.navigate(route);
    }

    static navigationOptions = {
        header: null
    };

    PengajuanAntrian() {
        // alert(JSON.stringify(value));
        const url = GlobalConfig.SERVERHOST + '/user-submission/save/9108155503';
        var formData = new FormData();
        formData.append("users_id", 7)
        formData.append("letter_submission_categories_id", this.state.selectedKeperluan)
        formData.append("description", this.state.description)

        fetch(url, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            method: 'POST',
            body: formData
        })
            .then((response) => response.json())
            .then((responseJson) => {
                // alert(JSON.stringify(responseJson));
                if (responseJson.code == 200) {
                    Alert.alert('Success', 'Submisson Successfully', [{
                        text: 'Okay'
                    }])
                    this.props.navigation.navigate('Beranda')
                } else {
                    Alert.alert('Error', 'Submission Failed', [{
                        text: 'Okay'
                    }])
                }
            })
    }

    render() {
        that = this;
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <Header style={{ backgroundColor: '#f6f6f6' }}>
                    <LogoTitle />
                </Header>
                <Content style={{ marginHorizontal: 10, marginVertical: 30 }}>
                    <Text style={styles.berandaText}>Form Pengajuan SKTM _______________</Text>
                    <View>
                        <Text>Pilih Kategori Pengajuan</Text>
                        <Form underlineColorAndroid='transparent' style={styles.inputQty}>
                            <Item picker>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down-outline" />}
                                    style={{ width: undefined }}
                                    placeholderIconColor="#007aff"
                                    selectedValue={this.state.selectedKeperluan}
                                    // onValueChange={this.onValueChange2.bind(this)}
                                    onValueChange={(itemValueKeperluan) => this.setState({ selectedKeperluan: itemValueKeperluan })}
                                >
                                    <Picker.Item label="Berobat" value="1" />
                                    <Picker.Item label="Pendaftaran Siswa Baru" value="2" />
                                    <Picker.Item label="Pengajuan Beasiswa" value="3" />
                                </Picker>
                            </Item>
                        </Form>
                    </View>
                    <Text>Keterangan</Text>
                    <Form>
                        <Textarea
                            rowSpan={5}
                            bordered placeholder="Isikan keterangan lengkap keperluan pengajuan SKTM"
                            onChangeText={(text) => this.setState({ description: text })} />
                    </Form>
                    <Button block style={{
                        alignSelf: 'stretch',
                        marginTop: 40,
                        marginHorizontal: 20,
                        height: 45,
                        alignItems: 'center',
                        borderWidth: 0,
                        backgroundColor: '#03b799',
                        borderColor: '#03b7999',
                        borderRadius: 4
                    }}
                        onPress={() => that.PengajuanAntrian()} >
                        <Text style={styles.buttonText}>Ambil Nomor Antrian</Text>
                    </Button>
                </Content>
                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => this.navigateToScreen('Beranda')}>
                            <Icon active name="home" />
                            <Text>Beranda</Text>
                        </Button>
                        <Button active vertical>
                            <Icon name="paper" />
                            <Text>Ajukan</Text>
                        </Button>
                        <Button vertical onPress={() => this.navigateToScreen('Daerah')}>
                            <Icon name="navigate" />
                            <Text>Daerah</Text>
                        </Button>
                        <Button vertical onPress={() => this.navigateToScreen('Akun')}>
                            <Icon name="person" />
                            <Text>Akun</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    berandaText: {
        fontSize: 20,
        fontWeight: 'bold',
        // marginHorizontal: 20,
        marginBottom: 20,
        color: '#03b799'
    },

    inputQty: {
        height: 60,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
    },

    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#03b799',
    }
})
