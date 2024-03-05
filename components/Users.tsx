import firestore from '@react-native-firebase/firestore';

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ActivityIndicator, Button, FlatList, StyleSheet, TouchableOpacity, Modal, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Users = ({navigation}:any) => {
    const [data, setData] = useState([]);
    const [isShown, setShown] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchData();
    },[]);

    // const fetchData = async () => {
    //     setLoading(true);
    //     try {
    //         const url = "http://192.168.137.171:3000/users";
    //         const response = await fetch(url);
    //         const data = await response.json();
    //         setData(data);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     } finally {
    //         setShown(!isShown);
    //         setLoading(false);
    //     }
    // }
    const fetchData = async () => {
        setLoading(true);
        try {
            // const url = "http://192.168.137.171:3000/users";
            const response = await firestore().collection('Users').get();
            const data = response.docs.map(doc => {
                return { id: doc.id, ...doc.data() }
            });
            console.log(data);
            const parsedData = JSON.parse(JSON.stringify(data));
            setData(parsedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setShown(!isShown);
            setLoading(false);
        }
    }
    // const deleteData = async (id: any) => {
    //     setLoading(true);
    //     try {
    //         const url = `http://192.168.137.171:3000/users/${id}`;
    //         await fetch(url, {
    //             method: "DELETE",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         await fetchData();
    //     } catch (error) {
    //         console.error("Error deleting data:", error);
    //     } finally {
    //         setShown(true);
    //         setLoading(false);
    //     }
    // }
    const deleteData = async (id: string) => {
        setLoading(true);
        try {
            // const url = `http://192.168.137.171:3000/users/${id}`;
            firestore()
                .collection('Users')
                .doc(id)
                .delete()
                .then(() => {
                    console.log('User deleted!');
                });
            await fetchData();
        } catch (error) {
            console.error("Error deleting data:", error);
        } finally {
            setShown(true);
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={80} color="orange" />
                </View>
            ) : isShown ?
                <View style={styles.listContainer}>
                    <FlatList
                        data={data}
                        renderItem={({ item, index }: any) => (
                            <View style={styles.itemContainer}>
                                <Text>ID: {item.id}</Text>
                                <Text>Name: {item.name}</Text>
                                <Text>Email: {item.email}</Text>
                                <Text>City:{item.city}</Text>
                                <Text>State:{item.state}</Text>
                                <Text>Pincode:{item.pincode}</Text>
                                <View style={{gap:10,marginTop:10,alignSelf:'center',flexDirection:'row'}}>
                                
                                <Button title='Update' onPress={() =>{navigation.navigate('UpdateForm',[item.id,item.name,item.email,item.city,item.state,item.pincode]);setShown(false)}} color={"orange"} />
                                <Button title="Delete" onPress={() => deleteData(item.id)} color={"orange"} />
                                </View>
                            </View>
                        )}
                        keyExtractor={(item: any) => item.id.toString()} // Update keyExtractor
                    />
                    
                </View> : null
            }
            <TouchableOpacity style={styles.buttonContainer} onPress={() => fetchData()} >
                <Text>{isShown && data.length > 0 ? "Hide Users" : "Show Users"}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    Modalcontainer: {
        marginVertical:50,
        alignItems:'center',
        gap: 10,
    },
    textInput: {
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
        margin: 10,
        width: '80%',
        borderRadius: 10
    },
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    listContainer: {
        flex: 10,
    },
    itemContainer: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    buttonContainer: {
        padding: 10,
        width: "80%",
        margin: '2%',
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange',
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

export default Users;
