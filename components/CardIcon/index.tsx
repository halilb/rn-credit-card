import React, { useEffect, useRef } from 'react'
import { Image, StyleSheet } from 'react-native'
import cardValidator from 'card-validator'
import LottieView from 'lottie-react-native'

const VISA = require('./visa.png')
const MASTERCARD = require('./mastercard.png')
const AMEX = require('./amex.png')
const DISCOVER = require('./discover.png')

const mastercardJson = require('./mastercard.json')
const visaJson = require('./visa.json')
const discoverJson = require('./discover.json')
const amexJson = require('./amex.json')
const amexBlueJson = require('./amexBlue.json')

type Props = {
  cardNumber: string
}

const CardIcon: React.FC<Props> = (props) => {
  const { cardNumber } = props
  const { card } = cardValidator.number(cardNumber)

  const animRef = useRef()

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

  useEffect(() => {
    if (source && animRef.current) {
      animRef.current.play()
    }
  }, [source])

  if (!source) return null

  //return <Image style={styles.image} source={source} />
  return (
    <LottieView
      ref={animRef}
      style={{
        width: 36,
        height: 36,
      }}
      source={mastercardJson}
      loop={false}
    />
  )
}

const styles = StyleSheet.create({
  image: {
    width: 48,
    height: 48,
  },
})

export default CardIcon
