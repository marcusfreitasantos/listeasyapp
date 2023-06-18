import React from "react";
import * as S from "./styles";

export default function Container({ backgroundColor, children }) {
  return (
    <S.Container backgroundColor={backgroundColor}>{children}</S.Container>
  );
}
