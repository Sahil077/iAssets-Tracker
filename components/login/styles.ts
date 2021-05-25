import React from "react";
import {StyleSheet} from "react-native";


const Styles = StyleSheet.create({
    container:{
        marginRight:18,
        padding:10,
        backgroundColor:"#FFFF",
    },
    summaryheading:{
        fontSize:20
    },
    heading:{
        alignItems:'center',
        margin:20,
        paddingTop:30
    },
    formArea:{
        margin:22,
        paddingTop:15
    },
    inputField:{
        borderColor:"#392878",
        borderWidth:2,
        margin:12,
        color:"black",
        fontSize:20,
        width:'100%',
        height:50,
        borderRadius:35,
        textAlign: "center"
    },
    button:{
        // flexDirection:'row',
        backgroundColor:"#392878",
        height:50,
        width:280,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
        marginTop:80,
        marginBottom:200,
        marginLeft:50,
        bottom:70
    },
    buttonText:{
        fontSize:25,
        fontWeight:"bold",
        color:"#ffff",
        bottom:5,
        top:15,
        right:8
    },
    tinyLogo: {
        width: 200,
        height: 140,
        bottom:30
      },
      Tracker:{
        fontSize:25, fontWeight: 'bold', color:"#2B2A8C",bottom:45,right:80
      },
      NekkantiHeading:{
        fontSize:14, fontWeight: 'bold', color:"#2B2A8C",bottom:45,right:50
      },
      LoginHeading:{
        fontSize:30,  fontWeight: 'bold', color:"#2B2A8C",top:50
      }
   
})

export default Styles;