import React from 'react'
import StackNavigation from './src/routes/StackNavigation'
import { PaperProvider } from 'react-native-paper'

const App = () => {
  return (
    <PaperProvider>
    <StackNavigation/>
    </PaperProvider>
  )
}

export default App
