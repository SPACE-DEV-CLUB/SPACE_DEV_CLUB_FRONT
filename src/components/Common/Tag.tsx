import styled from "@emotion/styled"
import Link from "next/link"
import { useContext } from "react"
import { MEDIA_QUERY_END_POINT } from "../../constants"
import { ThemeContext } from "../../pages/_app"
import { ThemeProps } from "../../types/Theme"

interface TagProps {
    tagName: string[] | string | undefined
}

export const Tag = ({ tagName }: TagProps) => {
    const { theme } = useContext(ThemeContext)

    return (
            <TagsContainer href={`/tags/${tagName}`} theme={theme}>
                <span>{tagName}</span>
            </TagsContainer>
    )
}

const TagsContainer = styled.a<ThemeProps>`
    display: inline-flex;
    align-items: center;
    margin: 0 14px 14px 0;
    padding: 0 16px;
    height: 32px;
    font-weight: 500;
    background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
    border-radius: 15px;
    cursor: pointer;
    &:hover {
            opacity: 0.7;
        }
        span {
        font-size: 16px;
        color: ${({ theme }) => theme.MAIN};
    }
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
        span {
            font-size: 12px;
        }
    }
`
