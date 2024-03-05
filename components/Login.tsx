import React, { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Image, Modal, StatusBar, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }: any) => {
    const phoneInput = useRef<PhoneInput>(null);
    const [value, setValue] = useState("");
    const [visible, setVisible] = useState(false);
    const [confirm, setConfirm] = useState(null);

    const handlePhoneValidation = async () => {
        return phoneInput.current?.isValidNumber(value) || false;
    }

    const signInWithPhoneNumber = async (phoneNumber: any) => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
            setConfirm(confirmation);
            setVisible(false);
            return confirmation;
        } catch (error) {
            console.log(error);
            setVisible(false);
            throw error;
        }
    }

    const handleotpnavigation = async () => {
        const valid = await handlePhoneValidation();
        if (valid) {
            try {
                const check = await signInWithPhoneNumber(value);
                console.log(check);
                navigation.navigate('Otp', { confirm: check, phone: value });
            } catch (error) {
                Alert.alert("Too many requests, Please try again later.");
            }
        } else {
            console.warn("Invalid Number");
        }
    }

    const { width, height } = useWindowDimensions();
    const orientation = width > height ? 'landscape' : 'portrait';

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={"transparent"} />
            <View style={styles.imageContainer}>
                <Image source={require('../assets/banner.jpg')} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <View style={styles.divider}>
                    <Text style={styles.dividerText}>Login or SignUp</Text>
                </View>
                <Text style={styles.text}>Enter Your Mobile Number:</Text>
            </View>
            <View style={styles.inputContainer}>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={value}
                    defaultCode="IN"
                    containerStyle={styles.textInput}
                    textContainerStyle={styles.textInputContainer}
                    layout="first"
                    onChangeText={(text) => setValue(text)}
                    onChangeFormattedText={(text) => setValue(text)}
                    withDarkTheme={false}
                    withShadow
                    autoFocus
                />
                <TouchableOpacity style={styles.button} onPress={() => {
                    setVisible(true);
                    handleotpnavigation();
                }}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </View>
            <Modal visible={visible} onDismiss={() => console.log("Success")} transparent={true}>
                <View style={styles.modalWrapper}>
                    <View style={styles.modalView}>
                        <ActivityIndicator size={80} color="orange" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        marginBottom: "10%",
    },
    image: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    textContainer: {
        margin: "8%",
        maxWidth: '80%',
        maxHeight: "10%",
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    divider: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: '2%'
    },
    dividerText: {
        fontSize: 18
    },
    text: {
        fontSize: 18
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        gap: 50
    },
    textInput: {
        width: "80%",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    textInputContainer: {
        borderRadius: 10
    },
    button: {
        backgroundColor: 'orange',
        width: "80%",
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18
    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        flex: 1,
        width: '70%',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Login;
