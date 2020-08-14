import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    const history = useHistory();
    const params = useParams();
    console.log(params);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${params.id}`)
          .then(response => {
            console.log(response)
            setMovie(response.data)
          })
          .catch(error => console.log(error.message))
    }, [params]);    

    const inputChange = (e) => {
        e.persist();
        setMovie({...movie, [e.target.name]: e.target.value});
    }

    const axiosUpdateMovie = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${params.id}`, movie)
            .then(response => {
                console.log(response);
                props.setMovieList([...props.movieList, response.data]);
                history.push('/');
            })
            .catch(error => console.log(error));
    }

    return (
        <div className='formContainer'>
            <h1>{movie.title}</h1>
            <form onSubmit={axiosUpdateMovie} className='updateForm'>
                <label className='inputContainer'>Edit Movie Here
                    <input className='input' type='text' value={movie.title} onChange={inputChange} name='title' placeholder='Movie Title' />
                    <input className='input' type='text' value={movie.director} onChange={inputChange} name='director' placeholder='Movie Director' />
                    <input className='input' type='text' value={movie.metascore} onChange={inputChange} name='metascore' placeholder='Movie metascore' />
                </label>
                <button>Update Movie!</button>
            </form>
        </div>  
    )
}

export default UpdateMovie;