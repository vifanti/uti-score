/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, Switch } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { differenceInYears, format } from 'date-fns';

import Button from '../../components/Button';

import * as fakeApi from '../../service/fakeApi';

import {
  Container,
  PatientContainer,
  PatientAvatarInfo,
  PatientInfo,
  PatientNameAgeUti,
  PatientName,
  Uti,
  PatientScoreTypeData,
  PatientScoreType,
  PatientMetaText,
  QuestionaryContainer,
  QuestionContainer,
  Label,
  SelectContainer,
  SwitchContainer,
  Select,
  ButtonContainer,
} from './styles';

interface RouteParams {
  patientId: string;
}

const SAPS3Questionary: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const routeParams = route.params as RouteParams;
  const [questions, setQuestions] = useState<fakeApi.Question[]>();
  const [patient, setPatient] = useState<fakeApi.Patient>();
  const [scoreData, setScoreData] = useState<fakeApi.ScoreData>();
  const [formData, setFormData] = useState<fakeApi.Answer[]>([]);

  useEffect(() => {
    setQuestions(fakeApi.getFakeQuestions('APACHE II'));
  }, []);

  useEffect(() => {
    setPatient(fakeApi.getFakePatient(routeParams.patientId));
  }, [routeParams.patientId]);

  useEffect(() => {
    if (patient?.scoreData) {
      setScoreData(patient.scoreData.find(s => s.scoreType === 'APACHE II'));
    }
  }, [patient?.scoreData]);

  useEffect(() => {
    if (scoreData) {
      setFormData(scoreData.answers);
    }
  }, [scoreData]);

  const handleChangeSelect = useCallback(
    (itemValue: string | boolean, questionId: string) => {
      const answers = formData.filter(a => a.questionId !== questionId);

      answers?.push({ questionId, answer: itemValue });

      setFormData(answers);
    },
    [formData],
  );

  const handleCalcScore = useCallback(() => {
    if (patient) {
      fakeApi.setAnswers(patient.id, 'APACHE II', formData);

      navigation.navigate('Dashboard');
    }
  }, [formData, navigation, patient]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      {patient && (
        <>
          <PatientContainer>
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
                {scoreData ? (
                  <>
                    <PatientScoreType>{`Aferição: ${format(
                      scoreData.updatedAt as Date,
                      'dd/MM/yy kk:mm',
                    )}`}</PatientScoreType>
                    <PatientScoreTypeData>
                      <PatientMetaText>{`S ${scoreData?.score}`}</PatientMetaText>
                      <PatientMetaText>{`RM: ${scoreData?.riskOfDeath}%`}</PatientMetaText>
                    </PatientScoreTypeData>
                  </>
                ) : (
                  <PatientMetaText>APACHE II não calculado</PatientMetaText>
                )}
              </PatientInfo>
            </PatientAvatarInfo>
          </PatientContainer>
          <QuestionaryContainer>
            {questions &&
              questions.map(question => {
                switch (question.type) {
                  case 'select':
                    return (
                      <QuestionContainer key={question.questionId}>
                        <Label>{`${question.label}: `}</Label>
                        <SelectContainer>
                          <Select
                            selectedValue={
                              formData.find(
                                s => s.questionId === question.questionId,
                              )?.answer
                            }
                            onValueChange={itemValue => {
                              handleChangeSelect(
                                itemValue as string,
                                question.questionId,
                              );
                            }}
                          >
                            <Select.Item label="" value="" />
                            {question.answers?.map(answer => (
                              <Select.Item
                                key={answer}
                                label={answer}
                                value={answer}
                              />
                            ))}
                          </Select>
                        </SelectContainer>
                      </QuestionContainer>
                    );
                  default:
                    return (
                      <QuestionContainer key={question.questionId}>
                        <Label>{`${question.label}:`}</Label>
                        <SwitchContainer>
                          <Switch
                            style={{
                              display: 'flex',
                              alignSelf: 'center',
                              flex: 1,
                              transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }],
                            }}
                            trackColor={{ false: '#767577', true: '#767577' }}
                            thumbColor={
                              (formData.find(
                                s => s.questionId === question.questionId,
                              )?.answer as boolean)
                                ? 'green'
                                : 'red'
                            }
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={value => {
                              handleChangeSelect(value, question.questionId);
                            }}
                            value={
                              formData.find(
                                s => s.questionId === question.questionId,
                              )?.answer as boolean
                            }
                          />
                        </SwitchContainer>
                      </QuestionContainer>
                    );
                }
              })}
          </QuestionaryContainer>
          <ButtonContainer>
            <Button white margin={5} onPress={handleGoBack}>
              Cancelar
            </Button>
            <Button margin={5} onPress={handleCalcScore}>
              Calcular
            </Button>
          </ButtonContainer>
        </>
      )}
    </Container>
  );
};

export default SAPS3Questionary;
