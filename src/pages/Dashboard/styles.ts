import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';

import { Patient } from '../../service/fakeApi';

export const Container = styled.View`
  flex: 1;
`;

export const RedBar = styled.Image`
  width: 100%;
`;

export const HeaderContainer = styled.View`
  padding: 10px;
  flex-direction: row;
  background: #f0f0f5;
`;

export const Header = styled.View`
  flex: 1;
  align-items: center;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const Title = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 24px;
  color: black;
  margin-bottom: 10px;
`;

export const UtiSelectContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 40px;
`;

export const SelectContainer = styled.View`
  margin-left: 10px;
  flex: 1;
  border: 2px;
  border-color: black;
  height: 40px;
`;

export const Select = styled(Picker)`
  height: 100%;
`;

export const PatientsList = styled(FlatList as new () => FlatList<Patient>)`
  padding: 16px 14px 16px;
`;

export const PatientContainer = styled(RectButton)`
  background: #f0f0f5;
  border-radius: 10px;
  padding: 10px 10px;
  margin-bottom: 16px;
  flex-direction: column;
  min-height: 180px;
  /* align-items: center; */
`;

export const PatientAvatarInfo = styled.View`
  flex: 1;
  flex-direction: row;
  /* border: 1px;
  border-color: black; */
`;

export const PatientInfo = styled.View`
  margin-left: 12px;
  flex: 1;
`;

export const PatientNameAgeUti = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

export const PatientName = styled.Text`
  flex: 1;
  font-family: 'Roboto-Medium';
  font-size: 20px;
  color: black;
`;

export const Uti = styled.Text`
  margin-left: 8px;
  font-family: 'Roboto-Medium';
  font-size: 20px;
  color: black;
`;

export const PatientScoreTypeData = styled.View`
  flex: 1;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;
`;

export const PatientScoreType = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 18px;
  color: black;
`;

export const PatientMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const PatientMetaText = styled.Text`
  font-size: 18px;
  color: black;
  font-family: 'Roboto-Regular';
`;

export const ScoreTypeList = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
  height: 60px;
`;

export const Footer = styled.Text`
  margin: 8px;
`;
