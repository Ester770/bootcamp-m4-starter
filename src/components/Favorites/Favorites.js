import React, { Component } from 'react';
import './Favorites.css';
import store from '../../redux/store';
import { Link } from "react-router-dom";


class Favorites extends Component {
    state = {
        title: 'Новый список',
        movies: [],
        isClick: false,
        listId: '',

    }

    componentDidMount() {
        store.subscribe(() => {
            const currentList = store.getState();
            this.setState({ movies: currentList.favoriteList });
        })
    }

    handleClickDelete = (id) => {
        const clone = this.state.movies.filter((item) => item.id !== id);
        this.setState({ movies: clone });
    };

    removeFavorites(imdbID) {
        store.dispatch({
            type: 'REMOVE_FROM_FAVORITES',
            payload: {
                id: imdbID,
            }
        })
    }

    saveListHandler = (e) => {
        this.setState({ isClick: true });
        const data = this.state

        fetch(`https://acb-api.algoritmika.org/api/movies/list`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                let listId = data.id
                console.log("listID :", listId);
                this.setState({ listId: listId })

            })
            .catch((error) => {
                console.log(error);
            })

    }

    getListId = (listId) => {
        store.dispatch({
            type: 'GET_LIST_ID',
            payload: {
                listId: listId,
            }
        })
    }


    render() {
        const { title, isClick, listId } = this.state;
        return (
            <div className="favorites">
                <input
                    value={title}
                    className="favorites__name"
                    placeholder='Введите название списка'
                    onChange={this.favoriteListChangeHandler}
                    disabled={this.state.isClick}
                 />
                <ul className="favorites__list">
                    {this.state.movies.map((item) => {
                        return <li key={item.id}>{item.title} ({item.year}) <button onClick={() => this.handleClickDelete(item.id)}  onClick={() => this.removeFavorites(item.id)}>X</button></li>;
                    })}
                </ul>
                {!isClick ? (
                    <button type="button"
                        className="favorites__save"
                        onClick={this.saveListHandler}
                    >
                        Сохранить список
                    </button>
                ) : (
                    <button type="button" className="favorites__save_link">
                        <Link
                            to={`/list/${this.state.listId}`}
                        >
                            Перейти к выбранным фильмам
                        </Link>
                    </button>
                )}
            </div>
        );
    }
}

export default Favorites;