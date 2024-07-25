import React, { useEffect, useRef, useState } from 'react'
import { getCompletedTask, getData, storeCompletedTask, storeData } from '../utils/AsyncStorage';
import { Animated, FlatList, GestureResponderEvent, Modal, PanResponder, PanResponderGestureState, PanResponderInstance, Pressable, StyleSheet, Text, TextInput, ToastAndroid, useColorScheme, View } from 'react-native';
import { darkTheme, lightTheme } from '../constants/Theme';
import { CalendarRange, Check, CheckSquare, Circle, CircleDot, PlusIcon, Square, TimerIcon, X } from 'lucide-react-native';
import { black, gray, secondaryColor, white } from '../constants/colors';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import List from '../components/List';
import DatePicker from 'react-native-date-picker';
import { Button, IconButton, MD3Colors } from 'react-native-paper';





const categories = [{
  id:'1',
  name:'Default'
},{
  id:'2',
  name:'Shopping'
},{
  id:'3',
  name:'Wishlist'
},{
  id:'4',
  name:'Task'
},{
  id:'5',
  name:'Personal'
}]

const Mainscreen = () => {
  const [task,setTask] = useState<string>('');
  const [savedData,setSavedData] = useState<any|[]>([]);
  const [time,setTime] = useState('');
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(colorScheme);
  const conditionTheme = (colorScheme === 'dark');
  const date = new Date().getDate();
  const month = new Date().toLocaleString('en-US',{month:'long'});
  const year = new Date().getFullYear();
  const presentDay = new Date().toLocaleString('en-US',{weekday:'long'});
  const [isModalVisible,setIsModalVisible] = useState(false);
  const [tag,setTag] = useState('');
  const [selectedDate,setSelectedDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
  const [timePicker,setTimePicker] = useState(false);
  const [tagIsSelected,setTagIsSelected] = useState('Default');
  const navigation = useNavigation<any>();
  const [selected,setSelected] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [currentdate, setcurrentDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [timeSelected,setTimeSelected] = useState(new Date())
  const [cSavedData, setCSavedData] = useState<any | [] >([]);
  const noOfInCompletedTask = savedData.length; 
  const noOfCompletedTask = cSavedData.length;


  useEffect(()=>{
   const fetchingSavedTasks = async()=>{
    try{
    const data = await getData();
    const cdata = await getCompletedTask();
    setCSavedData(cdata);
    // console.log('hdhdf',data)
     setSavedData(data || []);
    }catch(error){
    console.log('Error fetching data',error)
    }
   }
   fetchingSavedTasks();
   console.log(selectedDate);
   console.log(savedData);
  },[])

const fadeIn=()=>{
  Animated.timing(fadeAnim,{
    toValue:1,
    duration:3000,
    useNativeDriver:true,
   }).start()
}
  

  

const AddTask = async () => {
  const uuid = Date.now();
  if (!task.trim()) {
    ToastAndroid.show('Please enter your task', ToastAndroid.SHORT);
  } else {
    const newTask = {
      id: uuid,
      task,
      tag: tagIsSelected,
      duedate:currentdate,
      date:currentdate.toLocaleDateString(),
      completed:false,
    };
  
    const updatedTask = [...savedData, newTask];
    console.log('first stored data:',updatedTask);
    setSavedData(updatedTask);
    await storeData(updatedTask);
    setTask('');

    setTimeout(() => {
      setIsModalVisible(false);
    }, 10);
  }
  
}

  const deleteTask = async (id:any) => {
    const updatedTask = savedData.filter((item:any) => item.id !== id);
    setSavedData(updatedTask);
    await storeData(updatedTask);
  }
  

  const filterToObject = async(array:any,condition:any)=>{
    const filteredArray = await array.filter(condition);
    return filteredArray.length > 0 ? filteredArray[0]:null
  }
  
  const completedTask = async (id: any) => {
    const updatedTask = savedData.map((item:any) =>
      item.id === id ? { ...item, completed: true } : item
    );
    const condition = (item:any) =>item.completed === true
    const updatedCompletedTask = await filterToObject(updatedTask,condition)
    console.log(updatedCompletedTask)
    JSON.stringify(updatedCompletedTask)
    await storeCompletedTask(updatedCompletedTask);
  };

  const handleModal = ()=>{
   setIsModalVisible(true)
  }

  const selectTag=(tag:string)=>{
    setTag(tag);
    setTagIsSelected(tag)
  }

  const panResponder = useRef(
    PanResponder.create({
        // Respond to all touch events
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
            // Detect horizontal panning
            if (Math.abs(gestureState.dx) > Math.abs(gestureState.dy)) {
                // Horizontal panning detected
                if (gestureState.dx < -200) {
                    navigation.navigate('Sidescreen')
                } else {
                    navigation.navigate('Mainscreen')
                }
            }
        },
    })
).current as PanResponderInstance;
const handleMoment = ()=>{
  if(selectedDate.toLocaleDateString() == dayjs().toDate().toLocaleDateString()){
    return(
      <Text style={styles.dayText}>Today</Text>
    )
  }if(dayjs().toDate().toLocaleDateString() + 1 == selectedDate.toLocaleDateString()){
   return(
    <Text style={styles.dayText}>Tomorrow</Text>
   )
  }else{
    const desiredDate = selectedDate.toDateString();
    return(
      <Text style={styles.dayText}>{desiredDate}</Text>
    )
  }
}
const handleCompleted= async(id:any)=>{
  setSelected(id);
  await completedTask(id);
  deleteTask(id);
  console.log(completedTask)
}

return (
    <>
     <View style={conditionTheme?darkTheme.background:lightTheme.background}
       {...panResponder.panHandlers} // Attach panResponder handlers to the View
     >
      <View style={styles.outerDiv}>
       <View>
       <Text style={conditionTheme?darkTheme.headingText:lightTheme.headingText}>{date +' '+ month +', '+ year}</Text>
       <Text style={conditionTheme?darkTheme.accentText:lightTheme.accentText}>{noOfInCompletedTask} Incompleted tasks    {noOfCompletedTask} completed tasks</Text>
       </View>
       <View>
       <IconButton icon={()=><PlusIcon color={white} size={20}/>}  mode="outlined" onPress={()=>handleModal()}/>
       </View>
      </View>
      <View style={{width:'100%',height:1,marginVertical:10,backgroundColor:gray}}></View>
    {handleMoment()}
    <FlatList
     data={savedData}
     scrollEnabled
     renderItem={({item})=>
      <>
      <Animated.View key={item.id} style={{opacity:1}}>
      <Pressable style={styles.listDiv} key={item.id}>
      <View style={{flexDirection:'row'}}>
      <View style={{marginTop:5}}>
      <Pressable onPress={()=>handleCompleted(item.id)}>
       {selected == item.id ? <CircleDot color={gray} size={20}/>:<Circle color={gray} size={20}/>}  
      </Pressable>
     </View>
     <View style={{marginHorizontal:10}}>
     <Text style={styles.uncompletedTask}>{item.task}</Text>
     <Text style={styles.uncompletedTag}>{item.tag}</Text>
     </View>
    </View>
     <View>
      {/* <Text>{item.date}</Text> */}
     </View>
     </Pressable>
      </Animated.View>
     </>
     }
     keyExtractor={(item)=>(item.id)}/>
    </View>
    {/* Modal to add tasks */}
    <Modal
    animationType='fade'
    visible={isModalVisible}
    transparent={true}
    onRequestClose={()=>setIsModalVisible(false)}>
    <View style={[styles.modalView,conditionTheme?darkTheme.modalBg:lightTheme.modalBg]}>
      <Text style={conditionTheme?darkTheme.accentText:lightTheme.accentText}>Task to be Done:</Text>
      <TextInput style={styles.inputDiv} placeholder='Your Task' value={task} onChangeText={setTask}/>
      <Text style={conditionTheme?darkTheme.accentText:lightTheme.accentText}>Please click on the calender icon to select date and clock to select time</Text>

      <View style={{flexDirection:'row',justifyContent:'space-between',gap:5}}>
      <View style={styles.dateOuterDiv}>
      <Text style={styles.labelText}>Select Date</Text>
      <View style={styles.dateInputDiv}>
      <TextInput style={styles.inputDiv} onFocus={()=>setDatePicker(true)} editable={false} placeholder='Date' onChangeText={(item)=>setcurrentDate} value={currentdate.getUTCDate().toString() +'/'+ currentdate.getMonth().toString() +'/'+ currentdate.getFullYear().toString()}/>
      <Pressable style={styles.dateDiv} android_ripple={{color:gray, borderless:true}} onPress={()=>{setDatePicker(true),setTimePicker(false)}}>
      <CalendarRange color={gray} size={20}/>
      </Pressable>
      </View>
      {datePicker &&
      <DatePicker mode='date' date={currentdate} onDateChange={(item)=>{
        setcurrentDate(item)
        
      }} />
      }
      </View>
      <View style={styles.dateOuterDiv}>
      <Text style={styles.labelText}>Select Time</Text>
     <View style={styles.dateInputDiv}>
     <TextInput placeholder='Click on Icon' style={styles.inputDiv} editable={false}  value={timeSelected.toLocaleTimeString()} onChangeText={(item)=>setTimeSelected(item)} />
      <Pressable style={styles.timeDiv} android_ripple={{color:gray,borderless:true}} onPress={()=>{setTimePicker(true),setDatePicker(false)}}> 
      <TimerIcon color={gray} size={24}/>
      </Pressable>
     </View>
       
     
    </View>
      </View>
      { timePicker && 
         <Animated.View
         style={[{opacity:1}]} >
        <DatePicker locale='en-US' mode='time' date={timeSelected} onDateChange={setTimeSelected} />
        </Animated.View> }
    <View>
     <Text style={styles.labelText}>Select Categories</Text>
      <View style={styles.categoriesOuterDiv}>
      {categories.map((item)=>
      <Pressable key={item.id} style={styles.categoriesDiv}  onPress={()=>selectTag(item.name)}>
      <Text key={item.id} style={(tagIsSelected == item.name)?styles.categoriesText:styles.categoriesTextselect}>{item.name}</Text>
      </Pressable>
      )}
      </View>
    </View>
      <View style={styles.buttonDiv}>
        <View style={styles.button}>
          <IconButton icon={()=><X color={gray} size={20}/>} mode='outlined' iconColor={MD3Colors.tertiary10} onPress={()=>setIsModalVisible(false)}/>
        </View>
        <View style={styles.button}>
        <IconButton icon={()=><Check color={gray} size={20}/>} mode='outlined' iconColor={MD3Colors.tertiary10} onPress={()=>AddTask()}/>
        </View>
      </View>
    </View>
  </Modal>
    </>
  )
}

export default Mainscreen

const styles = StyleSheet.create({
  outerDiv:{
    marginTop:50,
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  categoriesTextselect:{
    color:gray,
    borderWidth:1,
    borderColor:gray,
    borderRadius:30,
    paddingHorizontal:10,
    paddingVertical:2,
  },categoriesDiv:{
    
  },modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical:'auto',
    margin: 20,
    borderRadius: 20,
    padding: 35,
    shadowColor: '#f0f0f0f',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.45,
    shadowRadius: 4,
    elevation: 5,
  },buttonDiv:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop:20,
    alignItems:'center'
  },button:{
    
  },categoriesOuterDiv:{
    flexWrap:'wrap',
    flexDirection:'row',
    gap:10
  },inputDiv:{
    width:'100%',
    height:50,
    borderRightWidth:0,
    borderLeftWidth:0,
    borderTopWidth:0,
    borderColor:gray,
    borderBottomWidth:1,
    marginBottom:10,
  },
  dateInputDiv:{
   flexDirection:'row',
   width:'100%',
   justifyContent:'space-between',

  },
  labelText:{
   color:gray,
   marginVertical:10,
  },dateDiv:{
    flexDirection:'row',
    marginLeft:-40,
    width:30,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    gap:5
  },timeDiv:{
    flexDirection:'column',
    marginLeft:-40,
    width:30,
    height:30,
    justifyContent:'center',
    alignItems:'center'

  },dateOuterDiv:{
    width:'50%',
    marginBottom:15,
  },date:{
    borderColor:gray,
    borderWidth:1,
    borderRadius:5,
    padding:10,
    width:35,
    height:40,
    textAlign:'center'
  },year:{
    width:80,
    borderColor:gray,
    borderWidth:1,
    borderRadius:5,
    padding:10,
    textAlign:'center'
  },categoriesText:{
    backgroundColor:gray,
    color:black,
    borderWidth:1,
    borderColor:gray,
    borderRadius:30,
    paddingHorizontal:10,
    paddingVertical:2,
  },listDiv:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:15
    
},uncompletedTag:{
  color:gray,

},uncompletedTask:{
  color:white,
  fontSize:16,
  marginBottom:5
},dayText:{
  marginVertical:10,
  borderWidth:1,
  borderRadius:40,
  borderColor:gray,
  padding:6,
  width:100,
  textAlign:'center'
}
})
