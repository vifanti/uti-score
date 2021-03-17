import React, { useCallback } from 'react';

import { ScrollView, StatusBar, View } from 'react-native';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo-wareline-simples.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Image, Title, ButtonContainer } from './styles';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const handleSignIn = useCallback(async () => {
    await signIn({
      email: 'teste',
      password: 'teste',
    });
  }, [signIn]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Container>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Image style={{ resizeMode: 'stretch' }} source={logoImg} />

        <View>
          <Title>Faça seu logon</Title>
        </View>

        <Input name="email" icon="mail" placeholder="E-mail" />
        <Input name="password" icon="lock" placeholder="Senha" />

        <ButtonContainer>
          <Button onPress={handleSignIn}>Entrar</Button>
        </ButtonContainer>
      </Container>
    </ScrollView>
  );
};

export default SignIn;
