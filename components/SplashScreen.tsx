import React from "react";
import { View, Image, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = ({navigation}:any) => {

    return (
      <SafeAreaView style={{ flex: 1}}>
        <StatusBar backgroundColor={"orange"} barStyle={"dark-content"}/>
        <View style={{ flex:1.5,width:'100%',borderBottomLeftRadius:30,borderBottomRightRadius:30,backgroundColor:'orange' }}/>
          <View style={{alignItems:'center',justifyContent:'center',flex:1,marginTop:-200}}>
          <Image source={require('../assets/splash.png')} style={{ width: 125, height: 125 }} />
          </View>
        <View style={{flex:1,justifyContent:'flex-end', marginBottom: 20,alignItems: 'center' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'orange' }}>Splash Screen</Text>
        </View>
      </SafeAreaView>
    );
  
  }
  export default SplashScreen;