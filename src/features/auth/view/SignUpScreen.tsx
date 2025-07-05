import {
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import * as S from "./styles";
import Logo from "@/src/components/logo";
import { InputField } from "@/src/components/inputField";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/src/components/button";
import { Link } from "expo-router";
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
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignUpFormData>();
  const { loading, handleSignUp } = useSignUpViewModel();

  const onSubmit = (data: SignUpFormData) => {
    handleSignUp(data.email, data.password, data.firstName, data.lastName);
  };

  const handleFormErrors = (fieldName: string, errorType: string) => {
    let errorMsg = "";
    console.log(errorType);

    if (errorType === "required") {
      errorMsg = "Campo obrigatório!";
    } else if (fieldName === "firstName" || fieldName === "lastName") {
      if (errorType === "maxLength") {
        errorMsg = "Número de caracteres excedido.";
      } else {
        errorMsg = "Este campo precisa ter no mínimo 3 caracteres";
      }
    } else if (fieldName === "password") {
      if (errorType === "minLength") {
        errorMsg = "Este campo precisa ter no mínimo 8 caracteres";
      }
    } else {
      errorMsg = "";
    }

    return errorMsg;
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
                    {...register("firstName", {
                      required: true,
                      maxLength: 20,
                      minLength: 3,
                    })}
                    iconName="user"
                    placeholder="Nome"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.firstName && (
                <S.FormErrorText>
                  {handleFormErrors("firstName", errors.firstName.type)}
                </S.FormErrorText>
              )}

              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                  <InputField
                    {...register("lastName", {
                      required: true,
                      maxLength: 20,
                      minLength: 3,
                    })}
                    iconName="user"
                    placeholder="Sobrenome"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.lastName && (
                <S.FormErrorText>
                  {handleFormErrors("lastName", errors.lastName.type)}
                </S.FormErrorText>
              )}

              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <InputField
                    {...register("email", {
                      required: true,
                    })}
                    iconName="mail"
                    placeholder="E-mail"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.email && (
                <S.FormErrorText>
                  {handleFormErrors("email", errors.email.type)}
                </S.FormErrorText>
              )}

              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <InputField
                    {...register("password", {
                      required: true,
                      minLength: 8,
                    })}
                    iconName="lock"
                    placeholder="Senha"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                  />
                )}
              />
              {errors.password && (
                <S.FormErrorText>
                  {handleFormErrors("password", errors.password.type)}
                </S.FormErrorText>
              )}

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
