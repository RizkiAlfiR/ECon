import React, { Component } from 'react';
import { StyleSheet, ToastAndroid, BackHandler, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
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
    Title,
    Subtitle,
    Footer,
    TouchableHighlight,
    FooterTab
} from 'native-base';
import MapView, { AnimatedRegion, Animated } from 'react-native-maps';
var thats;
import { StackNavigator } from "react-navigation";

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

export default class Daerah extends Component {
    constructor(props) {
        super();
    }

    navigateToScreen(route) {
        this.props.navigation.navigate(route);
    }

    static navigationOptions = {
        header: null
    };

    // getInitialState() {
    //     return {
    //         region: new AnimatedRegion({
    //             latitude: LATITUDE,
    //             longitude: LONGITUDE,
    //             latitudeDelta: LATITUDE_DELTA,
    //             longitudeDelta: LONGITUDE_DELTA,
    //         }),
    //     };
    // }

    // onRegionChange(region) {
    //     this.state.region.setValue(region);
    // }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <Container>
                <Header style={{ backgroundColor: '#f6f6f6' }}>
                    <LogoTitle />
                </Header>
                <Content>
                    {/* <MapView
                        region={this.state.region}
                        onRegionChange={this.onRegionChange}
                    /> */}
                    <Text> INI DAERAH </Text>
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
                        <Button active vertical>
                            <Icon active name="navigate" />
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

})
