import React from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar, SafeAreaView } from 'react-native';

const UserData = ({ route }: any) => {
    const name = route.params.name;
    const email=route.params.email
    const city = route.params.city;
    const state = route.params.state;
    const pincode = route.params.pincode;

    return (
        <SafeAreaView style={{flex:1,
            marginTop:'10%'}}>
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>User Data</Text>
            <View style={styles.userDataContainer}>
                    <Text style={styles.userData} >name:  {name}</Text>
                    <Text style={styles.userData} >Email:  {email}</Text>
                    <Text style={styles.userData} >city:  {city}</Text>
                    <Text style={styles.userData} >state:  {state}</Text>
                    <Text style={styles.userData} >picode:  {pincode}</Text>
            </View>
        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    userDataContainer: {
        alignItems: 'flex-start',
        width: '80%',
    },
    userData: {
        fontSize: 24,
        fontWeight: 'normal',
        marginBottom: 10,
    },
});

export default UserData;
