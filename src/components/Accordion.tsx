import { useState } from 'react'
import { TouchableOpacity, StyleSheet, LayoutAnimation, View, Text } from 'react-native'

interface Props {
  title: string
  children: React.ReactNode
}
const Accordion = (props: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = (): void => {
    setIsOpen(value => !value)
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }

  return (
    <>
      <View style={styles.accordion}>
        <TouchableOpacity onPress={toggleOpen} activeOpacity={0.6}>
          <Text style={styles.accordion_text}>▼{props.title}</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.list, !isOpen ? styles.hidden : undefined]}>
        {props.children}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  accordion: {
    marginTop: 70,
    padding: 10,
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    width: '80%'
  },
  accordion_text: {
    fontSize: 20,
    textAlign: 'center'
  },
  hidden: {
    height: 0
  },
  list: {
    overflow: 'hidden',
    width: '80%'
  }
})
export default Accordion
