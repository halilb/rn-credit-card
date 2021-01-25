import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Alert, StyleSheet, ScrollView, View } from 'react-native'
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

  function onSubmit(model: FormModel) {
    Alert.alert('Success: ' + JSON.stringify(model, null, 2))
  }

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <FormProvider {...formMethods}>
      <View style={styles.container}>
        <CreditCardForm
          useLottie
          button={
            <Button
              title={'CONFIRM'}
              onPress={formMethods.handleSubmit(onSubmit)}
            />
          }
        />
      </View>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 36,
    paddingTop: 96,
  },
})

export default App
