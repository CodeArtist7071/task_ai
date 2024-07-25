import React, { useEffect, useRef, useState } from 'react'
import { getCompletedTask } from '../utils/AsyncStorage'
import { Animated, FlatList, GestureResponderEvent, PanResponder, PanResponderGestureState, PanResponderInstance, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import List from '../components/List';
import { darkTheme, lightTheme } from '../constants/Theme';
import { useNavigation } from '@react-navigation/native';
import { gray, white } from '../constants/colors';
import { CheckSquare, Circle, CircleDot, Square } from 'lucide-react-native';


const Sidescreen = () => {
  const [completedTasks,setCompletedTasks] =  useState<any>([]);
  const colorScheme = useColorScheme();
  const [theme,setTheme] = useState(colorScheme);
  const conditionTheme = (colorScheme === 'dark');
  const date = new Date().getDate();
  const month = new Date().toLocaleString('en-US',{month:'long'});
  const year = new Date().getFullYear();
  const presentDay = new Date().toLocaleString('en-US',{weekday:'long'});
  const [tag,setTag] = useState('');
  const navigation = useNavigation<any>();
  const [unselected,setUnSelected] = useState('');

  useEffect(()=>{
   const fetchingCompletedTask = async() =>{
   try{
    const data = await getCompletedTask();
    setCompletedTasks(data)
    // console.log('sidescreennssss',data)
   }catch(e){
    console.log('Error fetching completed tasks',e)
   }
   }
   fetchingCompletedTask()
  console.log('sidescreen',completedTasks);
  },[]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder:()=>true,
      onMoveShouldSetPanResponder:()=>true,

      onPanResponderMove:(e: GestureResponderEvent, gestureState: PanResponderGestureState)=>{
        if(Math.abs(gestureState.dx) > Math.abs(gestureState.dy)){
          if(gestureState.dx > 100){
           navigation.navigate('Mainscreen')
          }else{
            navigation.navigate('Sidescreen')
          }
        }
      }
    })
  ).current as PanResponderInstance;

  
  return (
    <>
      <View style={conditionTheme?darkTheme.background:lightTheme.background}
       {...panResponder.panHandlers} // Attach panResponder handlers to the View
     >
      <View style={styles.outerDiv}>
       <View>
       <Text style={conditionTheme?darkTheme.headingText:lightTheme.headingText}>{date + month + year}</Text>
       <Text style={conditionTheme?darkTheme.accentText:lightTheme.accentText}>{presentDay}</Text>
       </View>
       <View>
       
       </View>
      </View>
      <View style={{width:'100%',height:1,marginVertical:10,backgroundColor:gray}}></View>
   
    <FlatList
     data={completedTasks}
     renderItem={({item})=>
      <>
      <Animated.View key={item.id} style={{opacity:1}}>
      <Pressable style={styles.listDiv}>
      <View style={{flexDirection:'row'}}>
      <View style={{marginTop:10}}>
      <Pressable>
       {unselected == item.id ? <Circle color={gray} size={20}/>:<CircleDot color={gray} size={20}/>}  
      </Pressable>
     </View>
     <View style={{marginHorizontal:10}}>
     <Text style={item.completed ? styles.completedTask : null}>{item.task}</Text>
     <Text style={item.completed ? styles.completedTag : null}>{item.tag}</Text>
     </View>
    </View>
     <View>
      {/* <Text>{item.date}</Text> */}
     </View>
     </Pressable> 
      </Animated.View>
     </>
     }
     keyExtractor={(item)=>item.id}/>
    </View>
    </>
  )
}

export default Sidescreen

const styles = StyleSheet.create({
  completedTask:{
    textDecorationLine:'line-through',
    fontSize:16,
    color:gray,
   
  },
  completedTag:{
    textDecorationLine:'line-through',
    fontSize:13.5,
    color:gray,
  },
  listDiv:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:15
},outerDiv:{
  marginTop:50,
  display:'flex',
  flexDirection:'row',
  justifyContent:'space-between',
  alignItems:'center'
},uncompletedTag:{
  color:gray,
}
})
