import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, Text, View } from 'react-native';

const Data = () => {
    const [data1, setData] = useState(undefined);
    const ApiData = async () => {
        const url = "https://jsonplaceholder.typicode.com/posts"
        const response = await fetch(url);
        const data = await response.json();
        setData(data)
    }
    useEffect(() => {
        ApiData()
    }, []);
    return (
        <SafeAreaView style={{ flex: 1,marginTop:'10%' }}>
            <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", margin: 10 }}>Data</Text>

            {data1 ?
                //flatlist
                <FlatList
                    data={data1}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ borderBottomWidth: 1, marginHorizontal: 10, borderColor: 'orange', marginBottom: 10, paddingBottom: 10, flex: 1 }}>
                                <View style={{ flexDirection: "row", gap: 20, margin: 8, paddingHorizontal: 8 }}>
                                    <Text style={{ color: 'orange', fontWeight: "bold", fontSize: 24 }}>ID</Text>
                                    <Text style={{ color: 'orange', fontWeight: 'bold', fontSize: 24 }}>Title</Text>

                                </View>
                                <View style={{ flexDirection: "row", gap: 10, padding: "3%", marginHorizontal: "2%" }}>
                                    <Text style={{ color: 'blue', fontWeight: "bold", fontSize: 18, flex: 1 }}>{item.id + "."}</Text>
                                    <Text style={{ color: 'blue', fontWeight: "bold", fontSize: 18, flexWrap: 'wrap', flex: 10 }}>{item.title.toUpperCase()}</Text>

                                </View>
                                <View style={{ gap: 10, padding: "3%", marginHorizontal: "2%", width: "95%" }} >
                                    <Text style={{ color: 'orange', fontWeight: "bold", fontSize: 24, flex: 1 }}>Content:</Text>
                                    <Text style={{ fontWeight: "bold", fontSize: 18, flex: 10 }}>{item.body}</Text>
                                </View>
                            </View>
                        )
                    }}
                />

                /* Using map and scrollview 
                {<ScrollView>
                 {data1.map((item:any,index:any)=>{
                     return(
                         <View key={index} style={{borderBottomWidth:0.7,marginBottom:8}}>
                             <View  style={{flexDirection:"row",gap:10,margin:8,paddingHorizontal:8}}>
                             <Text>ID</Text>
                             <Text>Title</Text>
         
                         </View>
                         <View style={{flexDirection:"row",gap:10,margin:8,paddingHorizontal:8}}>
                             <Text>{item.id+"."}</Text>
                             <Text>{item.title.toUpperCase()}</Text>
         
                         </View>
                         <View style={{gap:10,margin:8,paddingHorizontal:8}} >
                         <Text>Content:</Text>
                             <Text>{item.body}</Text>
                         </View>
                         </View>
                     )
                 })}</ScrollView> */
                : <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}><ActivityIndicator size={80} color="orange" /></View>
            }</SafeAreaView>
    )
}

export default Data
