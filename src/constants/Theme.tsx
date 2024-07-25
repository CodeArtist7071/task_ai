import { StyleSheet } from "react-native";
import { black, gray, secondaryColor, white } from "./colors";

export const lightTheme = StyleSheet.create({
    headingText:{
        color:black,
        fontSize:42,
        fontWeight:'600'
    },
    background:{
    width:'100%',
    height:'100%',
    backgroundColor:white,
    padding:25
    },
    accentText:{
        color:'gray',
        fontSize:14
    },subHeadingText:{
        fontSize:18,
        color:black
    },tags:{
        paddingVertical:2,
        paddingHorizontal:3,
        borderRadius:30,
        borderColor:gray,
        color:gray
    },selectedTags:{
        backgroundColor:gray,
        color:white
    },modalBg:{
        backgroundColor:secondaryColor
    }
});
export const darkTheme = StyleSheet.create({
    headingText:{
        color:white,
        fontSize:42,
        fontWeight:'600',
    },
    background:{
        width:'100%',
        height:'100%',
        backgroundColor:black,
        padding:25
        
    },
    accentText:{
        color:'gray',
        fontSize:14
    },subHeadingText:{
        fontSize:18,
        color:white
    },tags:{
        paddingVertical:3,
        paddingHorizontal:10,
        borderRadius:30,
        borderColor:gray,
        color:gray,
        borderWidth:1
    },selectedTags:{
        color:gray,
    },modalBg:{
        backgroundColor:secondaryColor
    }
    
});
