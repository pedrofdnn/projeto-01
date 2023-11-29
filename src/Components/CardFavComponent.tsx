import { useEffect, useState } from "react";
import { getTopRatedMovies } from "../API/API";
import { CardStyled, CardContainer } from "../Styles/StyleCards";
import ReactModal from "react-modal";

import "../Styles/slick-theme.css";
import "../Styles/slick.css";

interface Movie {
  title: string;
  overview: string;
  poster_path: string;
}

export default function CardFavComponent() {
  const [movies, setMovies] = useState<Movie[]>([]);

  // modal
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // função que carrega dados da api favoritos
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const topRatedMovies = await getTopRatedMovies();
        setMovies(topRatedMovies);
      } catch (error) {
        console.error("Erro na API:", error);
      }
    };

    fetchMovies();
  }, []);

  // função para funcionamento do modal
  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalIsOpen(true);
  };
  const handleCloseModal = () => {
    setSelectedMovie(null);
    setModalIsOpen(false);
  };

  return (
    <div>
      {movies.map((movie, index) => (
        <div key={index}>
          <CardContainer>
            <CardStyled>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                />

                <button onClick={() => handleOpenModal(movie)}>
                  Mais Informações
                </button>
              </div>
            </CardStyled>
          </CardContainer>

          <ReactModal isOpen={modalIsOpen} onRequestClose={handleCloseModal}>
            {selectedMovie && (
              <div>
                <h2>{selectedMovie.title}</h2>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`}
                  alt={selectedMovie.title}
                />
                <p>{selectedMovie.overview}</p>
              </div>
            )}
            <button onClick={handleCloseModal}>Fechar Modal</button>
          </ReactModal>
        </div>
      ))}
    </div>
  );
}
