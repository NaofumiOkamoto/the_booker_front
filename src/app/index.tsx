import { Redirect } from 'expo-router'

const Index = (): JSX.Element => {
  // return <Redirect href='auth/sign_up' />
  // return <Redirect href='memo/list' />
  return <Redirect href={'/(tabs)/home'} />
}

export default Index
