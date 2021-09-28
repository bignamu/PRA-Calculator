import styled from "@emotion/styled";

export const WorkSpace = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  a {
    text-decoration: none;
    color: white;
  }
  header {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    /* flex-grow: 1; */
    /* box-sizing: border-box; */
    width: 30rem;
    margin-right: 5rem;
    height: 100vh;

    /* z-index: 3; */
    & .header-container {
      height: 100vh;
      align-items: stretch;
      justify-content: space-around;
      display: flex;
      flex-direction: column;
      position: fixed;
      overflow-wrap: break-word;
      white-space: nowrap;
      padding-right: 3rem;
      text-align: center;

      border-right: 3px solid white;
      & img {
        align-items: center;
        width: 10rem;
        height: 10rem;
        /* border-radius: 70%; */
        overflow: hidden;
      }
      & nav div {
        margin-top: 0.8rem;
        color: white;
        border: 1px solid white;
      }
      & div:hover {
        border: 1.5px solid white;
      }
    }
  }
  main {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-grow: 1;
    margin-right: 5rem;
    /* flex-shrink: 1; */
  }
`;
