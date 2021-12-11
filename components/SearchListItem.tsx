import React, {FC} from 'react'
import {View, Text, Image} from 'react-native'
import moment from "moment";
import Marker from "../assets/images/marker.svg";

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
const SearchListItem: FC<TournamentProps> = ({name, tournamentStart}) => {
    let momentObj = moment(tournamentStart, 'YYYY-MM-DD h:mm');
    let month = moment(momentObj).format('MMM').toUpperCase();
    let day = moment(momentObj).format('DD').toUpperCase();
    return (
        <View style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            alignSelf: 'baseline',
            overflow: 'hidden'
        }}>
            <View>
                <View style={{
                    width: 45,
                    height: 45,
                    backgroundColor: '#E4FFF9',
                    borderRadius: 10,
                    margin: 15,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={{fontFamily: "Roboto_700Bold", fontSize: 12, color: "#03DAC5"}}>{month}</Text>
                    <Text style={{fontFamily: "Roboto_500Medium", fontSize: 12}}>{day}</Text>
                </View>
            </View>
            <View>
                <Text style={{fontFamily: "Roboto_700Bold", color: '#fff', fontSize: 15, marginBottom: 5}}>{name}</Text>

                {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
                {/*    <Marker width={20} height={20} style={{height: 24, width: 24, marginRight: 5}}/>*/}
                {/*    <View>*/}
                {/*        <Text style={{color: '#fff', fontSize: 13}}>Chicago Stadium</Text>*/}
                {/*        <Text style={{color: '#03DAC5', fontSize: 13}}>1901 W Madison St</Text>*/}
                {/*    </View>*/}
                {/*</View>*/}
            </View>
        </View>
    );
}

export default SearchListItem