import React from 'react';
import { ViewProps } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, Button, ButtonText } from './styles';

interface ButtonProps extends ViewProps, Omit<RectButtonProperties, 'hitSlop'> {
  children: string;
  white?: boolean;
  margin?: number;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  children,
  white,
  margin,
  onPress,
}) => (
  <Container white={white} margin={margin}>
    <Button rippleColor="gray" onPress={onPress}>
      <ButtonText white={white}>{children}</ButtonText>
    </Button>
  </Container>
);

export default ButtonComponent;
