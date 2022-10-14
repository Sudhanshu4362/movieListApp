import React, { Component } from 'react'
import axios from 'axios'

export default class Favourites extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genre: [],
      currGenre: "All Genre",
      currText:"",
      limit:5,
      currPage:1,
    };
  }

  async componentDidMount() {
    // let ans = await axios.get(
    //   `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}d&language=en-US&page=1`
    // );
    let results = JSON.parse(localStorage.getItem("movies"));
    let genreId = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Sci-Fi",
      10770: "TV",
      53: "Thriller",
      10752: "War",
      37: "Western",
    };
    let genreArr = [];
    results.map((movieObj) => {
      if (!genreArr.includes(genreId[movieObj.genre_ids[0]])) {
        genreArr.push(genreId[movieObj.genre_ids[0]]);
      }
    });

    genreArr.unshift("All Genre");
    console.log(genreArr);
    this.setState({
      movies: [...results], //[{},{},{}]
      genre: [...genreArr],
    });
  }

  handleCurrGenre = (genre) => {
    this.setState({
      currGenre: genre
    });
    // movies filter movies setstate
  }

  handleText = (e) => {
    this.setState({
      currText:e.target.value
    })
  }

  sortPopularityAsc = () => {
    let allMovies = this.state.movies
    allMovies.sort((a,b) => {
      return a.popularity - b.popularity;
    })
    this.setState({
      movies:[...allMovies]
    })
  }
  sortPopularityDsc = () => {
    let allMovies = this.state.movies
    allMovies.sort((a,b) => {
      return b.popularity - a.popularity;
    })
    this.setState({
      movies:[...allMovies]
    })
  }
  sortRatingAsc = () => {
    let allMovies = this.state.movies
    allMovies.sort((a,b) => {
      return a.vote_average - b.vote_average;
    })
    this.setState({
      movies:[...allMovies]
    })
  }
  sortRatingDsc = () => {
    let allMovies = this.state.movies
    allMovies.sort((a,b) => {
      return b.vote_average - a.vote_average;
    })
    this.setState({
      movies:[...allMovies]
    })
  }
  handlePageNum = (page) => {
    this.setState({
      currPage:page
    })
  }

  handleDelete = (id) => {
    let newMovies = this.state.movies.filter((movieObj) => {
      return movieObj.id != id;
    })
    this.setState({
      movies:[...newMovies]
    })
    localStorage.setItem("movies",JSON.stringify(newMovies))
  }
  render() {
    let genreId={28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'}
    let filteredMovies = this.state.movies;
    if(this.state.currText === '') {
      filteredMovies = this.state.movies;
    } else {
      filteredMovies = filteredMovies.filter((movieObj) => {
        let movieName = movieObj.original_title.toLowerCase();
        return movieName.includes(this.state.currText);
      })
    }
    if (this.state.currGenre != "All Genre") {
      filteredMovies = filteredMovies.filter(
        (movieObj) => genreId[movieObj.genre_ids[0]]==this.state.currGenre
      );
    }

    let numOfPages = Math.ceil(filteredMovies.length/this.state.limit);
    let pagesArr =[];
    for(let i = 1;i <= numOfPages;i++) {
      pagesArr.push(i);
    }
    let si = (this.state.currPage - 1) * this.state.limit;
    let ei = si + this.state.limit - 1;
    filteredMovies = filteredMovies.slice(si,ei + 1);


     return (
      <div class="row">
        <div class="col-3 favourites-list">
          <ul class="list-group">
            {this.state.genre.map((genre) =>
              this.state.currGenre == genre ? (
                <li class="list-group-item active" aria-current="true">
                  {genre}
                </li>
              ) : (
                <li
                  class="list-group-item"
                  aria-current="true"
                  onClick={() => this.handleCurrGenre(genre)}
                >
                  {genre}
                </li>
              )
            )}
          </ul>
        </div>
        <div class="col favourites-table">
          <div class="row">
            <input type="text" className="col-8" placeholder="Search" value={this.state.currText} onChange = {this.handleText}></input>
            <input type="number" className="col-4" placeholder="5"></input>
          </div>
          <div class="row">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Genre</th>
                  <th scope="col">
                  <i class="fa-solid fa-caret-up" onClick ={this.sortPopularityAsc}></i>
                    Popularity
                    <i class="fa-solid fa-caret-down" onClick ={this.sortPopularityDsc}></i>
                    </th>
                  <th scope="col">
                  <i class="fa-solid fa-caret-up" onClick ={this.sortRatingAsc}></i>
                    Rating
                    <i class="fa-solid fa-caret-down" onClick ={this.sortRatingDsc}></i>
                    </th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movieObj) => (
                  <tr>
                    <td scope="row">
                      <img
                        src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                        style={{ width: "8rem" }}
                      />
                      {movieObj.original_title}
                    </td>
                    <td>{genreId[movieObj.genre_ids[0]]}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{movieObj.vote_average}</td>
                    <td>
                      <button class="btn btn-outline-danger" onClick={() => this.handleDelete(movieObj.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            {pagesArr.map((page) => (
              <li class="page-item">
                <a class="page-link" onClick={() => this.handlePageNum(page)}>
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
}