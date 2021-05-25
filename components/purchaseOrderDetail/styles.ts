import React from "react";
import {StyleSheet} from "react-native";


const Styles = StyleSheet.create({
    container:{
        // margin:10,
        padding:10,
        backgroundColor:"#FFFF",
    },
    heading:{
        alignItems:'center',
        margin:20,
       // paddingTop:30
    },
    formArea:{
        margin:8
    },
    inputField:{
        borderColor:"#0197f6",
        // borderBottomWidth:2,
        // margin:12,
        color:"black",
        fontSize:15,
        width:'60%',
        left:7,
        textAlign:'center'
        //borderRadius:35
    },
    button:{
        backgroundColor:"#2B2A8C",
        height:50,
        width:300,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
        marginTop:8,
        marginBottom:80,
        marginLeft:30
    },
    buttonText:{
        color:"white",
        fontSize:20,
        fontWeight:"bold"
    },
    head: { height: 60, backgroundColor: '#0000' , width:350},
    text: { margin: 6 },
    logo: {
        width: 66,
        height: 68,
        top:60,
        left:30,
        borderWidth:3,
        borderColor:'black',
        //marginBottom:80
        
      },
   
})

export default Styles;