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
        borderColor:"#D3D3D3",
        borderWidth:1,
        // margin:12,
        color:"black",
        fontSize:18,
        width:'60%',
        left:20,
       // textAlign:'left',
        justifyContent: "center",
        textAlign: "center"
        //borderRadius:35
    },
    inputFieldqr:{
        borderColor:"#D3D3D3",
        borderWidth:1,
        // margin:12,
        color:"black",
        fontSize:14,
        width:'60%',
        left:22,
        textAlign:'left',
        justifyContent: "center",
    },
    button:{
        backgroundColor:"#2B2A8C",
        height:50,
        width:300,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
        marginTop:20,
        marginBottom:50,
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
        height: 58,
        top:40,
        left:30,
        borderWidth:3,
        borderColor:'black'
        
      },
   
})

export default Styles;