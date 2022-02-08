import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { MEDIA_QUERY_END_POINT } from "../../constants"
import { Theme } from "../../styles/theme"
import { userInfo } from "../../types/Main"
import { ThemeProps } from "../../types/Theme"
export interface SettingProps {
  user: {
    id: number
    attributes: userInfo
  }
}

export interface SnsListProps {
  theme: Theme
  edit: boolean
}

export const listStyle = ({ theme, edit }: SnsListProps) => css`
  color: ${theme.SUB_FONT};
  & + & {
    margin-top: ${edit ? "16px" : "8px"};
  }
`

export const formStyle = () => css`
  display: flex;
  width: 100%;
`
type ButtonProps = {
  background: string
  hover: string
  color: string
}
export const btnStyle = ({ background, hover, color }: ButtonProps) => css`
  background: ${background};
  color: ${color};
  border-radius: 4px;
  padding: 0px 18px;
  height: 32px;
  font-weight: 600;
  font-size: 16px;
  line-height: 1.5;
  &:hover {
    background: ${hover};
  }
`
export const BtnContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`

export const EditBtn = styled.button<ThemeProps>`
  color: ${({ theme }) => theme.MAIN};
  text-decoration: underline;
  font-size: 16px;
  padding-top: 2px;
  &:hover {
    color: ${({ theme }) => theme.SUB};
  }
`
export const DefaultBtn = styled.button`
  margin-left: 32px;
  ${btnStyle}
`
export const DefaultInput = styled.input<ThemeProps>`
  width: 100%;
  flex: 1;
  height: 32px;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.BORDER};
  border-radius: 4px;
  background: ${({ theme }) => theme.BACKGROUND};
  color: ${({ theme }) => theme.MAIN_FONT};
  &:focus {
    border: 1px solid ${({ theme }) => theme.POINT_FONT};
    outline: none;
  }
`

export const Notice = styled.p<ThemeProps>`
  margin-top: 14px;
  color: ${({ theme }) => theme.POINT_FONT};
`
export const UserSetting = styled.article`
  display: flex;
  flex-direction: column;
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    flex-direction: row;
  }
`

export const SettingName = styled.h3`
  font-size: 18px;
  line-height: 1.5;
  width: 152px;
  margin-bottom: 8px;
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    margin: 0;
  }
`
export const SettingDesc = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const SettingDetails = styled.div`
  display: flex;
  flex-direction: column;
`
export const SettingDetail = styled.p<ThemeProps>`
  line-height: 1.5;
  padding: 8px 0;
  color: ${({ theme }) => theme.SUB_FONT};
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    padding: 0;
  }
`
