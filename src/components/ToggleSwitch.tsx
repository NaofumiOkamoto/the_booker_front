import React, { useRef, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback, Animated, StyleSheet } from 'react-native'

interface ToggleSwitchProps {
  selectedValue: string
  onToggle: (value: string) => void
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ selectedValue, onToggle }) => {
  const animation = useRef(new Animated.Value(selectedValue === '予約中' ? 0 : 1)).current

  useEffect(() => {
    Animated.timing(animation, {
      toValue: selectedValue === '予約中' ? 0 : 1,
      duration: 300,
      useNativeDriver: false
    }).start()
  }, [selectedValue])

  const toggleSwitch = (): void => {
    const newValue = selectedValue === '予約中' ? '予約終了' : '予約中'
    onToggle(newValue)
  }

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [5, 150] // 幅を調整する
  })

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={toggleSwitch}>
        <View style={styles.switchContainer}>
          <Animated.View style={[styles.switch, { transform: [{ translateX }] }]} />
          <Text style={[styles.text, selectedValue === '予約中' && styles.selectedText]}>予約中</Text>
          <Text style={[styles.text, selectedValue === '予約終了' && styles.selectedText]}>予約終了</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  switchContainer: {
    width: 300, // トグルスイッチの全体幅
    height: 50, // トグルスイッチの高さ
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  switch: {
    width: '50%', // トグルスイッチの半分の幅
    height: '100%',
    backgroundColor: 'gray',
    borderRadius: 10,
    position: 'absolute'
  },
  text: {
    flex: 1,
    textAlign: 'center',
    zIndex: 1 // テキストを前面に表示
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default ToggleSwitch
