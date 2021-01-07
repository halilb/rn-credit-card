import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'
import Button from './Button'
import FormTextField from './FormTextField'

interface FormModel {
  holderName: string
  cardNumber: string
  expiration: string
  cvv: string
}

const CreditCardForm: React.FC = () => {
  const formMethods = useForm<FormModel>({
    defaultValues: {
      holderName: '',
      cardNumber: '',
      expiration: '',
      cvv: '',
    },
  })

  function onSubmit(model: FormModel) {
    console.log('form submitted', model)
  }

  return (
    <View>
      <FormProvider {...formMethods}>
        <FormTextField
          style={styles.textField}
          name="holderName"
          label="Cardholder Name"
        />
        <FormTextField
          style={styles.textField}
          name="cardNumber"
          label="Card Number"
        />
        <View style={styles.row}>
          <FormTextField
            style={[
              styles.textField,
              {
                marginRight: 24,
              },
            ]}
            name="expiration"
            label="Expiration Date"
          />
          <FormTextField
            style={styles.textField}
            name="cvv"
            label="Security Code"
            keyboardType="number-pad"
          />
        </View>
        <Button
          title="PAY $15.12"
          onPress={formMethods.handleSubmit(onSubmit)}
        />
      </FormProvider>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 36,
  },
  textField: {
    flex: 1,
    marginTop: 24,
  },
})

export default CreditCardForm
