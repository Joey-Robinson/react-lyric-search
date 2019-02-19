import React, { Component } from 'react'
import axios from 'axios'
import { Consumer } from '../../context'

class Search extends Component {
  state = {
    trackTitle: ''
  }
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  formSubmit = (dispatch, event) => {
    event.preventDefault();
    axios.get(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(response => {
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: response.data.message.body.track_list
        });
        this.setState({ trackTitle: '' })
      })
      .catch(error => console.log(error))

  }
  render() {
    return (
      <Consumer>
        {value => {
          const { dispatch } = value
          return (
            <div className="card card-body mb-4 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search For A Song
              </h1>
              <p className="lead text-center">Get The Lyrics For Any Song</p>
              <form onSubmit={this.formSubmit.bind(this, dispatch)}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="form-control form-control-lg"
                    name="trackTitle"
                    value={this.state.trackTitle}
                    onChange={this.onChange}
                  />
                </div>
                <button className="btn btn-primary btn-large btn-block mb-5" type="submit">Get Track Lyrics</button>
              </form>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Search