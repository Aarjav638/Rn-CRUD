import React, { useState } from 'react'
import { ActivityIndicator, Alert, Button, Modal, StatusBar, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native'

const Otp = ({ navigation, route }: any) => {
  const phoneNo = route.params;
  const confirm = phoneNo.confirm;
  const [visible, setVisible] = useState(false);
  const [code, setCode] = useState('')
  const { width, height } = useWindowDimensions();
    const orientation = width > height ? 'landscape' : 'portrait';
  // console.log(confirm)
  async function confirmCode() {
    try {
      await confirm.confirm(code);
      setVisible(false);
      console.log('Success');
      navigation.navigate('HomeScreen');
    } catch (error) {
      setVisible(false);
      Alert.alert("Enter Valid OTP")
      console.log('Invalid code.');
      console.log('error', error)
    }
  }
  return (
    <View style={{ flex: 1, marginTop: '10%' }}>
      <StatusBar backgroundColor={"orange"} barStyle={"dark-content"} />
      <View style={{ flex: 1,}}>
        <Text style={{ fontSize: 20, marginTop: '30%', marginLeft: '10%' }}>Enter The Otp Sent to {'\n'}{phoneNo.phone}:</Text>
        <View style={{ flexDirection: 'row', width: '80%', gap: 10, margin: '10%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 20,color:'orange' }}>Otp:</Text>
          <TextInput maxLength={6} keyboardType='number-pad' placeholder='otp' style={{ borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 0.6, borderColor: 'orange', width: '80%' }} value={code} onChangeText={(text) => { setCode(text) }} />
        </View>

        <Button title='Submit' onPress={()=>{confirmCode();setVisible(true)}} color={'orange'} />
        <Modal visible={visible} onDismiss={() => { console.log("Success") }} transparent={true} >
                <View style={style.modalWrapper}>
                    <View style={[style.modalView, { height: orientation === 'landscape' ? '60%' : '30%', width: orientation === 'landscape' ? '50%' : '70%' }]}>
                        <ActivityIndicator size={80} color="orange" />
                    </View>
                </View>
            </Modal>
      </View>


    </View>
  )
}
const style = StyleSheet.create({

  modalView: {

      width: '70%',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
  },
  modalWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
  },


})
export default Otp
