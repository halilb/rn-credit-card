import React from 'react'
import { Text, StyleSheet, LayoutChangeEvent } from 'react-native'

type Props = {
  cardNumber: string
  onLayout: (event: LayoutChangeEvent) => void
}

const PLACEHOLDER = 'XXXX XXXX XXXX XXXX'

const NumberText: React.FC<Props> = (props) => {
  const { cardNumber, onLayout } = props
  const rest = PLACEHOLDER.substring(cardNumber.length)

  return (
    <Text style={styles.text} numberOfLines={1} onLayout={onLayout}>
      {cardNumber}
      <Text style={styles.placeholder}>{rest}</Text>
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    top: '45%',
    left: 24,
    color: 'white',
    fontSize: 22,
    letterSpacing: 2,
    lineHeight: 36,
    fontFamily: 'RobotoMono_700Bold',
  },
  placeholder: {
    color: 'gray',
  },
})

export default NumberText
