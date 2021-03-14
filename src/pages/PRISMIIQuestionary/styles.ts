import styled from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';

export const Container = styled.View`
  flex: 1;
`;

export const PatientContainer = styled.View`
  background: #f0f0f5;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding: 10px 10px;
  flex-direction: column;
`;

export const PatientAvatarInfo = styled.View`
  flex-direction: row;
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

export const PatientMetaText = styled.Text`
  font-size: 18px;
  color: black;
  font-family: 'Roboto-Regular';
`;

export const QuestionaryContainer = styled.ScrollView`
  padding: 0 10px;
  /* border: 1px;
  border-color: black; */
`;

export const QuestionContainer = styled.View`
  flex-direction: row;
  align-items: center;
  height: 80px;
  /* border: 1px;
  border-color: blue; */
`;

export const Label = styled.Text`
  flex: 1;
  font-size: 18px;
  color: black;
  font-family: 'Roboto-Regular';
  text-align: right;
  /* border: 1px;
  border-color: green; */
`;

export const SelectContainer = styled.View`
  margin-left: 10px;
  flex: 1;
  border: 2px;
  border-color: black;
  height: 60px;
`;

export const SwitchContainer = styled.View`
  display: flex;

  margin-left: 10px;
  flex: 1;
  /* border: 1px;
  border-color: pink; */

  width: 100px;

  justify-content: flex-start;

  /* margin-right: 50px;
  padding-right: 50px; */
`;

export const Select = styled(Picker)`
  height: 100%;
`;

export const ButtonContainer = styled.View`
  background: #f0f0f5;
  height: 94px;
  width: 100%;
  padding: 16px 10px;

  border-top-left-radius: 20px;
  border-top-right-radius: 20px;

  align-items: center;
  flex-direction: row;
`;
