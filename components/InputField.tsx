import React from "react"
import { View, Text, TextInput, StyleSheet } from "react-native"

type Props = {
  label: string
  value?: string
  onChangeText?: (text: string) => void
  secureTextEntry?: boolean
}

const InputField = ({
  label,
  value,
  onChangeText,
  secureTextEntry=false
}: Props) => {

  return (
    <View style={styles.container}>

      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={label}
        secureTextEntry={secureTextEntry}
        
      />

    </View>
  )
}

export default InputField

const styles = StyleSheet.create({

  container: {
    width: "100%"
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: "#333"
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "white",
    fontSize: 16
  }

})