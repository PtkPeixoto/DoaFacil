import React from 'react';
import { View, Text, Button } from 'react-native';
import defaultStyles from '../../assets/styles';
import { getDonations } from '../../Api/functions';


const Dashboard = () => {
    return (
        <View style={defaultStyles.container}>
        <Text style={defaultStyles.text}>Dashboard</Text>
        <Button onPress={()=>{getDonations();}} title='Get Donations' />
        </View>
    );
};


export default Dashboard;