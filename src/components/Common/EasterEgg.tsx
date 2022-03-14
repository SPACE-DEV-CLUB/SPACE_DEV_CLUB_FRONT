import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { Egg } from "@mui/icons-material"
import { PALLETS_DARK } from "@src/constants"
import Link from "next/link"
import React from "react"

function EasterEgg() {
  return (
    <>
      <LinkWrap>
        <Link href="/introduce" passHref>
          <a>
            <EggIcon />
          </a>
        </Link>
      </LinkWrap>
    </>
  )
}

export default EasterEgg

const Shake = keyframes`
    0% {
        transform: rotateZ(0deg);
    }
    25% {
        transform: rotateZ(-50deg);
    }
    75% {
        transform: rotateZ(50deg);
    }
    100% {
        transform: rotateZ(0deg);
    }
`
const LinkWrap = styled.div`
  position: fixed;
  bottom: 30px;
  left: 30px;
  cursor: pointer;
  &:hover {
    animation: ${Shake} 1s;
  }
`
const EggIcon = styled(Egg)`
  font-size: 32px;
  color: ${PALLETS_DARK.ICON}
`
