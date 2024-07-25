import React, { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { gray, white } from '../constants/colors';
import { CheckSquare, Square } from 'lucide-react-native';

interface Datatype{
    id:string;
    task:string;
    tag:string;
    completed:boolean;
}

const List = ({id,task,completed,tag}:Datatype) => {
    const [selected,setSelected] = useState(false);
    if(completed === true){
        return (
            <>
            <View style={styles.listDiv} key={id}>
            <View>
             {(completed === true) && 
             <Pressable onPress={()=>setSelected(completed)}>
             <CheckSquare color={gray} size={24}/>
             </Pressable>}
            </View>
            <View>
            <Text style={styles.completedTask}>{task}</Text>
            <Text style={styles.completedTag}>{tag}</Text>
            </View>
            </View>
            </>
           )
    }else{
        return (
            <>
            <View style={styles.listDiv} key={id}>
            <View style={{margin:5}}>
             {(completed === false) &&
             <Pressable onPress={()=>setSelected(completed)}>
            <Square color={gray} size={24}/>
             </Pressable>}
            </View>
            <View>
            <Text style={styles.uncompletedTask}>{task}</Text>
            <Text style={styles.uncompletedTag}>{tag}</Text>
            </View>
            </View>
            </>
           )
    }
 
}

export default List
const styles = StyleSheet.create({
    completedTask:{
        textDecorationLine:'line-through',
        color:gray,
    },
    uncompletedTask:{
        color:white,
        fontSize:18,
    },completedTag:{
        textDecorationLine:'line-through',
        color:gray,
    },
    uncompletedTag:{
        color:gray,

    },listDiv:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'flex-start',
        marginVertical:5
        
    }
})
