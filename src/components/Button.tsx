import { Text, TouchableOpacity, StyleSheet } from 'react-native'

interface Props {
  label: string
  disabled?: boolean
  onPress?: () => void
}
const CustomButton = (props: Props): JSX.Element => {
  const { label, onPress, disabled = false } = props
  return (
    <TouchableOpacity onPress={onPress} style={disabled ? styles.invalidButton : styles.button} disabled={disabled}>
      <Text style={styles.buttonLabel}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#467FD3',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 24
  },
  invalidButton: {
    backgroundColor: '#a9a9a9',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 24
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    color: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 24
  }
})

export default CustomButton
