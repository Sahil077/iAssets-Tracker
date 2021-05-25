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
        // paddingTop:20,
    },
    formArea:{
        margin:22,
        paddingTop:20
    },
    inputField:{
        borderColor:"#0197f6",
        borderBottomWidth:2,
        margin:12,
        color:"black",
        fontSize:25,
        width:'80%',
        //borderRadius:35
    },
    button:{
        top:50,
        backgroundColor:"#2B2A8C",
        height:50,
        width:300,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
        //  marginTop:180,
        //  marginBottom:100,
        // bottom:850,
        marginLeft:30,
    },
    buttonText:{
        color:'#FFFF',
        fontSize:20,
        fontWeight:"bold"
    },
    Uploadbutton:{
        backgroundColor:"#2B2A8C",
        height:80,
        width:300,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
        marginTop:20,
        marginLeft:30
    },
    frombutton:{
        backgroundColor:"#0197f6",
        height:50,
        width:100,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
        marginTop:20,
        // marginLeft:30
    },
    tobutton:{
        backgroundColor:"#0197f6",
        height:50,
        width:100,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
        marginTop:20,
        marginLeft:10
    },
    Searchbutton:{
        backgroundColor:"#2B2A8C",
        height:50,
        width:80,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:50,
        marginTop:20,
        right:9
    },
    head: { 
        height: 50, 
        backgroundColor: 'grey' , 
        width:375,
       
    },
    text: { 
        fontSize:20,
        color:'white',
        left:25
    },
    head1: { 
        height: 50, 
        backgroundColor: 'white' , 
        width:375,
    },
    text1: { 
        fontSize:20,
        color:'black',
        left:12
    },
    buttonDate:{
        top:22,
        right:15,
        width:120,
        margin:5
    },



    row: { flexDirection: 'row', backgroundColor: '#ffff' },
    btn: { width: 58, height: 18, backgroundColor: 'red',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#ffff' }
   
})

export default Styles;