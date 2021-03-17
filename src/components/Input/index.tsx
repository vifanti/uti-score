import React from 'react';
import { TextInputProps } from 'react-native';

import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, placeholder }) => (
  <Container>
    <TextInput placeholder={placeholder} placeholderTextColor="#000" />
  </Container>
);

export default Input;
