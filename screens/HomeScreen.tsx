import * as React from 'react';
import { StyleSheet , Text, View , TouchableOpacity , Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";

export default function HomeScreen() {

  const navigation = useNavigation();


   const onLoggedIn = () =>{
     navigation.navigate("LoginScreen")
   }

  return (
    <View style={styles.container}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: "https://media-exp1.licdn.com/dms/image/C4D0BAQGnMWHobMaJ8g/company-logo_200_200/0/1611815924858?e=2159024400&v=beta&t=5lGviJekTr8Xg7RP-0ESfWxiOH5x3pc9MAhbLfGBkn8",
              }}
            />
            <Text style={styles.title}>  Welcome To {"\n"} 
            iAsset Tracker</Text>
              
       <TouchableOpacity onPress={onLoggedIn}>
           <View style={styles.Secondbutton}>
             <Text style={styles.SecondbuttonText}>
                Log in
             </Text>
           </View>
        </TouchableOpacity> 
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:"#FFFF"
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color:'#2B2A8C'
  },
  button:{
    backgroundColor:"#2B2A8C",
    height:50,
    width:300,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:50,
    marginTop:50
},
buttonText:{
    color:"#FFFF",
    fontSize:20,
    fontWeight:"bold"
},
Secondbutton:{
  backgroundColor:"#2B2A8C",
  height:50,
  width:300,
  alignItems:"center",
  justifyContent:"center",
  borderRadius:50,
  marginTop:40
},
SecondbuttonText:{
  color:"#FFFF",
  fontSize:20,
  fontWeight:"bold"
},
tinyLogo: {
  width: 200,
  height: 140,
  bottom:80
}
});
