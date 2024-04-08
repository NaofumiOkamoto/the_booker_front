import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons' // アイコンを使用するためのライブラリ（例：Expoの場合）
import { router } from 'expo-router'

const BottomNavigation = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState('home')

  const handleTabPress = (tab: 'home' | 'reservation' | 'mypage'): void => {
    setActiveTab(tab)
    switch (tab) {
      case 'home':
        router.push('/auth/log_in')
        break
      case 'reservation':
        router.push('/book/platform')
        break
      case 'mypage':
        router.push('/book/terms_of_use')
        break
      default:
        router.push('/auth/log_in')
        break
    }
    // 各タブに対するアクションを追加することができます
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'home' && styles.activeTab]}
        onPress={() => { handleTabPress('home') }}
      >
        <Ionicons name="home-outline" size={24} color="white" />
        <Text style={styles.tabText}>ホーム</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'reservation' && styles.activeTab]}
        onPress={() => { handleTabPress('reservation') }}
      >
        <Ionicons name="calendar-outline" size={24} color="white" />
        <Text style={styles.tabText}>予約</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === 'mypage' && styles.activeTab]}
        onPress={() => { handleTabPress('mypage') }}
      >
        <Ionicons name="person-outline" size={24} color="white" />
        <Text style={styles.tabText}>マイページ</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'black',
    paddingTop: 10,
    paddingBottom: 30,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  touchable: {
  },
  tab: {
    alignItems: 'center',
    width: '30%'
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: 'white'
  },
  tabText: {
    color: 'white',
    marginTop: 5
  }
})

export default BottomNavigation
