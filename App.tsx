import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert, StyleSheet, ScrollView } from 'react-native'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  RobotoMono_400Regular,
  RobotoMono_700Bold,
} from '@expo-google-fonts/roboto-mono'

import cardValidator from 'card-validator'
import Button from './components/Button'
import CreditCardForm, { FormModel } from './components/CreditCardForm'

const App: React.FC = () => {
  let [fontsLoaded] = useFonts({
    RobotoMono_400Regular,
    RobotoMono_700Bold,
  })
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

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <FormProvider {...formMethods}>
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
})

export default App
