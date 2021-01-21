import React, { useRef, useState, useEffect } from 'react'
import {
  Animated,
  Image,
  LayoutRectangle,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { FormModel } from '../CreditCardForm'
import { CardFields } from './index'
import NumberText from './NumberText'
import ExpirationText from './ExpirationText'

type Props = {
  model: FormModel
  focusedField: CardFields | null
}

const background = require('../../assets/background.png')
const mastercard = require('../../assets/mastercard.png')

const Card: React.FC<Props> = ({ model, focusedField }) => {
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
    <View style={styles.container}>
      <Image style={styles.background} source={background} />
      <View style={styles.header}>
        <Image style={styles.icon} source={mastercard} />
      </View>
      <NumberText
        cardNumber={model.cardNumber}
        onLayout={({ nativeEvent }) => setNumberLayout(nativeEvent.layout)}
      />
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>CARDHOLDER NAME</Text>
        <Text style={styles.labelText}>Expires</Text>
      </View>
      <Text
        style={[styles.bottomText, styles.nameText]}
        numberOfLines={1}
        onLayout={({ nativeEvent }) => setNameLayout(nativeEvent.layout)}
      >
        {model.holderName.toUpperCase() || 'NAME SURNAME'}
      </Text>
      <ExpirationText
        style={[styles.bottomText, styles.expirationText]}
        expiration={model.expiration}
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    padding: 24,
    paddingTop: 0,
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
  header: {
    flex: 1,
    alignItems: 'flex-end',
  },
  bottomText: {
    position: 'absolute',
    bottom: 24,
    fontSize: 12,
    color: 'white',
    letterSpacing: 2,
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
  icon: {
    width: 48,
    height: 48,
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

export default Card
