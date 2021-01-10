import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert, StyleSheet, Text, ScrollView } from 'react-native'
import cardValidator from 'card-validator'
import Button from './components/Button'
import CreditCardForm, { FormModel } from './components/CreditCardForm'

const App: React.FC = () => {
  const formMethods = useForm<FormModel>({
    // to trigger the validation on the blur event
    mode: 'onBlur',
    defaultValues: {
      holderName: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
    },
  })
  const cardNumber = formMethods.watch('cardNumber')
  const cardType = cardValidator.number(cardNumber).card?.niceType

  function onSubmit(model: FormModel) {
    Alert.alert('Success: ' + JSON.stringify(model, null, 2))
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <FormProvider {...formMethods}>
        <Text style={styles.title}>Payment details</Text>
        <CreditCardForm />
        <Button
          title={
            cardType
              ? `PAY $15.12 WITH ${cardType.toUpperCase()}`
              : 'PAY $15.12'
          }
          onPress={formMethods.handleSubmit(onSubmit)}
        />
      </FormProvider>
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
