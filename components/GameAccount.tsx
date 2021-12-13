import React, { Component } from 'react';
import {Animated, Text, TouchableOpacity, StyleSheet, Image, Dimensions, Platform, UIManager, View} from 'react-native'

const width = Dimensions.get('window').width;

export default class GameAccount extends Component <any, any> {
    private animatedValue: Animated.Value;

    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.item.id !== this.props.item.id) {
            return true;
        }
        return false;
    }

    componentDidMount() {
        Animated.timing(
            this.animatedValue,
            {
                toValue: 0.5,
                duration: 500,
                useNativeDriver: true
            }
        ).start(() => {
            this.props.afterAnimationComplete();
        });
    }

    removeItem = () => {
        Animated.timing(
            this.animatedValue,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start(() => {
            console.log('item id', this.props.item.gameAccountId)
            this.props.removeItem(this.props.item.gameAccountId);
        });
    }

    render() {
        const translateAnimation = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [-width, 0, width]
        });

        const opacityAnimation = this.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 0]
        });

        return (
            <Animated.View style={[
                styles.viewHolder, {
                    transform: [{ translateX: translateAnimation }],
                    opacity: opacityAnimation
                }]}
            >
                <Text
                    style={styles.displayText}>
                    {this.props.item.game.name} :  {this.props.item.inGameName}
                </Text>

                    <TouchableOpacity
                        style={styles.removeBtn}
                        onPress={this.removeItem}
                    >
                        <Image
                            source={require('../assets/images/deleteButton.png')}
                            style={styles.btnImage}
                        />
                    </TouchableOpacity>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create(
    {
        viewHolder: {
            paddingVertical: 15,
            backgroundColor: '#2196f3',
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 4,
            paddingLeft: 15,
            borderRadius: 10
        },
        displayText: {
            color: 'white',
            fontSize: 25,
            paddingRight: 17
        },
        removeBtn: {
            position: 'absolute',
            right: 13,
            width: 30,
            height: 30,
            borderRadius: 15,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'
        },
        btnImage: {
            resizeMode: 'contain',
            width: '100%',
        },
    });
