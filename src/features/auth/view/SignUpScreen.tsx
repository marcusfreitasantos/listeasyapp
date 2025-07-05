import {
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import * as S from "./styles";
import Logo from "@/src/components/logo";
import { InputField } from "@/src/components/inputField";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/src/components/button";
import { Link } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useSignUpViewModel } from "../viewModel/useSignUpViewModel";
import { useTheme } from "styled-components/native";

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const SignUpScreen = () => {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const { control, handleSubmit } = useForm<SignUpFormData>();
  const { loading, handleSignUp } = useSignUpViewModel();

  const onSubmit = (data: SignUpFormData) => {
    handleSignUp(data.email, data.password, data.firstName, data.lastName);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <S.Container>
        <Logo color={colorScheme ?? "dark"} />

        <S.MainContent>
          {loading ? (
            <ActivityIndicator color={theme.primaryColor} style={{ flex: 1 }} />
          ) : (
            <S.formWrapper>
              <S.MainContentText>Cadastre-se gratuitamente.</S.MainContentText>

              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, value } }) => (
                  <InputField
                    iconName="user"
                    placeholder="Nome"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <InputField
                    iconName="user"
                    placeholder="Sobrenome"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <InputField
                    iconName="mail"
                    placeholder="E-mail"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <InputField
                    iconName="lock"
                    placeholder="Senha"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                  />
                )}
              />

              <S.MainContentRow>
                <Button onPress={handleSubmit(onSubmit)} />
                <Link href="/+not-found" asChild>
                  <S.SecondaryContentText>
                    Já tem conta? Faça login.
                  </S.SecondaryContentText>
                </Link>
              </S.MainContentRow>
            </S.formWrapper>
          )}
        </S.MainContent>

        <Link href="/+not-found" asChild>
          <S.SecondaryContentText>Precisa de ajuda?</S.SecondaryContentText>
        </Link>
      </S.Container>
    </KeyboardAvoidingView>
  );
};
