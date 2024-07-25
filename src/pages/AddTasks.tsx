import React, { useState } from 'react'
import { TextInput, useColorScheme, View } from 'react-native'
import { darkTheme, lightTheme } from '../constants/Theme';

const AddTasks = () => {
    const colorScheme = useColorScheme();
    const [theme,setTheme] = useState(colorScheme)
    const conditionTheme = (theme === 'dark')
  return (
   <>
   <View style={conditionTheme?darkTheme.background:lightTheme.background}>
    <TextInput placeholder='Enter you Task' style={conditionTheme?darkTheme.accentText:lightTheme.accentText}/>
    </View> 
   </>
  )
}

export default AddTasks
