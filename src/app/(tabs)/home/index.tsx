import { Stack, router } from 'expo-router'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { auth } from '../../../config'
import PieChart from '../../../components/PieChart'

const Index = (): JSX.Element => {
  const handlePress = (): void => {
    router.replace({
      pathname: 'menu',
      params: { fromHome: true }
    })
  }
  const numberOfReservationsAvailable = 30
  const numberOfReservations = 10
  const numberOfRest = numberOfReservationsAvailable - numberOfReservations

  return (
    <>
    <Stack.Screen options={{ headerShown: true, title: 'ホーム' }} />
    <View style={styles.container}>
      <View style={styles.plan}>
        <Text style={styles.current_user}>{auth.currentUser?.email}</Text>
        <Text style={styles.plan_text}>xxxxxxプラン</Text>
      </View>
      <View style={styles.book_count}>
        <View>
          <PieChart
            numberOfRest={numberOfRest}
            numberOfReservations={numberOfReservations}
          />
        </View>
        <View>
          <Text style={styles.book_text}>{`${numberOfReservations}/${numberOfReservationsAvailable}`}件</Text>
        </View>
      </View>
      <View style={styles.book_history_link}>
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.book_history_link_text}>予約履歴を見る</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  plan: {
    margin: 60,
    textAlign: 'center'
  },
  current_user: {
    fontSize: 20,
    textAlign: 'center'
  },
  plan_text: {
    fontSize: 30
  },
  book_count: {
    margin: 10,
    marginTop: 80,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
  },
  book_graph: {
    fontSize: 40
  },
  book_text: {
    fontSize: 40
  },
  book_history_link: {
    marginTop: 150,
    padding: 10,
    backgroundColor: '#dcdcdc',
    borderRadius: 10,
    width: '80%'
  },
  book_history_link_text: {
    fontSize: 20,
    textAlign: 'center'
  }
})

export default Index
