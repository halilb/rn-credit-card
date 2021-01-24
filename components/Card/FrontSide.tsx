import React, { useRef, useState, useEffect } from 'react'
import { Animated, LayoutRectangle, StyleSheet, Text, View } from 'react-native'
import { FormModel } from '../CreditCardForm'
import { CardFields } from './index'
import CardIcon from '../CardIcon'
import PlaceholderText from './PlaceholderText'

type Props = {
  model: FormModel
  focusedField: CardFields | null
}

const FrontSide: React.FC<Props> = ({ model, focusedField }) => {
  const [numberLayout, setNumberLayout] = useState<LayoutRectangle | null>(null)
  const [nameLayout, setNameLayout] = useState<LayoutRectangle | null>(null)
  const [
    expirationLayout,
    setExpirationLayout,
  ] = useState<LayoutRectangle | null>(null)

  const positionAnim = useRef(new Animated.ValueXY()).current
  const sizeAnim = useRef(new Animated.ValueXY()).current

  useEffect(() => {
    function animate(layout: LayoutRectangle) {
      Animated.spring(positionAnim, {
        toValue: {
          x: layout.x - 8,
          y: layout.y,
        },
        useNativeDriver: false,
      }).start()
      Animated.spring(sizeAnim, {
        toValue: {
          x: layout.width + 16,
          y: layout.height + 4,
        },
        useNativeDriver: false,
      }).start()
    }

    if (focusedField === null) {
      return
    }

    const layout = [numberLayout, nameLayout, expirationLayout][focusedField]
    if (layout) {
      animate(layout)
    }
  }, [
    focusedField,
    numberLayout,
    nameLayout,
    expirationLayout,
    sizeAnim,
    positionAnim,
  ])

  return (
    <>
      <View style={styles.header}>
        <CardIcon cardNumber={model.cardNumber} />
      </View>
      <PlaceholderText
        style={styles.numberText}
        value={model.cardNumber}
        placeholder="XXXX XXXX XXXX XXXX"
        onLayout={({ nativeEvent }) => setNumberLayout(nativeEvent.layout)}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>CARDHOLDER NAME</Text>
        <Text style={styles.labelText}>Expires</Text>
      </View>
      <Text
        style={[
          styles.bottomText,
          styles.nameText,
          {
            color: model.holderName ? 'white' : 'gray',
          },
        ]}
        numberOfLines={1}
        onLayout={({ nativeEvent }) => setNameLayout(nativeEvent.layout)}
      >
        {model.holderName.toUpperCase() || 'NAME SURNAME'}
      </Text>
      <PlaceholderText
        style={[styles.bottomText, styles.expirationText]}
        value={model.expiration}
        placeholder="MM/YY"
        onLayout={({ nativeEvent }) => setExpirationLayout(nativeEvent.layout)}
      />
      <Animated.View
        style={[
          styles.outline,
          {
            left: positionAnim.x,
            top: positionAnim.y,
            width: sizeAnim.x,
            height: sizeAnim.y,
          },
        ]}
      />
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'flex-end',
    margin: 8,
  },
  numberText: {
    position: 'absolute',
    top: '40%',
    left: 24,
    color: 'white',
    fontSize: 22,
    letterSpacing: 2,
    lineHeight: 36,
    fontFamily: 'RobotoMono_700Bold',
  },
  bottomText: {
    position: 'absolute',
    bottom: 24,
    fontSize: 12,
    letterSpacing: 2,
    color: 'white',
    fontFamily: 'RobotoMono_700Bold',
    alignSelf: 'flex-start',
  },
  nameText: {
    left: 24,
    maxWidth: '70%',
  },
  expirationText: {
    right: 24,
  },
  labelContainer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 24,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  labelText: {
    marginBottom: 4,
    fontSize: 12,
    fontFamily: 'RobotoMono_400Regular',
    color: 'white',
    letterSpacing: 1,
  },
  outline: {
    position: 'absolute',
    height: 38,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#f4d01a',
    borderRadius: 14,
  },
})

export default FrontSide
