import { useEffect, useState } from "react";
import { Container, Movie, MovieList, Btn } from "./style";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Search() {
    const { name } = useParams();
    const imagePath = "https://image.tmdb.org/t/p/w500";

    const [value, setValue] = useState('');
    const [movies, setMovies] = useState([]);
    const KEY = process.env.REACT_APP_KEY;
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${name}&language=pt-BR&page=1`)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
                console.log(data.results);
            });
    }, [KEY, name]);

    return (
        <Container>
            <nav className="navbar">
                <h1 className="my-2">Filmes</h1>

                <div className="d-flex">
                    <input className="form-control me-2" placeholder="Buscar filme" name="seachBar" value={value} onChange={(e) => {setValue(e.target.value);}}></input>
                    <Link to={`/search/${value}`}>
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
        </Container>
    );
}

export default Search;
