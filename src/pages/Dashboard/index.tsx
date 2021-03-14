import React, { useCallback, useEffect, useState } from 'react';
import { Avatar } from 'react-native-elements';
import { differenceInYears } from 'date-fns';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import * as fakeApi from '../../service/fakeApi';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

import redBar from '../../assets/barra-vermelha.png';

import {
  Container,
  RedBar,
  HeaderContainer,
  Header,
  ProfileButton,
  Title,
  UtiSelectContainer,
  SelectContainer,
  Select,
  PatientsList,
  PatientContainer,
  PatientAvatarInfo,
  PatientInfo,
  PatientNameAgeUti,
  PatientName,
  Uti,
  PatientScoreTypeData,
  PatientScoreType,
  PatientMetaText,
  ScoreTypeList,
  Footer,
} from './styles';

const Dashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const [patients, setPatients] = useState<fakeApi.Patient[] | undefined>([]);
  const [scoreTypeList, setScoreTypeList] = useState<string[]>([]);
  const [utis, setUtis] = useState<string[]>([]);
  const [selectedUti, setSelectedUti] = useState<string | undefined>();

  const { navigate } = useNavigation();

  useEffect(() => {
    setUtis(fakeApi.getFakeUtis());
  }, []);

  useEffect(() => {
    setScoreTypeList(fakeApi.getScoreTypeList());
  }, []);

  useEffect(() => {
    setPatients(fakeApi.getFakePatients(selectedUti));
  }, [selectedUti]);

  useFocusEffect(
    React.useCallback(() => {
      setPatients(fakeApi.getFakePatients(selectedUti));
    }, [selectedUti]),
  );

  const handleSelectUti = useCallback(
    (itemValue: string) => {
      setPatients(fakeApi.getFakePatients(selectedUti));

      setSelectedUti(itemValue);
    },
    [selectedUti],
  );

  const filterScoreData = useCallback((scoreData: fakeApi.ScoreData[]) => {
    return scoreData.reduce((a, b) => (a.updatedAt > b.updatedAt ? a : b));
  }, []);

  const navigateToQuestionary = useCallback(
    (scoreType: string, patientId: string) => {
      switch (scoreType) {
        case 'SAPS-3':
          navigate('SAPS3Questionary', { patientId });
          break;
        case 'PSI':
          navigate('PSIQuestionary', { patientId });
          break;
        case 'PRISM II':
          navigate('PRISMIIQuestionary', { patientId });
          break;
        case 'APACHE II':
          navigate('APACHEIIQuestionary', { patientId });
          break;
        case 'SOFA':
          navigate('SOFAQuestionary', { patientId });
          break;

        default:
          break;
      }
    },
    [navigate],
  );

  const handleLogout = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <RedBar style={{ resizeMode: 'stretch' }} source={redBar} />
      <HeaderContainer>
        <ProfileButton onPress={handleLogout}>
          <Avatar
            rounded
            size="large"
            title={`${user.name[0]}${
              user.name.split(' ')[user.name.split(' ').length - 1][0]
            }`}
            containerStyle={{
              backgroundColor: '#ccc',
            }}
            source={user.avatarUrl ? { uri: user.avatarUrl } : undefined}
          />
        </ProfileButton>
        <Header>
          <Title>UTI - Score</Title>

          <UtiSelectContainer>
            <SelectContainer>
              <Select
                selectedValue={selectedUti}
                onValueChange={itemValue => {
                  handleSelectUti(itemValue as string);
                }}
              >
                <Select.Item label="Todos" value="" />
                {utis.map(uti => (
                  <Select.Item key={uti} label={uti} value={uti} />
                ))}
              </Select>
            </SelectContainer>
          </UtiSelectContainer>
        </Header>
      </HeaderContainer>

      <PatientsList
        data={patients}
        keyExtractor={patient => patient.id}
        ListFooterComponent={<Footer />}
        ListEmptyComponent={
          <Header>
            <PatientMetaText>
              Não existem pacientes na UTI selecionada.
            </PatientMetaText>
          </Header>
        }
        renderItem={({ item: patient }) => (
          <PatientContainer
            onPress={() => {
              if (patient.scoreData) {
                navigateToQuestionary(
                  filterScoreData(patient.scoreData).scoreType,
                  patient.id,
                );
              }
            }}
          >
            <PatientAvatarInfo>
              <Avatar
                rounded
                size="large"
                title={`${patient.name[0]}${
                  patient.name.split(' ')[patient.name.split(' ').length - 1][0]
                }`}
                containerStyle={{
                  backgroundColor: '#ccc',
                }}
                source={
                  patient.avatarUrl ? { uri: patient.avatarUrl } : undefined
                }
              />
              <PatientInfo>
                <PatientNameAgeUti>
                  <PatientName>{`${patient.name}, ${differenceInYears(
                    new Date(),
                    patient.dateOfBirth,
                  )} anos`}</PatientName>
                  <Uti>{patient.uti}</Uti>
                </PatientNameAgeUti>
                {patient.scoreData ? (
                  <PatientScoreTypeData>
                    <PatientScoreType>
                      {filterScoreData(patient.scoreData).scoreType}
                    </PatientScoreType>
                    <PatientMetaText>{`S ${
                      filterScoreData(patient.scoreData).score
                    }`}</PatientMetaText>
                    <PatientMetaText>{`RM: ${
                      filterScoreData(patient.scoreData).riskOfDeath
                    }%`}</PatientMetaText>
                  </PatientScoreTypeData>
                ) : (
                  <PatientMetaText>Score não calculado</PatientMetaText>
                )}
              </PatientInfo>
            </PatientAvatarInfo>
            <ScoreTypeList>
              {scoreTypeList.map(
                scoreType =>
                  (!patient.scoreData ||
                    scoreType !==
                      filterScoreData(patient.scoreData).scoreType) && (
                    <Button
                      white
                      margin={1}
                      onPress={() =>
                        navigateToQuestionary(scoreType, patient.id)
                      }
                      key={scoreType}
                    >
                      {scoreType}
                    </Button>
                  ),
              )}
            </ScoreTypeList>
          </PatientContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
