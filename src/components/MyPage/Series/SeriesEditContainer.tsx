import styled from "@emotion/styled";
import { PALLETS_LIGHT } from "../../../constants";
import DetailCard from "../../../components/MyPage/Series/DetailCard";
import { DETAIL_CARD_DATA } from "../../../data";

interface SeriesContainerProps {
    handleEdit: () => void;
}

const SeriesEditContaienr = ({ handleEdit }: SeriesContainerProps) => {
    return (
        <SeriesContainer>
            <SaveBtnContainer>
                <SaveBtn onClick={handleEdit}>저장</SaveBtn>
            </SaveBtnContainer>
            <CardContainer>
                {DETAIL_CARD_DATA.map((e, i) => {
                    return (
                        <DetailCard
                            key={i}
                            margin={"0 0 16px 0"}
                            padding={"16px"}
                            postIdx={e.postIdx}
                            postTitle={e.postTitle}
                            postDesc={e.postDesc}
                            date={e.date}
                        />
                    );
                })}
            </CardContainer>
        </SeriesContainer>
    );
};

const SeriesContainer = styled.section``;

const SaveBtnContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const SaveBtn = styled.button`
    height: 32px;
    padding: 0 20px;
    border-radius: 4px;
    background: ${PALLETS_LIGHT.MAIN};
    color: ${PALLETS_LIGHT.BACKGROUND};
    &:hover {
        background: ${PALLETS_LIGHT.SUB};
        color: ${PALLETS_LIGHT.MAIN_FONT};
    }
`;

const CardContainer = styled.article`
    margin-top: 36px;
    padding: 24px;
    background: ${PALLETS_LIGHT.BACKGROUND};
    border-radius: 4px;
`;

export default SeriesEditContaienr;
