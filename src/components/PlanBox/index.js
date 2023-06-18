import React from "react";
import * as S from "./styles";

export default function PlanBox({ currentPlan, planName, planPrice, onPress }) {
  return (
    <S.Plan__wrapper>
      <S.Plan__boxActive onPress={onPress} current={currentPlan}>
        <S.Plan__name>
          <S.Plan__button current={currentPlan} />
          <S.Plan__name_text current={currentPlan}>
            {planName}
          </S.Plan__name_text>
        </S.Plan__name>
      </S.Plan__boxActive>
    </S.Plan__wrapper>
  );
}
