import * as S from './style'

export default ({onPress, btnText}) => {
    return(
        <S.BtnPrimary onPress={onPress}>
            <S.BtnPrimary__text>{btnText}</S.BtnPrimary__text>
        </S.BtnPrimary>
    )
}