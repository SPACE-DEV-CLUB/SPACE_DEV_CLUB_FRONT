import styled from "@emotion/styled";

interface TagProps {
  tagName: string;
}

export const Tag = ({ tagName }: TagProps) => {
  return <TagItem>{tagName}</TagItem>;
};

const TagItem = styled.div``;
