import React from "react";
import {View , Text,  TextInput ,StyleSheet, TouchableOpacity, ScrollView,Alert } from "react-native";
import Styles from "../Registration/styles";
import { AntDesign , FontAwesome , Entypo } from '@expo/vector-icons'; 

const Registration = () => {

    const onPress = async () => {
        console.warn("clicked")
    }

    return(
        <ScrollView>
        <View style={Styles.container}>

            <View style={Styles.heading}>
               <Text style={{fontSize:30, fontWeight: 'bold', color:"#ADD8E6"}} >Nekkanti Foods</Text>  
                <Text style={{fontSize:30,  fontWeight: 'bold', color:"#ADD8E6"}} >Supplier Registration</Text>  
            </View>
            
            <View style={Styles.formArea}>

            <View style={{flexDirection:'row', marginTop:20}}>
            <FontAwesome name="user" size={40} color="black" />
            <TextInput
                style={Styles.inputField}
                placeholder="Enter Display Name"
            />
            </View>
           
            <View style={{flexDirection:'row', marginTop:20}}>
            <Entypo name="email" size={30} color="black" />
            <TextInput
                style={Styles.inputField}
                placeholder='Enter Email'
            />
            </View>
           
            <View style={{flexDirection:'row', marginTop:20}}>
            <FontAwesome name="lock" size={40} color="black" />
            <TextInput
                style={Styles.inputField}
                placeholder='Enter Password'
                secureTextEntry={true}
            />
            </View>

            </View>
           
             
             
       
               
            <TouchableOpacity onPress={onPress}>
                <View style={Styles.button}>
                    <Text style={Styles.buttonText}>
                      <AntDesign name="arrowright" size={40} style={{marginTop:35}} color="#FFFF" />
                    </Text>
                </View>
            </TouchableOpacity> 
        </View>
        </ScrollView>
    )
}
  

export default Registration;