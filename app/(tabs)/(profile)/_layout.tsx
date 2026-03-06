import { Stack } from 'expo-router'

const profileLayout = () => {
  return (
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index" options={{title:"Profile"}} />
        <Stack.Screen name="editProfile" options={{title:"Edit Profile"}} />
    </Stack>
  )
}

export default profileLayout