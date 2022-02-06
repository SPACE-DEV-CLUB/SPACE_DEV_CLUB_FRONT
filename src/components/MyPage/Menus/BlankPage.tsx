import styled from "@emotion/styled"
import Image from "next/image"

const BlankPage = ({ dataname }: { dataname: string }) => {
    return (
        <DefaultContainer>
            <Image
                src="/image/mypage_selfintro.jpg"
                alt="self_default"
                width={300}
                height={300}
            />
            <p>{dataname}가 없어요</p>
        </DefaultContainer>
    )
}

const DefaultContainer = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
    p {
        margin: 30px;
    }
`

export default BlankPage
