import React , {useEffect, useState} from "react";
import {View , Text,  TextInput ,StyleSheet, TouchableOpacity, ScrollView,Alert, Image } from "react-native";
import Styles from "../login/styles";
import { AntDesign , FontAwesome , Entypo } from '@expo/vector-icons'; 
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import qs from "qs"

const login = () => {

    var [data,setdata]=useState({})
    var [userAlert , setuserAlert] = useState("")
    // var [passAlert , setpassAlert] = useState("")
    const navigation = useNavigation();
    const handleSubmit = async() => {
      
        const userDetails = JSON.stringify(data)
        const userData = JSON.parse(userDetails)
        // console.log(pp.password)
        // console.log(pp.username)
      //  navigation.navigate("WelcomeScreen")
      if(userData.username == undefined || userData.password == undefined || !userData.username || !userData.password){
        Alert.alert("Please Fill all the Details..!!")
      }
        axios({
            method: 'post',
            url: 'http://136.232.40.34:8888/testingdb/rest/Nekkanti/validateLogin',
            data: qs.stringify({
              username: userData.username,
              password: userData.password
            }),
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          }).then(async(resp)=>{
            // console.log("viendID................")
            //  console.log(resp.data.object.vendorId)
              // console.log(resp.data.object)
              // console.log("viendID................")
              if(resp.data.object == null){
                Alert.alert('Login',resp.data.message)
              }else if(resp.data.status && resp.data.status == false || resp.data.status === false)
              {
                  Alert.alert(resp.data.message)
              }else{
                  try{
                    await AsyncStorage.setItem('status', JSON.stringify(resp.data.status))
                    await AsyncStorage.setItem('vendorId', JSON.stringify(resp.data.object.vendorId))
                    await AsyncStorage.setItem('role', JSON.stringify(resp.data.object.role))
                    await AsyncStorage.setItem('username', JSON.stringify(userData.username))
                    await AsyncStorage.setItem('password',JSON.stringify(userData.password))
                    var ab = await AsyncStorage.getItem('vendorId')
                 //   console.log("###########  value" + ab)
                    navigation.navigate("WelcomeScreen")
                  } catch (e){
                    console.log("error",e)
                    navigation.navigate("LoginScreen")
                  }
              }

            })
    }

    const validateData=(e,type)=>{
      // console.log("type .........validate " + type + "......" + e + e.length)
      if(type == 'username'){
        if(e.length <= 0){
          // Alert.alert("Enter Correct Username") 
          setuserAlert('Enter Correct Username')
          // console.log(userAlert + "............")
        }
      }else if(type == 'password'){
        if(e.length < 8){
          // Alert.alert("password should be atleast 8 characters")
          setuserAlert('password should be atleast 8 characters')
          // setpassAlert('password should be atleast 8 characters')
        }
      }
    }

    useEffect(()=>{
        console.log('login USEeffect starts............')
        const userLogin = async() => {
            const username = await AsyncStorage.getItem('username');
            const password = await AsyncStorage.getItem('password');
            // ......................................
            // const User = JSON.stringify(username)
            // const Username = JSON.parse(User)
            // ......................................
            // const pass = JSON.stringify(password)
            // const PassWord = JSON.parse(pass)
            // ....................................... 
            if(username && password){
            console.log(username.replace(/"/g,"") + ' ' + password.replace(/"/g,""))
            console.log('here...')
            axios({
              method: 'post',
              url: 'http://136.232.40.34:8888/testingdb/rest/Nekkanti/validateLogin',
              data: qs.stringify({
                username: username.replace(/"/g,""),
                password: password.replace(/"/g,"")
              }),
              headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
              }
            }).then(async(resp)=>{
              console.log('inside the URL /..........')
              console.log(resp.data)
                if(resp.data.status == true){
                  navigation.navigate("WelcomeScreen")
                }else{
                  navigation.navigate("LoginScreen")
               } 
            })
          }else{
            console.log('newUser......####################')
          }  
        }
        userLogin()
    },[])

    return(
        <ScrollView>
        <View style={Styles.container}>

            <View style={Styles.heading}>
            
                <Text style={Styles.LoginHeading} >Supplier Login</Text>  
            </View>
            
            {/* <Text style={{color:'red',fontSize:25,marginTop:30}}> */}
               {(() => {
                  if (userAlert == 'Enter Correct Username') {
                    return (
                      <Text style={{color:'red',fontSize:25,marginTop:50}}>Enter Correct Username</Text>
                    )
                  } else if (userAlert == 'password should be atleast 8 characters') {
                    return (
                      <Text style={{color:'red',fontSize:25,marginTop:50}}>password should be atleast 8 characters</Text>
                    )
                  } else {
                    return (
                      <Text></Text>
                    )
                  }
                })()}
            {/* </Text> */}
              {/* <Text style={{color:'red',fontSize:25}}>{passAlert ? passAlert : ''}</Text> */}

            <View style={Styles.formArea}>

         
            <View style={{flexDirection:'row', marginTop:20}}>
            {/* <Entypo name="email" size={35} color="black" /> */}
            <TextInput
                style={Styles.inputField}
                placeholder=' Enter Your Username'
                value={data && data.username? data.username : ''}
                // onChangeText={(text)=>setdata({...data,"email":text.toLowerCase()})}
                onChangeText={(text)=>setdata({...data,"username":text})}
                numberOfLines={1}
                onEndEditing={(e)=>validateData(e.nativeEvent.text,'username')}
            />
            </View>
           
            <View style={{flexDirection:'row', marginTop:2}}>
            {/* <FontAwesome name="lock" size={40} color="black" /> */}
            <TextInput
                style={Styles.inputField}
                placeholder=' Enter Password'
                secureTextEntry={true}
                value={data && data.password? data.password : ''}
                onChangeText={(text)=>setdata({...data,"password":text})}
                onEndEditing={(e)=>validateData(e.nativeEvent.text,'password')}
            />
            </View>

            </View>
           
             
             
       
               
            <TouchableOpacity onPress={handleSubmit}>
                <View style={Styles.button}>
                    <Text style={Styles.buttonText}>
                        SignIn
                    </Text>
                      <AntDesign name="arrowright" size={35} style={{left:60,bottom:18}} color="#FFFF" />
                   
                </View>
            </TouchableOpacity> 
        </View>
        </ScrollView>
    )
}
  

export default login;