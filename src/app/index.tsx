import { Redirect } from 'expo-router'

const Index = (): JSX.Element => {
  return <Redirect href='auth/sign_up' />
  // return <Redirect href='memo/list' />
}

export default Index
