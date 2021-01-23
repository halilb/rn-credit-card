import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import CardIcon from '../CardIcon'
import { FormModel } from '../CreditCardForm'
import PlaceholderText from './PlaceholderText'

type Props = {
  model: FormModel
}

const tape = require('../../assets/tape.png')

const BackSide: React.FC<Props> = ({ model }) => {
  return (
    <>
      <View style={styles.black} />
      <View style={styles.tapeContainer}>
        <Image style={styles.tape} source={tape} />
        <View style={styles.cvvContainer}>
          <PlaceholderText
            style={styles.cvvText}
            value={model.cvv}
            placeholder="XXX"
          />
        </View>
      </View>
      <View style={styles.header}>
        <CardIcon cardNumber={model.cardNumber} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  black: {
    height: 48,
    width: '100%',
    backgroundColor: 'black',
    marginBottom: 16,
  },
  tape: {
    width: '70%',
    height: 28,
  },
  tapeContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  cvvContainer: {
    backgroundColor: 'transparent',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#f4d01a',
    borderRadius: 4,
  },
  cvvText: {
    backgroundColor: 'white',
    fontFamily: 'RobotoMono_700Bold',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  header: {
    flex: 1,
    alignItems: 'flex-end',
  },
  icon: {
    width: 48,
    height: 48,
  },
})

export default BackSide
