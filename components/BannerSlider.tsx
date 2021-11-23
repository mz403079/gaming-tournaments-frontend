import React, {FC} from 'react'
import {View, Text, Image} from 'react-native'
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
    tournamentStart: string;
}

const BannerSlider: FC<TournamentProps> = ({name, tournamentStart}) => {
    let momentObj = moment(tournamentStart, 'YYYY-MM-DD h:mm');
    let month = moment(momentObj).format('MMM').toUpperCase();
    let day = moment(momentObj).format('DD').toUpperCase();
    return (
        <View style={{flexDirection: 'column', borderRadius: 20, borderColor: '#03DAC5', borderWidth: 0.5, alignSelf:'baseline', overflow: 'hidden'}}>
            <Image source={{uri: 'https://www.fifagamenews.com/wp-content/uploads/2019/03/FGN817-1-650x332.jpg'}} style={{height: 150, width: 300, borderTopRightRadius: 20, borderTopLeftRadius: 20}}/>
            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <View style={{width: 60, height: 60, backgroundColor: '#E4FFF9', borderRadius: 12, margin: 20, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontFamily: "Roboto_700Bold", fontSize: 16, color: "#03DAC5"}}>{month}</Text>
                    <Text style={{fontFamily: "Roboto_500Medium", fontSize: 16}}>{day}</Text>
                </View>
                <View>
                    <Text style={{fontFamily: "Roboto_700Bold", color: '#fff', fontSize: 15, marginBottom: 5}}>{name}</Text>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Marker width={24} height={24} style={{height: 24, width: 24, marginRight: 5}}/>
                        <View>
                            <Text style={{color: '#fff'}}>Chicago Stadium</Text>
                            <Text style={{color: '#03DAC5'}}>1901 W Madison St</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default BannerSlider;