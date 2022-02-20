import React, { Component } from 'react';
import store from '../../redux/store';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

class Movies extends Component {
    state = {
        movies: []
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
            <>
                {this.state.movies ?
                    <ul className="movies">
                        {this.state.movies.map((movie) => (
                            <li className="movies__item" key={movie.imdbID}>
                                <MovieItem {...movie} />
                            </li>
                        ))}
                    </ul> : <p>По вашему запросу ничего не найдено</p>}
            </>
        );
    }
}

export default Movies;