import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'

interface Props {
  isModalVisible: boolean
  setModalVisibility: (boolean: boolean) => void
}
const BidUnits = ({ isModalVisible, setModalVisibility }: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible}>
        <TouchableOpacity onPress={() => { setModalVisibility(false) }}>
          <Text style={styles.batu}>×</Text>
        </TouchableOpacity>
        <View style={styles.modalContent}>
          <View style={styles.table}>
            <View style={styles.row}>
                <Text style={styles.cell1}>現在の価格</Text>
                <Text style={styles.cell1}>入札単位</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.cell1}>1円～1,000円未満</Text>
                <Text style={styles.cell1}>10円</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.cell1}>1,000円～5,000円未満</Text>
                <Text style={styles.cell1}>100円</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.cell1}>5,000円～1万円未満</Text>
                <Text style={styles.cell1}>250円</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.cell1}>1万円～5万円未満</Text>
                <Text style={styles.cell1}>500円</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.cell1}>5万円～</Text>
                <Text style={styles.cell1}>1,000円</Text>
            </View>
            {/* Add more rows as needed */}
          </View>
        </View>
      </Modal>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  },
  batu: {
    fontSize: 30,
    textAlign: 'right'
  },
  table: {
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 10,
    marginTop: 30
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  cell1: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    width: 200,
    height: 50,
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
    borderColor: '#DDD'
  }
})

export default BidUnits
