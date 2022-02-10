import React, { Component } from 'react';
import store from '../../redux/store';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

class Movies extends Component {
    state = {
        movies: []
        // {
        //     imdbID: 'tt3896198',
        //     title: "Guardians of the Galaxy Vol. 2",
        //     year: 2017,
        //     poster: "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg"

        // },
        // {
        //     imdbID: 'tt0068646',
        //     title: "The Godfather",
        //     year: 1972,
        //     poster: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg"

        // }
    }

    componentDidMount() {
        store.subscribe(()=>{
                const globalstate=store.getState();
                fetch (`https://www.omdbapi.com/?apikey=b6b9d4d7&s=${globalstate.searchLine}`)
                .then (resp=>{
                    return resp.json();
                })
                .then (data=>{
                    data.response === false?
                    this.setState({movies: 0}):
                    this.setState({movies: data.Search});
                })
                .catch((error)=> {
                    console.log("Error : ", error);
                })
        })

    }



    render() {
        return (
            <ul className="movies">
                {this.state.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem {...movie} />
                    </li>
                ))}
            </ul>
        );
    }
}

export default Movies;