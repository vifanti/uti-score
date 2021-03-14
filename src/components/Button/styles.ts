import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ContainerProps {
  white?: boolean;
  margin?: number;
}

type Textprops = ContainerProps;

export const Container = styled.View<ContainerProps>`
  height: 100%;
  border-radius: 10px;

  background: #d13b33;

  ${props =>
    props.white &&
    css`
      background: #fff;
      border-color: #000;
      border: 2px;
    `};

  ${props =>
    props.margin &&
    css`
      margin-left: ${props.margin}px;
      margin-right: ${props.margin}px;
    `}

  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Button = styled(RectButton)`
  border-radius: 5px;
  width: 100%;
  height: 100%;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text<Textprops>`
  padding: 0 2px;
  text-align: center;
  font-family: 'Roboto-Medium';
  font-size: 14px;
  color: #fff;

  ${props =>
    props.white &&
    css`
      color: #000;
    `}
`;
