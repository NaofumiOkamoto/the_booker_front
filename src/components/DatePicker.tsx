import React from 'react'
import { View, Button, StyleSheet, TextInput } from 'react-native'
import Modal from 'react-native-modal'
import DateTimePicker from 'react-native-ui-datepicker'
import dayjs from 'dayjs'

interface Props {
  isModalVisible: boolean
  setModalVisibility: (boolean: boolean) => void
  startDate?: dayjs.Dayjs
  endDate?: dayjs.Dayjs
  setStartDate: (day: dayjs.Dayjs | undefined) => void
  setEndDate: (day: dayjs.Dayjs | undefined) => void
  setIsSearch: (boolean: boolean) => void
  setSearchText: (input: string) => void
  searchText: string
}
const DatePicker = ({ isModalVisible, setModalVisibility, startDate, endDate, setStartDate, setEndDate, setIsSearch, setSearchText, searchText }: Props): JSX.Element => {
  return (
    <View style={styles.container}>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <DateTimePicker
            mode="range"
            startDate={startDate}
            endDate={endDate}
            onChange={({ startDate, endDate }) => {
              setStartDate(dayjs(startDate))
              setEndDate(endDate !== undefined ? dayjs(endDate) : undefined)
            }}
            locale='ja'
            displayFullDays={true}
            dayContainerStyle={{ borderRadius: 10 }}
            selectedItemColor='#006400'
            // selectedTextStyle={{ color: 'red' }}
            // buttonPrevIcon={<Text>aaa</Text>}
          />
          <TextInput
            style={styles.input}
            value={searchText}
            keyboardType="web-search"
            onChangeText={input => { setSearchText(input) }}
          />
          <Button
            onPress={() => {
              setModalVisibility(false)
              setIsSearch(false)
              setStartDate(undefined)
              setEndDate(undefined)
              setSearchText('')
            }}
            title='クリア'
           />
          <Button
            onPress={() => {
              setModalVisibility(false)
              setIsSearch(true)
            }}
            title='検索'
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    height: 48,
    fontSize: 16,
    padding: 8,
    width: '80%',
    marginRight: 10
  }
})

export default DatePicker
