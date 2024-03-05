import React, { useRef, useState } from 'react';
import { ActivityIndicator, Button, Image, Modal, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import BcryptReactNative from 'bcrypt-react-native';
const UserForm = ({ navigation }: any) => {
    const [visible, setVisible] = useState(false)
    const [password, setPassword] = useState(false);
    const [view, setView] = useState(false)
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: '',
        city: "",
        state: "",
        pincode: ""
    });

    const handleClear = () => {
        setData({
            name: "",
            email: "",
            password: "",
            confirmPassword: '',
            city: "",
            state: "",
            pincode: ""
        });
    };

    const { width, height } = useWindowDimensions();
    const orientation = width > height ? 'landscape' : 'portrait';
    const inputRefs: React.RefObject<TextInput>[] = [
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null),
        useRef<TextInput>(null)
    ];

    const saltRounds = 15;
    const hashPassword = async (password: string) => {
        setView(true);
            setPassword(true);
        setVisible(true)
        try {
            const salt = await BcryptReactNative.getSalt(saltRounds);
            if (!salt) {
                throw new Error('Failed to generate salt');
            }
            const hashedPassword = await BcryptReactNative.hash(salt, password);
            return hashedPassword;
        } catch (error: any) {
            console.error('Error hashing password:', error);
            throw new Error('Error hashing password: ' + error.message);
        }
    };


    const handleSubmit = async () => {
        try {
            const hashedPassword = await hashPassword(data.password);
            const updatedData = { ...data, password: hashedPassword };
            
            setData(updatedData);
            await PostData(updatedData);
        } catch (error: any) {
            console.error('Error:', error.message);
        }

    };
    const PostData = async (data: any) => {
        firestore().collection('Users').add(data).then(() => {
            setVisible(false); navigation.navigate("UserData", data)
        }).catch((error) => { ToastAndroid.show("Something went wrong", ToastAndroid.SHORT); console.log(error) });
    }
    const Validation = async () => {


        if (data.name && data.email && data.password.length >= 8 && data.city && data.state && data.pincode && data.password === data.confirmPassword) {
            await handleSubmit();
        } else {
            if (!data.name || !data.email || data.password.length < 8 || !data.city || !data.state || !data.pincode || data.password !== data.confirmPassword) {
                if (!data.name || !data.email || !data.city || !data.state || !data.pincode) {
                    ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
                } else if (data.password !== data.confirmPassword) {
                    ToastAndroid.show("Password and Confirm Password should be same", ToastAndroid.SHORT);
                }
                else {
                    ToastAndroid.show("Password should be at least 8 characters", ToastAndroid.SHORT);
                }
            } else {
                ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
            }
        }
    }
    return (
        <SafeAreaView style={{flex:1,marginTop:'10%'}}>
            <Text style={{ fontSize: 18, margin: 20,alignSelf:'center' }}>User Form</Text>
        <ScrollView style={styles.container} contentContainerStyle={{ alignItems: 'center', gap: 10 }} showsVerticalScrollIndicator={false}>

            

            <Text style={{ fontSize: 18 }}>Enter Your Name:</Text>
            <TextInput ref={inputRefs[0]} style={styles.textInput} value={data.name} onChangeText={(value) => setData({ ...data, name: value })} placeholder='Your Name' returnKeyType='next' onSubmitEditing={() => inputRefs[1].current?.focus()} />
            <Text style={{ fontSize: 18 }}>Enter Your Email:</Text>
            <TextInput ref={inputRefs[1]} style={styles.textInput} keyboardType='email-address' value={data.email} onChangeText={(value) => setData({ ...data, email: value.toLowerCase() })} placeholder='Email' returnKeyType='next' onSubmitEditing={() => inputRefs[2].current?.focus()} />
            <Text style={{ fontSize: 18 }}>Enter Your Password:</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
                width: '100%',
                gap: -40,
                marginRight: '6%'
            }}>
                <TextInput ref={inputRefs[2]} style={styles.textInput} maxLength={10} value={data.password} onChangeText={(value) => {
                    setData({ ...data, password: value })
                }} placeholder='Password' secureTextEntry={password} returnKeyType='next' onSubmitEditing={() => inputRefs[3].current?.focus()} />
                <TouchableOpacity style={{
                    alignSelf: "center",
                    justifyContent: 'center',
                }} onPress={() => setPassword(!password)} activeOpacity={0.8}>
                    <Image source={password ? require('../assets/view.png') : require('../assets/hide.png')} style={{ width: 20, height: 20, tintColor: password ? 'grey' : 'blue' }} />
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 18 }}>Confirm Password:</Text>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignSelf: 'center',
                width: '100%',
                gap: -40,
                marginRight: '6%'
            }}>
                <TextInput ref={inputRefs[3]} style={styles.textInput} maxLength={10} value={data.confirmPassword} onChangeText={(value) => {
                    setData({ ...data, confirmPassword: value })
                }} placeholder='Password' secureTextEntry={view} returnKeyType='next' onSubmitEditing={() => inputRefs[4].current?.focus()} />
                <TouchableOpacity style={{
                    alignSelf: "center",
                    justifyContent: 'center',
                }} onPress={() => setView(!view)} activeOpacity={0.8}>
                    <Image source={view ? require('../assets/view.png') : require('../assets/hide.png')} style={{ width: 20, height: 20, tintColor: view ? 'grey' : 'blue' }} />
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 18 }}>Enter Your City:</Text>
            <TextInput ref={inputRefs[4]} style={styles.textInput} value={data.city} onChangeText={(value) => setData({ ...data, city: value })} placeholder='City' returnKeyType='next' onSubmitEditing={() => inputRefs[5].current?.focus()} />
            <Text style={{ fontSize: 18 }}>Enter Your State:</Text>
            <TextInput ref={inputRefs[5]} style={styles.textInput} value={data.state} onChangeText={(value) => setData({ ...data, state: value })} placeholder='State' returnKeyType='next' onSubmitEditing={() => inputRefs[6].current?.focus()} />
            <Text style={{ fontSize: 18 }}>Enter Your Pincode:</Text>
            <TextInput ref={inputRefs[6]} style={styles.textInput} maxLength={6} keyboardType='numeric' value={data.pincode} onChangeText={(value) => setData({ ...data, pincode: value })} placeholder='pincode' onSubmitEditing={Validation} />

            <TouchableOpacity style={styles.button} onPress={Validation} activeOpacity={0.8}>
                <Text style={{ fontSize: 18, color: "blue" }}>Submit</Text>
            </TouchableOpacity >
            <TouchableOpacity style={styles.button} onPress={handleClear} activeOpacity={0.8}>
                <Text style={{ fontSize: 18, color: "red" }}>Clear</Text>
            </TouchableOpacity >
            <Modal visible={visible} onDismiss={() => { console.log("Success") }} transparent={true} >
                <View style={styles.modalWrapper}>
                    <View style={[styles.modalView, { height: orientation === 'landscape' ? '60%' : '30%', width: orientation === 'landscape' ? '50%' : '70%' }]}>
                        <ActivityIndicator size={80} color="orange" />
                    </View>
                </View>
            </Modal>
        </ScrollView>
        </SafeAreaView>)
}

export default UserForm;

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
