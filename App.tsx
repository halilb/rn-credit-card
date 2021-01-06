import React, { useState } from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import CreditCardForm from './components/CreditCardForm'

const App: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Payment details</Text>
      <CreditCardForm />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingTop: 96,
    paddingHorizontal: 36,
  },
  title: {
    fontFamily: 'Avenir-Heavy',
    color: 'black',
    fontSize: 32,
    marginBottom: 32,
  },
})

export default App
