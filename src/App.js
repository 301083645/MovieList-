import React, { useState } from 'react'

const App = () => {
  const [submitValue, setSubmitValue] = useState('');
  const [value, setValue] = useState('');
  const [movieList, setMovieList] = useState([]);
  const [nominatedList, setNominatedList] = useState([]);

  const onChange = (e) => {
    setValue(e.target.value);
    fetch(`http://www.omdbapi.com/?apikey=55d8d00f&s=${e.target.value}`).then(res => res.json()).then(res => {
      if(res.Search) {
        setMovieList(res.Search);
        setSubmitValue(e.target.value);
      } else {
        setMovieList([]);
        setSubmitValue('');
      }
    })
  }

  const onSubmit = (e) => {
    e.preventDefault();
  }

  const onClick = (id) => {
    const idx = movieList.findIndex(e => e.imdbID === id);
    movieList[idx].removed = true;
    setMovieList([...movieList]);
    nominatedList.push(movieList[idx]);
    setNominatedList([...nominatedList]);
  }

  const onRemoveClick = (id) => {
    let idx = nominatedList.findIndex(e => e.imdbID === id);
    nominatedList.splice(idx, 1);
    setNominatedList([...nominatedList]);
    idx = movieList.findIndex(e => e.imdbID === id);
    movieList[idx].removed = false;
    setMovieList([...movieList]);
  }
  return (
    <div className="container">
      <h1>The Shoppies</h1>
      <div className="white-box">
        <h2>Movie title</h2>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="please input" value={value} onChange={onChange} />
        </form>
      </div>
      <div className="two-column-container">
        <div className="white-box">
          <h2>Results for {submitValue && `"${submitValue}"`}</h2>
          <ul>
            {movieList.length !== 0 && movieList.map(e => {
              return (
                <li key={e.imdbID} className="card" style={{width: '100%', padding: '1rem'}}>
                  <img src={e.Poster} className="card-img-top" alt="poster url" />
                  <div className="card-body">
                    <h5 className="card-title">{e.Title}</h5>
                    <p className="card-text">{e.Year}</p>
                    <button className="btn btn-primary" onClick={() => onClick(e.imdbID)} disabled={e.removed}>Nominate</button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="white-box">
          <h2>Nomination</h2>
          <ul>
            {nominatedList.length !== 0 && nominatedList.map(e => {
              return (
                <li key={e.imdbID} className="card" style={{width: '100%', padding: '1rem'}} data-id={e.imdbID}>
                  <img src={e.Poster} className="card-img-top" alt="poster url" />
                  <div className="card-body">
                    <h5 className="card-title">{e.Title}</h5>
                    <p className="card-text">{e.Year}</p>
                    <button className="btn btn-danger" onClick={() => onRemoveClick(e.imdbID)}>Remove</button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

    </div>
  )
}

export default App

