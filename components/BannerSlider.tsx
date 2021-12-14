import React, {FC} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import Marker from '../assets/images/marker.svg'
import moment from 'moment';
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
    tournamentStart: string,
    city: string,
    street: string,
}

const BannerSlider: FC<TournamentProps> = ({ name, tournamentStart, city, street}) => {
    let momentObj = moment(tournamentStart, 'YYYY-MM-DD h:mm');
    let month = moment(momentObj).format('MMM').toUpperCase();
    let day = moment(momentObj).format('DD').toUpperCase();
    return (
        <View style={{flexDirection: 'column', borderRadius: 20, borderColor: '#03DAC5', borderWidth: 1, alignSelf:'baseline', overflow: 'hidden'}}>
            <Image source={{uri: 'https://www.fifagamenews.com/wp-content/uploads/2019/03/FGN817-1-650x332.jpg'}} style={{height: 120, width: 300, borderTopRightRadius: 20, borderTopLeftRadius: 20}}/>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <View style={{width: 55, height: 55, backgroundColor: '#E4FFF9', borderRadius: 12, margin: 12, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontFamily: "Roboto_700Bold", fontSize: 14, color: "#03DAC5"}}>{month}</Text>
                    <Text style={{fontFamily: "Roboto_500Medium", fontSize: 14}}>{day}</Text>
                </View>
                <View>
                    <Text style={{fontFamily: "Roboto_700Bold", color: '#fff', fontSize: 15, marginBottom: 5}}>{name}</Text>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Marker width={24} height={24} style={{height: 24, width: 24, marginRight: 5}}/>
                        <View>
                            <Text style={{color: '#fff'}}>{street}</Text>
                            <Text style={{color: '#03DAC5'}}>{city}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default BannerSlider;