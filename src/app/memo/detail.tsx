import { View, Text, ScrollView, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import CircleButton from '../../components/CircleButton'

const Detail = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle}>リスト</Text>
        <Text style={styles.memoDetail}>詳細詳詳詳詳詳詳詳詳細細細細細細細細</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoBodyText}>
          本本本本本本本本本本本本文文文文文文文文文文文文
          本本本本本本本本本本本本文文文文文文文文文文文文
          本本本本本本本本本本本本文文文文文文文文文文文文
          本本本本本本本本本本本本文文文文文文文文文文文文
        </Text>
      </ScrollView>
      <CircleButton style={{ top: 160, bottom: 'auto' }}>+</CircleButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  memoHeader: {
    backgroundColor: '#467FD3',
    height: 96,
    justifyContent: 'center',
    paddingVertica: 24,
    paddingHorizontal: 19
  },
  memoTitle: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold'
  },
  memoDetail: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 16
  },
  memoBody: {
    paddingVertical: 32,
    paddingHorizontal: 27
  },
  memoBodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000'
  }
})

export default Detail
