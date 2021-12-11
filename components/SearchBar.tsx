import React, {useEffect, useState} from 'react'
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    View,
    TextInput,
    Image,
    TouchableHighlight,
    ScrollView, Text, TouchableOpacity, ImageBackground, ActivityIndicator, FlatList,
} from "react-native";

import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'lodash'
import Animated, {Easing} from 'react-native-reanimated'
import { useNavigation } from '@react-navigation/native';
import SearchListItem from "./SearchListItem";
const { Value, timing } = Animated

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
type TournamentProps = {
    name: string,
    currentNumberOfTeams: number,
    description: string,
    lan: boolean,
    maxNumberOfTeams: number,
    maxTeamSize: number,
    reward: string,
    rules: string,
    teams: [],
    tournamentEnd: string,
    tournamentId: number,
    tournamentStart: string;
}
class SearchBar extends React.Component {
    private _input_box_translate_x;
    private _back_button_opacity;
    private _content_translate_y;
    private _content_opacity;

    constructor(props){
        super(props)

        this.state = {
            isFocused: false,
            keyword: '',
            isLoading: true,
            tournaments: [],
            filteredTournaments: [],
            search: ''
        }

        this._input_box_translate_x = new Value(width)
        this._back_button_opacity = new Value(0)
        this._content_translate_y = new Value(height)
        this._content_opacity = new Value(0)
    }


    private tournamentsURL = 'https://gen-gg.herokuapp.com/api/getTournaments';

    componentDidMount() {
        this.setState({isLoading: true})
        fetch(this.tournamentsURL)
            .then((response) => response.json())
            .then((json) => this.setState({tournaments: json}))
            .catch((error) => console.error(error))
            .finally(() => this.setState({isLoading: false}));
    }

    _onFocus = () => {
        this.setState({isFocused: true})
        //input box
        const input_box_translate_x_config = {
            duration: 200,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }
        const back_button_opacity_config = {
            duration: 200,
            toValue: 1,
            easing: Easing.inOut(Easing.ease)
        }

        //content
        const content_translate_y_config = {
            duration: 0,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }
        const content_opacity_config = {
            duration: 200,
            toValue: 1,
            easing: Easing.inOut(Easing.ease)
        }

        //run animation
        timing(this._input_box_translate_x, input_box_translate_x_config).start()
        timing(this._back_button_opacity, back_button_opacity_config).start()
        timing(this._content_translate_y, content_translate_y_config).start()
        timing(this._content_opacity, content_opacity_config).start()

        //force focus
        this.refs.input.focus()
    }

    _onBlur = () => {
        this.setState({isFocused: true})
        //input box
        const input_box_translate_x_config = {
            duration: 200,
            toValue: width,
            easing: Easing.inOut(Easing.ease)
        }
        const back_button_opacity_config = {
            duration: 50,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }

        //content
        const content_translate_y_config = {
            duration: 0,
            toValue: height,
            easing: Easing.inOut(Easing.ease)
        }
        const content_opacity_config = {
            duration: 200,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }

        //run animation
        timing(this._input_box_translate_x, input_box_translate_x_config).start()
        timing(this._back_button_opacity, back_button_opacity_config).start()
        timing(this._content_translate_y, content_translate_y_config).start()
        timing(this._content_opacity, content_opacity_config).start()

        //force blur
        this.refs.input.blur()
    }
    handleSearch = (value) => {
        console.log('value', value)
        if(value) {
            const newData = this.state.tournaments.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase()
                    : ''.toUpperCase()
                const textData = value.toUpperCase()
                return itemData.indexOf(textData) > -1
            })

            this.setState({filteredTournaments: newData})
            this.setState({keyword: value})
        }
        else {
            this.setState({filteredTournaments: this.state.tournaments})
            this.setState({keyword: value})
        }
    }

    render(){

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212'}}>
                    <ActivityIndicator size={"large"}/>
                </View>
            );
        }

        const renderSeparator = () => {
            return (
                <View
                    style={{
                        height: 1,
                        width: "86%",
                        backgroundColor: "#03DAC5"
                    }}/>
            )
        }

        const renderList = ({item, index}: { item: TournamentProps, index: any }) => {
            console.log(item.name);
            return (
                <TouchableOpacity onPress={() => {this.props.navigate('CreateTournament')}}>
                    <SearchListItem name={item.name}
                              currentNumberOfTeams={item.currentNumberOfTeams}
                              description={item.description}
                              lan={item.lan}
                              maxNumberOfTeams={item.maxNumberOfTeams}
                              maxTeamSize={item.maxTeamSize}
                              reward={item.reward}
                              rules={item.rules}
                              teams={item.teams}
                              tournamentEnd={item.tournamentEnd}
                              tournamentId={item.tournamentId}
                              tournamentStart={item.tournamentStart}

                    />
                </TouchableOpacity>
            )
        }

    return (
        <>
            <SafeAreaView style={styles.header_safe_area}>
                <View style={styles.header}>
                    <View style={styles.header_inner}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Text style={{fontSize: 20, fontFamily: 'Roboto_500Medium', color: '#fff'}}>Hello
                                    Hasan</Text>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigate('CreateTournament')
                                }}>
                                    <ImageBackground
                                        source={{
                                            uri: 'https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec'
                                        }}
                                        style={{width: 35, height: 35}}
                                        imageStyle={{borderRadius: 25, marginLeft: 15}}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableHighlight
                                activeOpacity={1}
                                underlayColor={'#ccd0d5'}
                                onPress={this._onFocus}
                                style={styles.search_icon_box}>
                                <Icon name={'search'} size={22} color={'#fff'}/>
                            </TouchableHighlight>
                            <Animated.View
                                style={[styles.input_box, {transform: [{translateX: this._input_box_translate_x}]}]}>
                                <Animated.View style={{opacity: this._back_button_opacity}}>
                                    <TouchableHighlight
                                        activeOpacity={1}
                                        underlayColor={'#ccd0d5'}
                                        onPress={this._onBlur}
                                        style={styles.back_icon_box}>
                                        <Icon name={"chevron-left"} size={22} color='white'/>
                                    </TouchableHighlight>
                                </Animated.View>
                                <TextInput
                                    ref="input"
                                    placeholder="Search"
                                    clearButtonMode="always"
                                    value={this.state.keyword}
                                    onChangeText={this.handleSearch}
                                    style={styles.input}/>
                            </Animated.View>
                        </View>
                    </View>
            </SafeAreaView>

            <Animated.View style={[styles.content, { opacity: this._content_opacity, transform: [{translateY: this._content_translate_y}]} ]}>
                <SafeAreaView style={styles.content_safe_area}>
                    <View style={styles.content_inner}>
                        <View style={styles.separator}/>
                        {
                            this.state.keyword === ''
                            ?
                                <View style={styles.image_placeholder_container}>
                                    <Image source={require('../assets/images/search.png')}
                                            style={[styles.image_placeholder, {height: 100, width: 100}]}/>
                                    <Text style={styles.image_placeholder_text}>
                                        Enter a few words{"\n"}
                                        to search for tournaments
                                    </Text>
                                </View>
                            :
                                // <ScrollView>
                                //     <View style={styles.search_item}>
                                //         <Icon name="search" style={styles.item_icon} size={16} color={"#ccc"}/>
                                //         <Text style={{color: 'white'}}>Fake result 1</Text>
                                //     </View>
                                //     <View style={styles.search_item}>
                                //         <Icon name="search" style={styles.item_icon} size={16} color={"#ccc"}/>
                                //         <Text style={{color: 'white'}}>Fake result 2</Text>
                                //     </View>
                                //     <View style={styles.search_item}>
                                //         <Icon name="search" style={styles.item_icon} size={16} color={"#ccc"}/>
                                //         <Text style={{color: 'white'}}>Fake result 3</Text>
                                //     </View>
                                //     <View style={styles.search_item}>
                                //         <Icon name="search" style={styles.item_icon} size={16} color={"#ccc"}/>
                                //         <Text style={{color: 'white'}}>Fake result 4</Text>
                                //     </View>
                                //     <View style={styles.search_item}>
                                //         <Icon name="search" style={styles.item_icon} size={16} color={"#ccc"}/>
                                //         <Text style={{color: 'white'}}>Fake result 5</Text>
                                //     </View>
                                // </ScrollView>
                            <FlatList
                                data={this.state.filteredTournaments}
                                // keyExtractor={(item, index) => index.toString()}
                                // ItemSeparatorComponent={(ItemSeparatorView)}
                                renderItem={renderList}
                                ItemSeparatorComponent={renderSeparator}>


                            </FlatList>
                        }
                    </View>
                </SafeAreaView>
            </Animated.View>
        </>
        )
    }
}

const styles = StyleSheet.create({
    header_safe_area: {
        zIndex: 1000
    },

    header: {
        height: 50,
        paddingHorizontal: 20,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    input_box: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#121212',
        width: width - 45,
    },
    back_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        borderColor: '#e4e6eb',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 18
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#e4e6eb',
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 15
    },
    content: {
        width: width,
        height: height -150,
        position: 'absolute',
        left: 0,
        bottom: 0,
        zIndex: 999
    },
    content_safe_area: {
        flex: 1,
        backgroundColor: '#121212',
    },
    content_inner: {
        flex: 1,
        paddingTop: 50
    },
    separator: {
        marginTop: 5,
        height: 1,
        backgroundColor: 'white'
    },
    image_placeholder_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '-50%'
    },
    image_placeholder_text: {
        textAlign: 'center',
        color: 'gray',
        marginTop: 5
    },
    image_placeholder: {
        width: 150,
        height: 113,
        alignSelf: 'center'
    },
    search_item: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e4eb',
        marginLeft: 16
    },
    item_icon: {
        marginLeft: 15
    }
})

export default SearchBar