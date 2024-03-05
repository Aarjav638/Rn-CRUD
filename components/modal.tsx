import React, { useState } from 'react'
import { Button, Modal, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'



const Customodal = ({ navigation }: any) => {

    const [modalVisible, setModalVisible] = useState(false)

    const handleModal = () => {
        console.log('Modal')
        setModalVisible((prevState) => !prevState)
    }

    const goToUserForm = () => {
        navigation.navigate("UserForm")
    }
    const { width, height } = useWindowDimensions();
const orientation = width > height ? 'landscape' : 'portrait';
    return (
            <View style={styles.main}>
            <Modal visible={modalVisible} animationType='fade' onDismiss={() => { console.log("modal closed") }} transparent={true} >
                <View style={styles.modalWrapper}>
                    <View style={[styles.modalView,{height:orientation === 'landscape' ? '60%' : '30%',width:orientation === 'landscape' ? '50%' : '70%'}]}>
                        <Text style={{ color: '#fff', margin: 10 }}>
                            HELLO AARJAV
                        </Text>
                        <Button title='Close Modal' onPress={handleModal} />

                    </View>
                </View>
            </Modal>
            <View style={styles.button}>
                <Button title='Show/Hide Modal' onPress={handleModal} />
            </View>
            <View style={{ margin: 20,alignSelf:"center" }}>
                <Button title='go to user' onPress={goToUserForm} />
            </View>
            </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1
    },
    button: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalView: {
        
        width: '70%',
        backgroundColor: 'blue',
        borderRadius: 20,
        elevation: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 50,
        shadowColor: 'black',
    },
    modalWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
})

export default Customodal;
