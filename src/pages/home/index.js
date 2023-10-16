import { useEffect, useState } from "react";
import { Container, Movie, MovieList, Btn } from "./style";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Pagination from 'react-bootstrap/Pagination';

function Home() {
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const KEY = process.env.REACT_APP_KEY;
    const [movies, setMovies] = useState([]);
    const [genreList, setGenreList] = useState([]);
    const [page, setPage] = useState('1');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [searchValue, setSearchValue] = useState('');

    console.log("Página: " + page);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${KEY}&with_genres=${selectedGenre}&page=${page}&language=pt-BR&sort_by=popularity.desc`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
    }, [KEY, selectedGenre, page]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY}&language=pt-BR`)
            .then((response) => response.json())
            .then((data) => {
                setGenreList(data.genres);
            });
    }, [KEY]);

    return (
        <Container className="container-fluid">
            <nav className="navbar">
                <h1 className="my-2">Filmes</h1>

                <DropdownButton id="dropdown-basic-button" title="Gêneros">     
                    {genreList.map((genre) => {
                        return <Dropdown.Item key={genre.id} onClick={() => setSelectedGenre(genre.id)}>{genre.name}</Dropdown.Item>
                    })}
                </DropdownButton>

                <div className="d-flex">
                    <input className="form-control me-2" placeholder="Buscar filme" name="searchBar" value={searchValue} onChange={(e) => {setSearchValue(e.target.SearchValue);}}></input>
                    <Link to={`/search/${searchValue}`}>
                        <button className="btn btn-outline-success">Buscar</button>
                    </Link>
                </div>
            </nav>
            <MovieList className="cards">
                {movies.map((movie) => {
                    return (
                        <Movie key={movie.id} className="card">
                            <img
                                src={`${imagePath}${movie.poster_path}`}
                                alt="{movie.title}"
                                className="mt-3"
                            />
                            <span className="card-title">{movie.title}</span>

                            <Link to={`/${movie.id}`}>
                                <Btn className="btn btn-primary mb-3">Detalhes</Btn>
                            </Link>
                        </Movie>
                    );
                })}
            </MovieList>
            <Pagination>
                <Pagination.Prev onClick={() => {if(page > 1) {setPage(page-1)}}}/>
                {page>3?<Pagination.Item onClick={() => setPage(1)}>{1}</Pagination.Item>:""}
                {page>4?<Pagination.Ellipsis disabled/>:""}
                {page>2?<Pagination.Item onClick={() => setPage(page-2)}>{page-2}</Pagination.Item>:""}
                {page>1?<Pagination.Item onClick={() => setPage(page-1)}>{page-1}</Pagination.Item>:""}
                <Pagination.Item active>{page}</Pagination.Item>
                <Pagination.Item onClick={() => setPage(parseInt(page)+1)}>{parseInt(page)+1}</Pagination.Item>
                <Pagination.Item onClick={() => setPage(parseInt(page)+2)}>{parseInt(page)+2}</Pagination.Item>
                <Pagination.Next onClick={() => setPage(parseInt(page)+1)}/>
            </Pagination>
        </Container>
    );
}

export default Home;
