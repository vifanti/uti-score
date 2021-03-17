import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, Icon, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, placeholder }) => (
  <Container>
    <Icon
      name={icon}
      size={20}
      // color={isFocused || isFilled ? '#ff9000' : '#666360'}
    />
    <TextInput placeholder={placeholder} placeholderTextColor="#000" />
  </Container>
);

export default Input;
