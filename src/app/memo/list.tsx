import { View, StyleSheet } from 'react-native'
import { router } from 'expo-router'
import { Feather } from '@expo/vector-icons'
import Header from '../../components/Header'
import ListItem from '../../components/ListItem'
import CircleButton from '../../components/CircleButton'

const handlePress = (): void => {
  router.push('/memo/create')
}

const List = (): JSX.Element => {
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
      <CircleButton onPress={handlePress}>
        <Feather name='plus' />
      </CircleButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default List
