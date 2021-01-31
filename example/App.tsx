import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import {
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  RobotoMono_400Regular,
  RobotoMono_700Bold,
} from '@expo-google-fonts/roboto-mono'
import LottieView from 'lottie-react-native'

import CreditCardForm, { Button, FormModel } from 'rn-credit-card'

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
  const { handleSubmit, formState } = formMethods

  function onSubmit(model: FormModel) {
    Alert.alert('Success: ' + JSON.stringify(model, null, 2))
  }

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <FormProvider {...formMethods}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.avoider}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <CreditCardForm
            LottieView={LottieView}
            horizontalStart
            overrides={{
              labelText: {
                marginTop: 16,
              },
            }}
          />
        </KeyboardAvoidingView>
        {formState.isValid && (
          <Button
            style={styles.button}
            title={'CONFIRM PAYMENT'}
            onPress={handleSubmit(onSubmit)}
          />
        )}
      </SafeAreaView>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avoider: {
    flex: 1,
    padding: 36,
  },
  button: {
    margin: 36,
    marginTop: 0,
  },
})

export default App
