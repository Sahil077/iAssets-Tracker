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
        paddingTop:30
    },
    formArea:{
        margin:22
    },
    inputField:{
        borderColor:"#ADD8E6",
        borderBottomWidth:2,
        margin:12,
        color:"black",
        fontSize:25,
        width:'80%',
        //borderRadius:35
    },
    button:{
        backgroundColor:"#ADD8E6",
        height:50,
        width:300,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
        marginTop:150,
        marginBottom:50,
        marginLeft:30
    },
    buttonText:{
        // color:"white",
        fontSize:20,
        fontWeight:"bold"
    },
   
})

export default Styles;