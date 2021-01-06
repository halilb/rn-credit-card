import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Button from './Button'
import TextField from './TextField'

const CreditCardForm: React.FC = () => {
  const [name, setName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiration, setExpiration] = useState('')
  const [cvv, setCvv] = useState('')

  function onSubmit() {
    console.log('form submitted')
  }

  return (
    <View>
      <TextField
        style={styles.textField}
        label="Cardholder Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextField
        style={styles.textField}
        label="Card Number"
        value={cardNumber}
        onChangeText={(text) => setCardNumber(text)}
      />
      <View style={styles.row}>
        <TextField
          style={[
            styles.textField,
            {
              marginRight: 24,
            },
          ]}
          label="Expiration Date"
          value={expiration}
          onChangeText={(text) => setExpiration(text)}
        />
        <TextField
          style={styles.textField}
          label="Security Code"
          value={cvv}
          onChangeText={(text) => setCvv(text)}
        />
      </View>
      <Button title="PAY $15.12" onPress={onSubmit} />
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
