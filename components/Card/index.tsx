import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { FormModel } from '../CreditCardForm'
import BackSide from './BackSide'
import FrontSide from './FrontSide'

export enum CardFields {
  CardNumber,
  CardHolderName,
  Expiration,
  CVV,
}

type Props = {
  focusedField: CardFields | null
  model: FormModel
}

const background = require('../../assets/background.png')

const Card: React.FC<Props> = ({ model, focusedField }) => {
  const isBack = focusedField === CardFields.CVV

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={background} />
      {isBack ? (
        <BackSide model={model} />
      ) : (
        <FrontSide model={model} focusedField={focusedField} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    paddingVertical: 24,
    backgroundColor: '#38393A',
    borderRadius: 12,
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 12,
  },
})

export default Card
