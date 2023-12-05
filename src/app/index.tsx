import { View, StyleSheet } from 'react-native'
import Header from '../components/Header'
import ListItem from '../components/ListItem'
import CircleButton from '../components/CircleButton'

const Index = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </View>
      <CircleButton> + </CircleButton>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  circleButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#467FD3',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 40,
    bottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8
  },
  circleButtonLabel: {
    color: '#fff',
    fontSize: 40,
    lineHeight: 48

  }
})

export default Index
