import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px 30px 0 ${30 + getBottomSpace()}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #000;
  font-family: 'Roboto-Medium';
  margin: 64px 0 24px;
`;

export const Image = styled.Image`
  width: 300px;
  height: 40px;
`;

export const ButtonContainer = styled.View`
  margin-top: 12px;
  width: 100%;
  height: 68px;
`;
