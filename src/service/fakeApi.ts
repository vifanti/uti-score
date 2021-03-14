import faker from 'faker';

faker.locale = 'pt_BR';

export interface Answer {
  questionId: string;
  answer: string | boolean;
}

export interface ScoreData {
  scoreType: 'SAPS-3' | 'PSI' | 'PRISM II' | 'APACHE II' | 'SOFA';
  score: number;
  riskOfDeath: string;
  updatedAt: Date;
  answers: Answer[];
}

export interface Patient {
  id: string;
  avatarUrl?: string;
  name: string;
  dateOfBirth: Date;
  uti: string;
  scoreData?: ScoreData[];
}

export interface Question {
  questionId: string;
  scoreType: 'SAPS-3' | 'PSI' | 'PRISM II' | 'APACHE II' | 'SOFA' | undefined;
  type: 'select' | 'boolean';
  label: string;
  answers?: string[];
}

let fakePatients: Patient[] = [
  {
    id: '1',
    avatarUrl: `https://i.pravatar.cc/150?img=${faker.random.number(60)}`,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    dateOfBirth: faker.date.between('1950-01-01', '1995-12-31'),
    uti: 'UTI-2',
    scoreData: [
      {
        scoreType: 'SAPS-3',
        score: faker.random.number(100),
        riskOfDeath: faker.commerce.price(0, 100, 2),
        updatedAt: faker.date.recent(20, new Date()),
        answers: [
          {
            questionId: '1',
            answer: '<14 dias',
          },
          {
            questionId: '3',
            answer: true,
          },
        ],
      },
      {
        scoreType: 'PSI',
        score: faker.random.number(100),
        riskOfDeath: faker.commerce.price(0, 100, 2),
        updatedAt: faker.date.recent(20, new Date()),
        answers: [
          {
            questionId: '1',
            answer: '<14 dias',
          },
        ],
      },
      {
        scoreType: 'PRISM II',
        score: faker.random.number(100),
        riskOfDeath: faker.commerce.price(0, 100, 2),
        updatedAt: faker.date.recent(20, new Date()),
        answers: [
          {
            questionId: '1',
            answer: '<14 dias',
          },
        ],
      },
      {
        scoreType: 'APACHE II',
        score: faker.random.number(100),
        riskOfDeath: faker.commerce.price(0, 100, 2),
        updatedAt: faker.date.recent(20, new Date()),
        answers: [
          {
            questionId: '1',
            answer: '<14 dias',
          },
        ],
      },
      {
        scoreType: 'SOFA',
        score: faker.random.number(100),
        riskOfDeath: faker.commerce.price(0, 100, 2),
        updatedAt: faker.date.recent(20, new Date()),
        answers: [
          {
            questionId: '1',
            answer: '<14 dias',
          },
        ],
      },
    ],
  },
  {
    id: '2',

    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    dateOfBirth: faker.date.between('1950-01-01', '1995-12-31'),
    uti: 'UTI-2',
    scoreData: [
      {
        scoreType: 'PRISM II',
        score: faker.random.number(100),
        riskOfDeath: faker.commerce.price(0, 100, 2),
        updatedAt: faker.date.recent(20, new Date()),
        answers: [
          {
            questionId: '1',
            answer: '<14 dias',
          },
        ],
      },
      {
        scoreType: 'APACHE II',
        score: faker.random.number(100),
        riskOfDeath: faker.commerce.price(0, 100, 2),
        updatedAt: faker.date.recent(20, new Date()),
        answers: [
          {
            questionId: '1',
            answer: '<14 dias',
          },
        ],
      },
      {
        scoreType: 'SOFA',
        score: faker.random.number(100),
        riskOfDeath: faker.commerce.price(0, 100, 2),
        updatedAt: faker.date.recent(20, new Date()),
        answers: [
          {
            questionId: '1',
            answer: '<14 dias',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    avatarUrl: `https://i.pravatar.cc/150?img=${faker.random.number(60)}`,
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    dateOfBirth: faker.date.between('1950-01-01', '1995-12-31'),
    uti: 'UTI-2',
  },
  {
    id: '4',
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    dateOfBirth: faker.date.between('1950-01-01', '1995-12-31'),
    uti: 'UTI-3',
  },
];

export const getFakePatients = (uti?: string): Patient[] => {
  if (uti) {
    return fakePatients.filter(p => p.uti === uti);
  }

  return fakePatients;
};

export const getFakePatient = (id: string): Patient => {
  return fakePatients.find(patient => patient.id === id) as Patient;
};

export const setFakePatient = (newPatientData: Patient): void => {
  fakePatients = fakePatients.map(patient => {
    if (patient.id === newPatientData.id) {
      return newPatientData;
    }

    return patient;
  });
};

export const setAnswers = (
  patientId: string,
  scoreType: 'SAPS-3' | 'PSI' | 'PRISM II' | 'APACHE II' | 'SOFA',
  answers: Answer[],
): void => {
  fakePatients = fakePatients.map(patient => {
    if (patient.id === patientId) {
      if (patient.scoreData) {
        const newScoreData = patient.scoreData.map(s => {
          if (s.scoreType === scoreType) {
            return { ...s, updatedAt: new Date(), answers };
          }

          return s;
        });

        if (!patient.scoreData?.find(e => e.scoreType === scoreType)) {
          newScoreData.push({
            scoreType,
            score: faker.random.number(100),
            riskOfDeath: faker.commerce.price(0, 100, 2),
            updatedAt: new Date(),
            answers,
          });
        }

        return { ...patient, scoreData: newScoreData };
      }
      return {
        ...patient,
        scoreData: [
          {
            scoreType,
            score: faker.random.number(100),
            riskOfDeath: faker.commerce.price(0, 100, 2),
            updatedAt: new Date(),
            answers,
          },
        ],
      };
    }
    return patient;
  });
};

const scoreTypeList = ['SAPS-3', 'PSI', 'PRISM II', 'APACHE II', 'SOFA'];

export const getScoreTypeList = (): string[] => scoreTypeList;

const fakeQuestions: Question[] = [
  {
    questionId: '1',
    scoreType: 'SAPS-3',
    type: 'select',
    label: 'Pré-hospitalização',
    answers: ['<14 dias', '14-27 dias', '>=28 dias'],
  },
  {
    questionId: '2',
    scoreType: 'SAPS-3',
    type: 'select',
    label: 'Localização anterior',
    answers: ['Emergência', 'Outra UTI', 'Outros...'],
  },
  {
    questionId: '3',
    scoreType: 'SAPS-3',
    type: 'boolean',
    label: 'Tratamento oncológico',
  },
  {
    questionId: '4',
    scoreType: 'SAPS-3',
    type: 'boolean',
    label: 'Câncer',
  },
  {
    questionId: '5',
    scoreType: 'SAPS-3',
    type: 'boolean',
    label: 'Câncer hematológico',
  },
  {
    questionId: '6',
    scoreType: 'PSI',
    type: 'select',
    label: 'Pré-hospitalização',
    answers: ['<14 dias', '14-27 dias', '>=28 dias'],
  },
  {
    questionId: '7',
    scoreType: 'PSI',
    type: 'select',
    label: 'Localização anterior',
    answers: ['Emergência', 'Outra UTI', 'Outros...'],
  },
  {
    questionId: '8',
    scoreType: 'PSI',
    type: 'boolean',
    label: 'Tratamento oncológico',
  },
  {
    questionId: '9',
    scoreType: 'PSI',
    type: 'boolean',
    label: 'Câncer',
  },
  {
    questionId: '10',
    scoreType: 'PSI',
    type: 'boolean',
    label: 'Câncer hematológico',
  },
  {
    questionId: '11',
    scoreType: 'PRISM II',
    type: 'select',
    label: 'Pré-hospitalização',
    answers: ['<14 dias', '14-27 dias', '>=28 dias'],
  },
  {
    questionId: '12',
    scoreType: 'PRISM II',
    type: 'select',
    label: 'Localização anterior',
    answers: ['Emergência', 'Outra UTI', 'Outros...'],
  },
  {
    questionId: '13',
    scoreType: 'PRISM II',
    type: 'boolean',
    label: 'Tratamento oncológico',
  },
  {
    questionId: '14',
    scoreType: 'PRISM II',
    type: 'boolean',
    label: 'Câncer',
  },
  {
    questionId: '15',
    scoreType: 'PRISM II',
    type: 'boolean',
    label: 'Câncer hematológico',
  },
  {
    questionId: '16',
    scoreType: 'APACHE II',
    type: 'select',
    label: 'Pré-hospitalização',
    answers: ['<14 dias', '14-27 dias', '>=28 dias'],
  },
  {
    questionId: '17',
    scoreType: 'APACHE II',
    type: 'select',
    label: 'Localização anterior',
    answers: ['Emergência', 'Outra UTI', 'Outros...'],
  },
  {
    questionId: '18',
    scoreType: 'APACHE II',
    type: 'boolean',
    label: 'Tratamento oncológico',
  },
  {
    questionId: '19',
    scoreType: 'APACHE II',
    type: 'boolean',
    label: 'Câncer',
  },
  {
    questionId: '20',
    scoreType: 'APACHE II',
    type: 'boolean',
    label: 'Câncer hematológico',
  },
  {
    questionId: '21',
    scoreType: 'SOFA',
    type: 'select',
    label: 'Pré-hospitalização',
    answers: ['<14 dias', '14-27 dias', '>=28 dias'],
  },
  {
    questionId: '22',
    scoreType: 'SOFA',
    type: 'select',
    label: 'Localização anterior',
    answers: ['Emergência', 'Outra UTI', 'Outros...'],
  },
  {
    questionId: '23',
    scoreType: 'SOFA',
    type: 'boolean',
    label: 'Tratamento oncológico',
  },
  {
    questionId: '24',
    scoreType: 'SOFA',
    type: 'boolean',
    label: 'Câncer',
  },
  {
    questionId: '25',
    scoreType: 'SOFA',
    type: 'boolean',
    label: 'Câncer hematológico',
  },
];

export const getFakeQuestions = (
  scoreType: 'SAPS-3' | 'PSI' | 'PRISM II' | 'APACHE II' | 'SOFA',
): Question[] | undefined => {
  return fakeQuestions.filter(question => question.scoreType === scoreType);
};

const fakeUtis = ['UTI-1', 'UTI-2', 'UTI-3'];

export const getFakeUtis = (): string[] => fakeUtis;
