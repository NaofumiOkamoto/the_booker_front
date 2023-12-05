import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'

const ListItem = (): JSX.Element => {
  return (
    <View style={styles.listItem}>
      <View>
        <Text style={styles.listItemTitle}>リスト</Text>
        <Text style={styles.listItemDetail}>詳細詳詳詳詳詳詳詳詳細細細細細細細細</Text>
      </View>
      <TouchableOpacity>
        <Feather name='delete' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0,0,0,0.15)'
  },
  listItemTitle: {
    fontSize: 16,
    lineHeight: 32
  },
  listItemDetail: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484'
  }
})

export default ListItem
