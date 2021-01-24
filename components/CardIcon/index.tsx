import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Image, StyleSheet, NativeModules } from 'react-native'
import cardValidator from 'card-validator'
import LibraryContext from '../../LibraryContext'

type Props = {
  cardNumber: string
}

type Card = {
  icon: number
  animation: any
  alternativeAnimation?: any
}

const CARDS: Record<string, Card> = {
  visa: {
    icon: require('./icons/visa.png'),
    animation: require('./lottie/visa.json'),
  },
  mastercard: {
    icon: require('./icons/mastercard.png'),
    animation: require('./lottie/mastercard.json'),
  },
  amex: {
    icon: require('./icons/amex.png'),
    animation: require('./lottie/amex.json'),
    alternativeAnimation: require('./lottie/amexBlue.json'),
  },
  discover: {
    icon: require('./icons/discover.png'),
    animation: require('./lottie/discover.json'),
  },
}

const CardIcon: React.FC<Props> = (props) => {
  const { useLottie } = useContext(LibraryContext)
  const { cardNumber } = props
  const { card } = cardValidator.number(cardNumber)

  // use a local state to prevent repetitive require calls
  const [LottieView] = useState(() => {
    if (!useLottie) return null
    return require('lottie-react-native')
  })

  const animRef = useCallback((node) => {
    if (node !== null) {
      node.play()
    }
  }, [])
  const data: Card = CARDS[card?.type || -1]

  if (!data) return null

  if (!LottieView) {
    return <Image style={styles.icon} source={data.icon} />
  }

  return (
    <LottieView
      ref={animRef}
      style={styles.lottie}
      source={data.animation}
      loop={false}
    />
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 48,
    height: 48,
  },
  lottie: {
    width: 36,
    height: 36,
  },
})

export default CardIcon
