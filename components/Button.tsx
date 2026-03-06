import { Text, TouchableOpacity } from 'react-native'
import React from 'react'

type ButtonProps = {
  text?: string;
  onPress?: () => void;
    color?: string;
}
const Button = ({text, onPress, color}:ButtonProps) => {
  return (
    <TouchableOpacity style={{ backgroundColor: color || "#007AFF", padding: 15, borderRadius: 15, marginTop: 20 }} onPress={onPress}>
      <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>Get Started</Text>
    </TouchableOpacity>
  )
}

export default Button