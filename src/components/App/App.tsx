import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { Toaster } from "react-hot-toast";
import css from "./App.module.css";

import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

function App() {
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useQuery({
    queryKey: ["movies", search, page],
    queryFn: () => fetchMovies(search, page),
    enabled: search.trim() !== "",
    placeholderData: keepPreviousData,
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = (movie: Movie) => setSelectedMovie(movie);
  const closeModal = () => setSelectedMovie(null);

  const handleSearch = (query: string) => {
    setSearch(query);
    setPage(1);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage />}

      {data && (
        <>
          <MovieGrid movies={data.results} onSelect={openModal} />

          {data.total_pages > 1 && (
            <ReactPaginate
              pageCount={data.total_pages}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => setPage(selected + 1)}
              forcePage={page - 1}
              containerClassName={css.pagination}
              activeClassName={css.active}
              nextLabel="→"
              previousLabel="←"
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
      <Toaster position="top-right" />
    </>
  );
}

export default App;
