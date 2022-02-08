import styled from "@emotion/styled"
import { useState } from "react"
import { PALLETS_LIGHT } from "../../constants"
import { Theme } from "../../styles/theme"
import { useContext } from "react"
import { ThemeContext } from "../../pages/_app"
import React, { createContext } from "react"
import { ThemeProvider } from "@emotion/react"

const OPTIONS = [
    { key: "today", value: "today", name: "오늘" },
    { key: "week", value: "week", name: "이번 주" },
    { key: "month", value: "month", name: "이번 달" },
    { key: "year", value: "year", name: "올 해" },
]

interface StyledType {
    theme: Theme
    route: string
}

interface ThemeProps {
    theme: Theme
}

export const SelectBox = ({ route, onClicked }: any) => {
    const { theme } = useContext(ThemeContext)
    const [visible, setVisible] = useState(false)
    const [filterText, setFilterText] = useState("이번 주")
    const [textColor, setTextColor] = useState(filterText)
    const boxClickHandler = () => {
        setVisible(!visible)
    }
    const optionClickHandler = (e: React.MouseEvent<HTMLElement>) => {
        const text = (e.target as HTMLElement).textContent as string
        setFilterText(text)
        setVisible(!visible)
        setTextColor(text)
        onClicked(text)
    }

    return (
        <Container>
            {route === "home" ? (
                <>
                    <Button theme={theme} onClick={boxClickHandler}>
                        {filterText}
                    </Button>
                </>
            ) : (
                ""
            )}

            <Box visible={visible}>
                {OPTIONS.map((option) => {
                    const { key, name } = option
                    return (
                        <List
                            theme={theme}
                            onClick={optionClickHandler}
                            key={key}
                            value={name}
                            color={textColor}
                        >
                            {name}
                        </List>
                    )
                })}
            </Box>
        </Container>
    )
}

const Container = styled.div`
    position: relative;
`

const Button = styled.div<ThemeProps>`
    background: ${({ theme }) => theme.CARD_BACKGROUND};
    height: 32px;
    width: 96px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    font-weight: 600;
    color: ${({ theme }) => theme.SUB_FONT};
    font-size: 14px;
    box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px;
    cursor: pointer;
    &::after {
        display: block;
        content: "";
        width: 0px;
        height: 0px;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid ${({ theme }) => theme.MAIN_FONT};
    }
    &:hover {
        color: ${({ theme }) => theme.MAIN};
        &::after {
            border-top: 5px solid ${({ theme }) => theme.MAIN};
        }
    }
`
const Box = styled.ul<{ visible: boolean }>`
    display: ${(props) => (props.visible ? "block" : "none")};
    position: absolute;
    top: 130%;
    right: 0;
    box-shadow: rgb(0 0 0 / 10%) 0px 0px 8px 0px;
    background: white;
    padding: 0;
    width: 192px;
    z-index: 10;
`

const List = styled.li<ThemeProps>`
    list-style: none;
    font-weight: 600;
    font-size: 14px;
    padding: 12px 16px;
    cursor: pointer;
    box-sizing: border-box;
    background: ${({ theme }) => theme.BACKGROUND};
    &.active {
        color: ${({ theme }) => theme.MAIN};
    }
    &:hover {
        background-color: ${({ theme }) => theme.BACKGROUND};
    }
    & {
        border-top: 1px solid ${({ theme }) => theme.POINT_FONT};
    }
    &:first-of-type {
        border-top: none;
    }
    color: ${(props) =>
        props.color === props.value ? props.theme.MAIN : props.theme.MAIN_FONT};
`
