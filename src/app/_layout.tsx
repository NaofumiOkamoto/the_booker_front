import { Stack } from 'expo-router'

const Layout = (): JSX.Element => {
  return <Stack screenOptions={{
    headerStyle: {
      backgroundColor: '#467FD3'
    },
    headerTintColor: '#fff',
    headerTitle: 'ishioka',
    headerBackTitle: 'back',
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: 'bold'
    }
  }}
    />
}

export default Layout
