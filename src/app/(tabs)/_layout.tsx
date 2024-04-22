import { Tabs } from 'expo-router'
import { Icon } from 'react-native-elements'

const TabsLayout = (): JSX.Element => {
  return (
    <Tabs screenOptions={
      {
        headerShown: false,
        tabBarActiveBackgroundColor: 'gainsboro',
        tabBarActiveTintColor: 'black',
        tabBarStyle: { height: 85, marginBottom: -25, padding: 3 }
      }
      }>
      <Tabs.Screen
        name="home"
        options={
          {
            tabBarLabel: 'ホーム',
            tabBarIcon: () => <Icon name="home" color="gray" size={28} />
          }}
      />
      <Tabs.Screen
        name="book"
        options={
          {
            tabBarLabel: '新規予約',
            tabBarIcon: () => <Icon name="add" color="gray" size={28} />
          }}
      />
      {/* <Tabs.Screen
        name="mypage"
        options={
          {
            tabBarLabel: 'マイページ',
            tabBarIcon: () => <Icon name="person" color="gray" size={28} />
          }}
      /> */}
      <Tabs.Screen
        name="menu"
        options={
          {
            tabBarLabel: 'メニュー',
            tabBarIcon: () => <Icon name="menu" color="gray" size={28} />
          }}
      />
    </Tabs>
  )
}

export default TabsLayout
