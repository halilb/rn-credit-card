import React, { useEffect, useRef } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import FlipCard from 'react-native-card-flip'

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

function usePrevious(value: any) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

const background = require('../../assets/background.png')

const Card: React.FC<Props> = ({ model, focusedField }) => {
  const previousFocused = usePrevious(focusedField)
  const cardRef = useRef<FlipCard>()

  useEffect(() => {
    const switchToBack =
      focusedField === CardFields.CVV && previousFocused !== CardFields.CVV
    const switchToFront =
      focusedField !== CardFields.CVV && previousFocused === CardFields.CVV

    if (switchToBack || switchToFront) {
      cardRef.current?.flip()
    }
  }, [focusedField, previousFocused])

  return (
    <>
      {/* @ts-ignore */}
      <FlipCard style={styles.container} ref={cardRef}>
        <>
          <Image style={styles.background} source={background} />
          <FrontSide model={model} focusedField={focusedField} />
        </>
        <>
          <Image style={styles.background} source={background} />
          <BackSide model={model} />
        </>
      </FlipCard>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    paddingVertical: 24,
    borderRadius: 12,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
})

export default Card
