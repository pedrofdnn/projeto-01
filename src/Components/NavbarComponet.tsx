import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LiaSearchSolid } from "react-icons/lia";
import { getAllMoviesBySearchTerm } from "../API/API";
import { NavContainer, Searchbar } from "../Styles/StyleNav";

export default function NavbarComponent() {
  const history = useNavigate();
  const [changeClick, setChangeClick] = useState("");
  const [currentPage] = useState(1);

  // captura o enter e muda o estado.
  async function handleEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      const results = await getAllMoviesBySearchTerm(changeClick, currentPage);
      history(`/search/${changeClick}`, { state: { searchResults: results } });
      window.location.reload();
      setChangeClick("");
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }

  // captura o click do botão.
  async function handleClick() {
    const results = await getAllMoviesBySearchTerm(changeClick, currentPage);
    history(`/search/${changeClick}`, { state: { searchResults: results } });
    window.location.reload();
    setChangeClick("");
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  // realiza a mudança de estado do input.
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setChangeClick(e.target.value);
  }

  // atualiza a pagina quando aperta home
  function handleHomeClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.location.href = "/";
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  return (
    <NavContainer>
      <nav>
        <Link to="/" onClick={handleHomeClick}>
          Home
        </Link>
        <Searchbar>
          <input
            type="text"
            placeholder="Pesquise o Filme"
            value={changeClick}
            onChange={handleChange}
            onKeyDown={handleEnter}
          />

          <button onClick={handleClick}>
            <LiaSearchSolid />
          </button>
        </Searchbar>
        <Link to="/contact">Contato</Link>
      </nav>
    </NavContainer>
  );
}
