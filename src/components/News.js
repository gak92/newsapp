import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  baseURL = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fa4b6d2d25754f26930b6b46e97af535';
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }

  async componentDidMount() {
    let requestedURL = `${this.baseURL}&page=1&pageSize=20`;
    let data = await fetch(requestedURL);
    let parseData = await data.json();
    console.log('Requested URL: ', requestedURL);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
    })
  }

  handlepreviousClick = async () => {
    let requestedURL = `${this.baseURL}&page=${this.state.page-1}&pageSize=20`;
    let data = await fetch(requestedURL);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
      page: this.state.page-1,
    });
  }

  handlenextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults/20)) {

    }
    else {
      let requestedURL = `${this.baseURL}&page=${this.state.page+1}&pageSize=20`;
      let data = await fetch(requestedURL);
      let parseData = await data.json();
      console.log(parseData);
      this.setState({
        articles: parseData.articles,
        page: this.state.page+1,
      });
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h2>Newsapp - Top headlines</h2>
        <div className='row'>
          {this.state.articles.map((ele) => {
            return (
            <div className='col-md-4' key={ele.url}>
            <NewsItem
              title={ele.title} 
              description={ele.description} 
              imageUrl={ele.urlToImage}
              newsUrl={ele.url}
            />
          </div>
          )
          })}
        </div>
        <div className='d-flex justify-content-between'>
          <button
            type="button"
            className="btn btn-info"
            onClick={this.handlepreviousClick}
            disabled={this.state.page<=1}
            >
              &larr; Previous
          </button>
          <button 
            type="button" 
            className="btn btn-info"
            onClick={this.handlenextClick}
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/20)}
            >
              Next &rarr; 
          </button>
        </div>
      </div>
    )
  }
}

export default News