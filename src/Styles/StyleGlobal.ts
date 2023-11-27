import { createGlobalStyle } from "styled-components";
import img from "../Assets/BackGround.jpg";

const GlobalStyle = createGlobalStyle`

body {
  font-family: 'Roboto Condensed', sans-serif;
  background: url( ${img}) fixed;
  margin: 0;
  padding: 0;
}

h1 {
  display: flex;
  color: #0a0908;
  justify-content: center;
  font-size:4rem;
  align-items: center;
  font-weight: bold;
  margin-top: -50px;
}
`;

export default GlobalStyle;
