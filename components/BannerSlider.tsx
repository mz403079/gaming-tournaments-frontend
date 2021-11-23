import React from 'react'
import {View, Text, Image} from 'react-native'

export default function BannerSlider({data}: {data: any}) {
    return (
        <View style={{flexDirection: 'column', borderRadius: 10, borderColor: '#03DAC5', borderWidth: 0.5, alignSelf:'baseline', overflow: 'hidden'}}>
            <Image source={data.image} style={{height: 150, width: 300, borderTopRightRadius: 10, borderTopLeftRadius: 10}}/>
            <Text style={{color: '#fff', marginVertical: 15, marginHorizontal: 20}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>

        </View>
    )
}