import { useColorScheme } from "react-native";
import * as S from "./styles";
import Logo from "@/src/components/logo";
import { InputField } from "@/src/components/inputField";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/src/components/button";
import { Link } from "expo-router";

type SignUpFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const SignUpScreen = () => {
  const colorScheme = useColorScheme();
  const { control, handleSubmit } = useForm<SignUpFormData>();

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
  };

  return (
    <S.Container>
      <Logo color={colorScheme ?? "dark"} />

      <S.MainContent>
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
          <Button />
          <Link href="/+not-found" asChild>
            <S.SecondaryContentText>
              Já tem conta? Faça login.
            </S.SecondaryContentText>
          </Link>
        </S.MainContentRow>
      </S.MainContent>

      <Link href="/+not-found" asChild>
        <S.SecondaryContentText>Precisa de ajuda?</S.SecondaryContentText>
      </Link>
    </S.Container>
  );
};
