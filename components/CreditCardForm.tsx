import React, { useRef } from 'react'
import { Keyboard, StyleSheet, TextInput, View } from 'react-native'
import { useForm, FormProvider } from 'react-hook-form'
import cardValidator from 'card-validator'
import Button from './Button'
import FormTextField from './FormTextField'
import {
  cardNumberFormatter,
  expirationDateFormatter,
} from '../utils/formatters'

interface FormModel {
  holderName: string
  cardNumber: string
  expiration: string
  cvv: string
}

const CreditCardForm: React.FC = () => {
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

  const holderNameRef = useRef<TextInput>(null)
  const cardNumberRef = useRef<TextInput>(null)
  const expirationRef = useRef<TextInput>(null)
  const cvvRef = useRef<TextInput>(null)

  function onSubmit(model: FormModel) {
    console.log('form submitted', model)
  }

  return (
    <View>
      <FormProvider {...formMethods}>
        <FormTextField
          style={styles.textField}
          ref={holderNameRef}
          name="holderName"
          label="Cardholder Name"
          rules={{
            required: 'Cardholder name is required.',
            validate: {
              isValid: (value: string) => {
                return (
                  cardValidator.cardholderName(value).isValid ||
                  'Cardholder name looks invalid.'
                )
              },
            },
          }}
          onSubmitEditing={() => cardNumberRef.current?.focus()}
        />
        <FormTextField
          style={styles.textField}
          ref={cardNumberRef}
          name="cardNumber"
          label="Card Number"
          keyboardType="number-pad"
          maxLength={19}
          validationLength={19}
          rules={{
            required: 'Card number is required.',
            validate: {
              isValid: (value: string) => {
                return (
                  cardValidator.number(value).isValid ||
                  'This card number looks invalid.'
                )
              },
            },
          }}
          formatter={cardNumberFormatter}
          onValid={() => expirationRef.current?.focus()}
        />
        <View style={styles.row}>
          <FormTextField
            style={[
              styles.textField,
              {
                marginRight: 24,
              },
            ]}
            ref={expirationRef}
            name="expiration"
            label="Expiration Date"
            keyboardType="number-pad"
            maxLength={5}
            validationLength={5}
            rules={{
              required: 'Expiration date is required.',
              validate: {
                isValid: (value: string) => {
                  return (
                    cardValidator.expirationDate(value).isValid ||
                    'This expiration date looks invalid.'
                  )
                },
              },
            }}
            formatter={expirationDateFormatter}
            onValid={() => cvvRef.current?.focus()}
          />
          <FormTextField
            style={styles.textField}
            ref={cvvRef}
            name="cvv"
            label="Security Code"
            keyboardType="number-pad"
            maxLength={4}
            validationLength={3}
            rules={{
              required: 'Security code is required.',
              validate: {
                isValid: (value: string) => {
                  const cardNumber = formMethods.getValues('cardNumber')
                  const { card } = cardValidator.number(cardNumber)
                  const cvvLength = card?.type === 'american-express' ? 4 : 3

                  return (
                    cardValidator.cvv(value, cvvLength).isValid ||
                    'This security code looks invalid.'
                  )
                },
              },
            }}
            onValid={() => {
              // form is completed so hide the keyboard
              Keyboard.dismiss()
            }}
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
