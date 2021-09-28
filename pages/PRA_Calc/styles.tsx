import styled from "@emotion/styled";

export const Textarea = styled.textarea`
  width: 60%;
  line-height: 6.25em;
  padding: 32px;
  background-color: #15202b;
  font-size: 15px;
  border-radius: 4px;
  color: rgb(255, 255, 255);
  /* font-weight: bold; */
  border: 0 solid, black;
  outline: none;
  /* overflow-y: hidden; */
`;

export const PRA_Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* flex-wrap: wrap; */
  & button {
    font-family: "Noto Sans KR", sans-serif;
    font-size: 1rem;
    font-weight: 400;
    text-align: center;
    text-decoration: none;
  }
  & Button {
    color: white;
    margin-left: 1rem;
    margin-right: 1rem;
    border-color: white;
  }
`;

export const Article = styled.article`
  color: white;
`;
