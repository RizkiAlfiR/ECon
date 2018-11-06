import React, { Component } from 'react';
import { StyleSheet, ToastAndroid, BackHandler, View, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
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
    Footer,
    TouchableHighlight,
    FooterTab
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

export default class Akun extends Component {
    static navigationOptions = {
        header: null
    };
    
    constructor() {
        super();
        this.state = {
            active: 'true',
            isLoading: true,
            dataSource: []
        };
    }

    navigateToScreen(route) {
        this.props.navigation.navigate(route);
    }

    _renderItem(item) {
        return (
            <View style={styles.Container}>
                <View style={styles.header}>
                    <Text style={styles.name}>PROFIL SAYA</Text>

                    <View style={styles.profileepicWrap}>
                        <Image style={styles.profileepic} source={require('../Gambar/user.png')} />
                    </View>
                    <Text style={styles.pos}>{item.username}</Text>
                </View>
                <View style={styles.body}>
                    <View style={styles.bar}>
                        <Card>
                            <CardItem bordered>
                                <Text>Email                 : {item.email}</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Text>Role Name       : {item.role_name}</Text>
                            </CardItem>
                            <CardItem bordered>
                                <Body>
                                    <Text>Nama Desa      : {item.villages_name}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </View>
                </View>
            </View>
        )
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        const url = GlobalConfig.SERVERHOST + '/auth/user/detail/7';

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                // alert(JSON.stringify(responseJson));
                this.setState({
                    dataSource: responseJson.data,
                    isloading: false
                });
            })
            .catch((error) => {
                console.log(error)
            })

    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            this.state.isloading
                ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#330066" animating />
                </View>
                :
                <Container>
                    <Header style={{ backgroundColor: '#f6f6f6' }}>
                        <LogoTitle />
                    </Header>
                    <Content>
                        {this._renderItem(this.state.dataSource)}

                        <Button block danger style={{
                            alignSelf: 'stretch',
                            marginTop: 20,
                            marginBottom: 20,
                            marginHorizontal: 50,
                            // width: 100,
                            height: 45,
                            alignItems: 'center',
                            borderWidth: 0,
                            borderRadius: 4 
                            }} onPress={() => this.navigateToScreen('Login')}>
                            <Text style={styles.buttonText}>Log out</Text>
                        </Button>
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button vertical onPress={() => this.navigateToScreen('Beranda')}>
                                <Icon name="home" />
                                <Text>Beranda</Text>
                            </Button>
                            <Button vertical onPress={() => this.navigateToScreen('Pengajuan')}>
                                <Icon name="paper" />
                                <Text>Ajukan</Text>
                            </Button>
                            <Button vertical onPress={() => this.navigateToScreen('Daerah')}>
                                <Icon name="navigate" />
                                <Text>Daerah</Text>
                            </Button>
                            <Button active vertical>
                                <Icon active name="person" />
                                <Text>Akun</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 30,
        marginBottom: 0,
        padding: 20,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#1AB394',
        backgroundColor: '#1AB394'
    },

    body: {
        marginBottom: 30
    },

    profileepicWrap: {
        width: 180,
        height: 180
    },

    profileepic: {
        flex: 1,
        width: null,
        alignSelf: 'stretch',
        borderColor: '#ffffff'
    },

    name: {
        marginVertical: 20,
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },

    unit: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '300',
        fontStyle: 'italic',
        marginTop: 10,
        marginBottom: 20
    },

    pos: {
        marginTop: 20,
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 30
    }
})
