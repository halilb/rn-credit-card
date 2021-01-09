import React from 'react'
import { Image, StyleSheet } from 'react-native'
import cardValidator from 'card-validator'

const VISA = require('./visa.png')
const MASTERCARD = require('./mastercard.png')
const AMEX = require('./amex.png')
const DISCOVER = require('./discover.png')

type Props = {
  cardNumber: string
}

const CardIcon: React.FC<Props> = (props) => {
  const { cardNumber } = props
  const { card } = cardValidator.number(cardNumber)

  let source
  switch (card?.type) {
    case 'visa':
      source = VISA
      break
    case 'mastercard':
      source = MASTERCARD
      break
    case 'discover':
      source = DISCOVER
      break
    case 'american-express':
      source = AMEX
      break
    default:
      break
  }

  if (!source) return null

  return <Image style={styles.image} source={source} />
}

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
  },
})

export default CardIcon
