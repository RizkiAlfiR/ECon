import React, { Component } from 'react';
import { StyleSheet, ScrollView, ToastAndroid, BackHandler, View, Image, Item, TouchableOpacity, AsyncStorage, FlatList, ActivityIndicator } from 'react-native';
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
    FooterTab
} from 'native-base';
var thats;
import { StackNavigator } from "react-navigation";
import GlobalConfig from '../GlobalConfig';

class ListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'true',
        };
        // alert(JSON.stringify(this.props.data));
    }

    render() {
        return (
            <View>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={require('../Gambar/users.png')} />
                            <Body>
                                <Text> {this.props.data.fullname} </Text>
                                <Text note> {this.props.data.nik_number} </Text>
                                <Text note>SMK TI Ponorogo</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem style={{ marginLeft: 20 }}>
                        <Left>
                            <Button transparent>
                                <Icon active name="chatbubbles" />
                                <Text>See Details</Text>
                            </Button>
                        </Left>
                    </CardItem>
                </Card>
            </View>
        )
    }
}

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

export default class Beranda extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: 'true',
            dataSource: [],
            dataProfile: [],
            isloading: true,
        };
        // thatorder = this;
    }

    navigateToScreen(route) {
        this.props.navigation.navigate(route);
    }

    _renderItem = ({ item }) => (
        <ListItem data={item}></ListItem>
    )

    loadData() {
        // AsyncStorage.getItem('data').then((value) => {
        // alert(JSON.stringify(value));
        const url = GlobalConfig.SERVERHOST + '/user-submission?villages_id=9108155503';

        fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                // alert(JSON.stringify(responseJson.data));
                this.setState({
                    dataProfile: responseJson.data,
                    isloading: false
                });
            })
            .catch((error) => {
                console.log(error)
            })
        // })
    }

    componentDidMount() {
        this.loadData();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        ToastAndroid.show('You are on Dashboard Page', ToastAndroid.SHORT);
        return true;
    }

    static navigationOptions = {
        header: null
    };

    render(item) {
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
                    <Content style={{ marginHorizontal: 10, marginVertical: 30 }}>
                        <Text style={styles.berandaText}>Daftar Siswa Pengaju SKTM ___________</Text>
                        {/* <ScrollView> */}
                        <FlatList
                            data={this.state.dataProfile}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        {/* </ScrollView> */}
                    </Content>
                    <Footer>
                        <FooterTab>
                            <Button active vertical>
                                <Icon active name="home" />
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
})
