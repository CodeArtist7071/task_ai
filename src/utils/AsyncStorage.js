import AsyncStorage from "@react-native-async-storage/async-storage";



export const storeData = async(tasks)=>{

  try{
    const JSONvalue = JSON.stringify(tasks)
    await AsyncStorage.setItem('tasks',JSONvalue);
    console.log('data-stored',JSONvalue);
  }catch(e){
   console.log('Saving error',e)
  }
}


export const getData = async()=>{
    try{
    const value = await AsyncStorage.getItem('tasks');
    if(value!== null){
      const storedValue =  JSON.parse(value)
      return storedValue;
    }else{
        return [];
    }
    }catch(e){
        console.log('Data fetching error',e)
    }
}


export const getCompletedTask = async()=>{
  try{
   const value = await AsyncStorage.getItem('completedTasks');
   if(value !== null){
    const storedValue =JSON.parse(value);
   return storedValue;
  }else{
      return [];
  }
  }catch(e){
    console.log('Error loading completed task',e)
  }
 
}



export const storeCompletedTask = async (completedTask) => {
  let existingTasks = [];
  try {
    console.log('Object:', completedTask);

    // Load existing completed tasks from AsyncStorage
    const existingTasksJSON = await AsyncStorage.getItem('completedTasks');
    existingTasks = existingTasksJSON ? JSON.parse(existingTasksJSON) : [];

    // Append the new completed task to the existing tasks array
    existingTasks.push(completedTask);

    // Store the updated list back into AsyncStorage
    await AsyncStorage.setItem('completedTasks', JSON.stringify(existingTasks));
    
    console.log('Stored Completed Tasks:', existingTasks);
  } catch (e) {
    console.log('Error storing completed task:', e);
  }
};



export const removeData= async(key)=>{
    try{
      await AsyncStorage.removeItem(key)
    }catch(e){
      console.log('Error removing data',e)
    }
}


export const clearAll = async()=>{
    try{
    await AsyncStorage.clear()
    }catch(e){
     console.log('Error Removing all data',e)
    }
}