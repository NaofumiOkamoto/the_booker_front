import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

interface RadioButtonProps {
  options: string[]
  selectedOption: string
  onSelect: (option: string) => void
}

const RadioButton = ({ options, selectedOption, onSelect }: RadioButtonProps): JSX.Element => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.button}
          onPress={() => { onSelect(option) }}
        >
          {selectedOption === option && <View style={styles.selectedIndicator} />}
          {selectedOption !== option && <View style={styles.indicator} />}
          <Text style={styles.text}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 100
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30
  },
  text: {
    fontSize: 26,
    marginLeft: 8,
    textAlign: 'left'
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: 'blue' // 選択された状態の色
  },
  indicator: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'blue'
  }
})

export default RadioButton
