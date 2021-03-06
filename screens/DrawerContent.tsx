import React, {useEffect, useState} from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Drawer,
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import{ AuthContext } from '../components/context';
import {GetEmail, GetName, GetSurname, GetUsername} from "../services";
export function DrawerContent({ props }) {
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
    const paperTheme = useTheme();

    const { signOut, toggleTheme } = React.useContext(AuthContext);

    return(
        <View style={{flex:1, backgroundColor: '#1E1E1E'}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec'
                                }}
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>{userName + ' ' + userSurname}</Title>
                                <Caption style={styles.caption}>@{userNickname}</Caption>
                            </View>
                        </View>


                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            labelStyle={{color: '#fff'}}
                            icon={({color, size}) => (
                                <Icon
                                    name="home-outline"
                                    color={'#fff'}
                                    size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => { props.navigation.navigate('Home')}}
                        />
                        <DrawerItem
                            labelStyle={{color: '#fff'}}
                            icon={({color, size}) => (
                                <Icon
                                    name="account-outline"
                                    color={'#fff'}
                                    size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                        <DrawerItem
                            labelStyle={{color: '#fff'}}
                            icon={({color, size}) => (
                                <Icon
                                    name="bookmark-outline"
                                    color={'#fff'}
                                    size={size}
                                />
                            )}
                            label="Bookmarks"
                            onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                        />
                        <DrawerItem
                            labelStyle={{color: '#fff'}}
                            icon={({color, size}) => (
                                <Icon
                                    name="cog-outline"
                                    color={'#fff'}
                                    size={size}
                                />
                            )}
                            label="Settings"
                            onPress={() => {props.navigation.navigate('SettingsScreen')}}
                        />
                        <DrawerItem
                            labelStyle={{color: '#fff'}}
                            icon={({color, size}) => (
                                <Icon
                                    name="account-check-outline"
                                    color={'#fff'}
                                    size={size}
                                />
                            )}
                            label="Support"
                            onPress={() => {props.navigation.navigate('SupportScreen')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    labelStyle={{color: '#fff'}}
                    icon={({color, size}) => (
                        <Icon
                            name="exit-to-app"
                            color={'#fff'}
                            size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
        color: '#fff'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: '#fff'
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});