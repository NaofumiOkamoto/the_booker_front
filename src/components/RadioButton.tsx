import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

interface RadioButtonProps {
  options: string[]
  selectedOption: string
  onSelect: (option: string) => void
}

const RadioButton = ({ options, selectedOption, onSelect }: RadioButtonProps): JSX.Element => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={selectedOption === option ? styles.selectedIndicator : styles.indicator}
            onPress={() => { onSelect(option) }}
          >
            <Text style={styles.text}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 100
  },
  box: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 23,
    textAlign: 'center'
  },
  selectedIndicator: {
    width: 150,
    height: 170,
    margin: 20,
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: 'lightsteelblue'
  },
  indicator: {
    width: 150,
    height: 170,
    margin: 20,
    justifyContent: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'gainsboro'
  }
})

export default RadioButton
