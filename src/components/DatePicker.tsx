import React, { useState } from 'react'
import { View, Button, StyleSheet } from 'react-native'
import Modal from 'react-native-modal'
import DateTimePicker from 'react-native-ui-datepicker'
import dayjs from 'dayjs'

interface Props {
  isModalVisible: boolean
  setModalVisibility: (boolean: boolean) => void
}
const DatePicker = (props: Props): JSX.Element => {
  const [startDate, setStartDate] = useState(dayjs())
  const [endDate, setEndDate] = useState(dayjs())
  // const [isModalVisible, setModalVisibility] = useState(true)

  return (
    <View style={styles.container}>
      <Modal
        isVisible={props.isModalVisible}
      >
        <View style={styles.modalContent}>
          <DateTimePicker
            mode="range"
            startDate={startDate}
            endDate={endDate}
            onChange={({ startDate, endDate }) => {
              console.log('sta:', startDate)
              console.log('end:', endDate)
              setStartDate(startDate)
              setEndDate(endDate)
            }}
            locale='de'
            displayFullDays={true}
            dayContainerStyle={{ borderRadius: 10 }}
            selectedItemColor='#006400'
            // selectedTextStyle={{ color: 'red' }}
            // buttonPrevIcon={<Text>aaa</Text>}
          />
          <Button
            onPress={() => { props.setModalVisibility(false) }}
            title='close'
           />
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
  }
})

export default DatePicker
