import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import React, {useState, useEffect} from "react";
import {Avatar, Title, Caption, TouchableRipple} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GetEmail, GetName, GetSurname, GetUsername} from "../services";

const ProfileScreen = ({ navigation }) => {
    const [userName, setUserName] = useState<string>('');
    const [userSurname, setUserSurname] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');
    const [userNickname, setUserNickname] = useState<string>('');
    useEffect(() => {
        GetUsername().then((res) => setUserNickname(res));
        GetName().then((res) => setUserName(res));
        GetSurname().then((res) => setUserSurname(res));
        GetEmail().then((res) => setUserEmail(res));

    })
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.userInfoSection}>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                    <Avatar.Image
                        source={{
                            uri: 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec',
                        }}
                        size={80}
                    />
                    <View style={{marginLeft: 20}}>
                        <Title style={[styles.title, {
                            marginTop: 15,
                            marginBottom: 5,
                        }]}>{userName + ' ' + userSurname}</Title>
                        <Caption style={styles.caption}>@{userNickname}</Caption>
                    </View>
                </View>
            </View>

            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <Icon name="email-outline" color="#03DAC5" size={20}/>
                    <Text style={{color:"#c7c7c7", marginLeft: 20}}>{userEmail}</Text>
                </View>
            </View>

            <View style={styles.infoBoxWrapper}>
                <View style={[styles.infoBox, {
                    borderRightColor: '#dddddd',
                    borderRightWidth: 1
                }]}>
                    <Title style={{color: '#03DAC5'}}>140.50 Points</Title>
                    <Caption style={{color: '#fff', fontSize: 18}}>Wallet</Caption>
                </View>
                <View style={styles.infoBox}>
                    <Title style={{color: '#03DAC5'}}>2</Title>
                    <Caption style={{color: '#fff', fontSize: 18}}>Tickets</Caption>
                </View>
            </View>

            <View style={styles.menuWrapper}>
                <TouchableRipple onPress={() => {navigation.navigate('TournamentDetails')}}>
                    <View style={styles.menuItem}>
                        <Icon name="credit-card-outline" color="#03DAC5" size={25}/>
                        <Text style={styles.menuItemText}>Payment</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => navigation.navigate('GameAccounts')}>
                    <View style={styles.menuItem}>
                        <Icon name="account-group" color="#03DAC5" size={25}/>
                        <Text style={styles.menuItemText}>Game accounts</Text>
                    </View>
                </TouchableRipple>
                {/*<TouchableRipple onPress={() => {}}>*/}
                {/*    <View style={styles.menuItem}>*/}
                {/*        <Icon name="account-cog" color="#03DAC5" size={25}/>*/}
                {/*        <Text style={styles.menuItemText}>Settings</Text>*/}
                {/*    </View>*/}
                {/*</TouchableRipple>*/}
            </View>
        </SafeAreaView>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#121212"
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginBottom: 25,
        backgroundColor: "#121212"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        fontWeight: '500',
        color: '#fff'
    },
    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    infoBoxWrapper: {
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        borderTopColor: '#dddddd',
        borderTopWidth: 1,
        flexDirection: 'row',
        height: 100,
    },
    infoBox: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    menuWrapper: {
        marginTop: 50,
    },
    menuItem: {
        marginVertical: 5,
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
        backgroundColor: '#1C1C1C'
    },
    menuItemText: {
        color: '#fff',
        marginLeft: 20,
        fontWeight: '600',
        fontSize: 16,
        lineHeight: 26,
    },
});