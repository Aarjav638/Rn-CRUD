import { ScrollView, Text, TextInput, TouchableOpacity, Modal, View, ActivityIndicator, StyleSheet, useWindowDimensions, ToastAndroid, StatusBar } from "react-native";
import React, { useEffect, useRef, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from "react-native-safe-area-context";
const UpdateForm = ({navigation,route}:any) => {
    const routeData=route.params
    const [nameError,setNameError]=useState(false)
    const [emailError,setEmailError]=useState(false)
    const [visible,setVisible]=useState(false)
    const [data, setData] = useState({
        id:routeData[0],
        name: routeData[1],
        email: routeData[2],
        city: routeData[3],
        state: routeData[4],
        pincode: routeData[5]
    });
    useEffect(() => {
        if (!data.name) {
            setNameError(true);
        } else {
            setNameError(false);
        }
    }, [data.name]);

    useEffect(() => {
        if (!data.email) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }, [data.email]);
    const UpdateData = async () => {
        if (nameError||emailError) {
            return false
        }else{
            console.log('updating', routeData[0])
        await handleSubmit()
        }
        
    }
    const { width, height } = useWindowDimensions();
const orientation = width > height ? 'landscape' : 'portrait';
    const inputRefs: React.RefObject<TextInput>[] = [
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null)
    ];


    const handleSubmit = async () => {
        try {
            setVisible(true)
            await handleUpdateData(data);
        } catch (error: any) {
            console.error('Error:', error.message);
        }

    };
    const handleUpdateData =async (data: any) => {
        firestore().collection('Users').doc(data.id).update(data).then(() => { 
           setVisible(false);navigation.navigate("UserScreen") }).catch((error) => { ToastAndroid.show("Something went wrong", ToastAndroid.SHORT); console.log(error) });
       }
  return (
    <SafeAreaView style={{flex:1}}>
        <Text style={{ fontSize: 18, margin: 20,alignSelf:'center' }}>Update Data</Text>
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', gap: 10 }} showsVerticalScrollIndicator={false}>
            <Text style={{ fontSize: 18 }}>Enter Your Name:</Text>
            <TextInput  ref={inputRefs[0]} style={styles.textInput} value={data.name} onChangeText={(value) =>setData({ ...data, name: value })} placeholder='Your Name' returnKeyType='next' onSubmitEditing={() => inputRefs[1].current?.focus()} />
            {nameError?<Text style={{ fontSize: 12,color:'red',alignSelf:'flex-start',marginLeft:50 }}>please Provide Name</Text>:null}
            <Text style={{ fontSize: 18 }}>Enter Your Email:</Text>
            <TextInput ref={inputRefs[1]} style={styles.textInput} keyboardType='email-address' value={data.email} onChangeText={(value) =>setData({ ...data, email: value })} placeholder='Email' returnKeyType='next' onSubmitEditing={() => inputRefs[2].current?.focus()} />
            {emailError?<Text style={{ fontSize: 12,color:'red',alignSelf:'flex-start',marginLeft:50 }}>please Provide Email</Text>:null}
            <Text style={{ fontSize: 18 }}>Enter Your City:</Text>
            <TextInput ref={inputRefs[2]} style={styles.textInput} value={data.city} onChangeText={(value) =>setData({ ...data, city: value })} placeholder='City' returnKeyType='next' onSubmitEditing={() => inputRefs[3].current?.focus()} />
            <Text style={{ fontSize: 18 }}>Enter Your State:</Text>
            <TextInput ref={inputRefs[3]} style={styles.textInput} value={data.state} onChangeText={(value) =>setData({ ...data, state: value })} placeholder='State' returnKeyType='next' onSubmitEditing={() => inputRefs[4].current?.focus()} />
            <Text style={{ fontSize: 18 }}>Enter Your Pincode:</Text>
            <TextInput ref={inputRefs[4]} style={styles.textInput} keyboardType='numeric' value={data.pincode} onChangeText={(value) =>setData({ ...data, pincode: value })} placeholder='pincode' onSubmitEditing={UpdateData} />

            <TouchableOpacity style={styles.button} onPress={UpdateData} activeOpacity={0.8}>
                <Text style={{ fontSize: 18, color: "blue" }}>Update</Text>
            </TouchableOpacity >
           
            <Modal visible={visible} onDismiss={() => { console.log("Success") }} transparent={true} >
                <View style={styles.modalWrapper}>
                    <View style={[styles.modalView,{height:orientation === 'landscape' ? '60%' : '30%',width:orientation === 'landscape' ? '50%' : '70%'}]}>
                    <ActivityIndicator size={80} color="orange" />
                    </View>
                </View>
            </Modal>
        </ScrollView>
        </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 10,
    },
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
    textInput: {
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
        margin: 10,
        width: '80%',
        borderRadius: 10
    },
    button: {
        backgroundColor: 'orange',
        width: '80%',
        justifyContent: 'center',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 20
    }
});

export default UpdateForm
