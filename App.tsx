import React, { useState } from 'react'
import { StyleSheet, Text, ScrollView } from 'react-native'
import CreditCardForm from './components/CreditCardForm'

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Payment details</Text>
      <CreditCardForm />
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
