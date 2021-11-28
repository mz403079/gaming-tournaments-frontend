import React, { Children } from "react";
import {
  TextInput,
  StyleSheet,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
interface InputProps {
  placeholder: string;
  icon?: any;
  checked?: boolean;
  onChange?: (...args: any[]) => void;
  label?: string;
  helpText?: string;
  errorText?: string;
  labelText?: string;
  password?: boolean;
}

const InputField: React.FC<InputProps> = (props) => {
  const {
    children,
    placeholder,
    onChange,
    label,
    helpText,
    errorText,
    labelText,
    checked,
    password,
    ...rest
  } = props;
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e);
    }
    return null;
  };

  return (
    <>
      <Text style={styles.text_footer}>{label}</Text>
      <View style={styles.action}>
        {children}
        <TextInput
          placeholder={placeholder}
          style={styles.textInput}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry}
          onChangeText={handleOnChange}
        />
        {checked ? (
          <Animatable.View animation={"bounceIn"}>
            <Feather name={"check-circle"} color={"green"} size={20} />
          </Animatable.View>
        ) : null}
        {password ? (
          <TouchableOpacity
            onPress={() => setSecureTextEntry(!secureTextEntry)}
          >
            {secureTextEntry ? (
              <Feather name={"eye-off"} color={"grey"} size={20} />
            ) : (
              <Feather name={"eye"} color={"grey"} size={20} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );
};
export default InputField;
const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#03DAC5",
    fontSize: 16,
  },
  text_footer: {
    color: "#03DAC5",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#03DAC5",
    paddingBottom: 5,
    paddingTop: 5,
  },
});
