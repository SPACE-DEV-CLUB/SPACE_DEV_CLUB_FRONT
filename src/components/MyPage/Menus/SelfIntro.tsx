import styled from "@emotion/styled";
import { PALLETS_LIGHT } from "../../../constants";

export const SelfIntro = () => {
  return (
    <EditorContainer>
      <div className="editBtnBox">
        <EditBtn>수정하기</EditBtn>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae
        harum sunt, atque itaque modi doloremque, laboriosam nihil numquam
        facere quisquam amet optio voluptate fugit, distinctio temporibus illum
        dignissimos iusto! Recusandae.
      </p>
    </EditorContainer>
  );
};

const EditorContainer = styled.section`
  .editBtnBox {
    display: flex;
    justify-content: end;
    margin-bottom: 24px;
  }
  @media screen and (max-width: 768px) {
    padding: 0 16px;
  }
`;

const EditBtn = styled.button`
  height: 40px;
  padding: 0 18px;
  background: ${PALLETS_LIGHT.MAIN};
  color: #fff;
  border-radius: 4px;
`;
