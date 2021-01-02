import React, { useState } from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import TextField from './components/TextField'

export default function App() {
  const [name, setName] = useState('')

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Payment details</Text>
      <TextField
        value={name}
        label="Cardholder name"
        onChangeText={(text) => setName(text)}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {},
  content: {
    paddingTop: 96,
    paddingHorizontal: 36,
  },
  title: {
    fontFamily: 'Avenir-Heavy',
    color: 'black',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
  },
})
