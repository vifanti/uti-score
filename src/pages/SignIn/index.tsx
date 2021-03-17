import React, { useCallback } from 'react';

import { StatusBar } from 'react-native';
import { useAuth } from '../../hooks/auth';

import logoImg from '../../assets/logo-wareline-simples.png';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Image, ButtonContainer } from './styles';

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const handleSignIn = useCallback(async () => {
    await signIn({
      email: 'teste',
      password: 'teste',
    });
  }, [signIn]);

  return (
    <Container>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Image style={{ resizeMode: 'stretch' }} source={logoImg} />

      <Input />
      <Input />

      <ButtonContainer>
        <Button onPress={handleSignIn}>Entrar</Button>
      </ButtonContainer>
    </Container>
  );
};

export default SignIn;
