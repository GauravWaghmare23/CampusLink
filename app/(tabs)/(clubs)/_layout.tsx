import { Stack } from 'expo-router'

const clubLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="index" options={{headerShown:false}} />
        <Stack.Screen name="clubDetails" options={{headerShown:false}} />
        <Stack.Screen name="createClub" options={{headerShown:false}} />
    </Stack>
  )
}

export default clubLayout