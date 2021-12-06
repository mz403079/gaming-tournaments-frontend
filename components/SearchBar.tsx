import React from 'react'
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    View,
    TextInput,
    Image,
    TouchableHighlight,
    ScrollView, Text, TouchableOpacity, ImageBackground,
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome'

import Animated, {Easing} from 'react-native-reanimated'

const { Value, timing } = Animated

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const SearchBar = (props, { navigation }) => {

    props.state = {
        isFocused: false,
        keyword: ''
    }

    const _input_box_translate_x = new Value(width)
    const _back_button_opacity = new Value(0)
    const _content_translate_y = new Value(height)
    const _content_opacity = new Value(0)

    return (
        <>
            <SafeAreaView style={styles.header_safe_area}>
                <Animated.View style={styles.header}>
                    <Animated.View style={styles.header_inner}>
                        <Animated.View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{fontSize: 20, fontFamily: 'Roboto_500Medium', color: '#fff'}}>Hello
                                Hasan</Text>
                            <TouchableOpacity onPress={() => {
                                props.navigation.navigate('CreateTournament')
                            }}>
                                <ImageBackground
                                    source={{
                                        uri: 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec'
                                    }}
                                    style={{width: 35, height: 35}}
                                    imageStyle={{borderRadius: 25, marginLeft: 15}}
                                />
                            </TouchableOpacity>
                        </Animated.View>
                        <TouchableHighlight
                            activeOpacity={1}
                            underlayColor={'#ccd0d5'}
                            onPress={() => {}}
                            style={styles.search_icon_box}>
                            <Icon name={'search'} size={22} color={'#fff'}/>
                        </TouchableHighlight>
                    </Animated.View>
                </Animated.View>
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    header_safe_area: {
        zIndex: 1000
    },

    header: {
        height: 50,
        paddingHorizontal: 16
    },
    header_inner: {
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
    },
    search_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderColor: '#e4e6eb',
        flexDirection: 'row',
        justifyContent: 'center'
    }
})

export default SearchBar