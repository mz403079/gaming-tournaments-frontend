import React, {useState} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {Roboto_500Medium} from "@expo-google-fonts/roboto";

export default function CustomSwitch({
    selectionMode,
    option1,
    option2,
    onSelectSwitch}) {

    const [getSelectionMode, setSelectionMode] = useState(selectionMode);
    const updateSwitchData = (value) => {
        setSelectionMode(value);
        onSelectSwitch(value);
    }

    return (
        <View
            style={{
                height: 44,
                width: '100%',
                backgroundColor: '#03DAC5',
                borderRadius: 20,
                borderColor: '#AD40AF',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(1)}
                style={{
                    flex: 1,
                    backgroundColor: getSelectionMode == 1? '#03DAC5' : '#303030',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{
                    color: getSelectionMode == 1? '#121212' : '#03DAC5',
                    fontSize: 14,
                    fontFamily: 'Roboto_500Medium',
                }}>{option1}</Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(2)}
                style={{
                    flex: 1,
                    backgroundColor: getSelectionMode == 2 ? '#03DAC5' : '#303030',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{
                    color: getSelectionMode == 2? 'white' : '#03DAC5',
                    fontSize: 14,
                    fontFamily: 'Roboto_500Medium',
                }}>{option2}</Text>
            </TouchableOpacity>
        </View>
    );
}
