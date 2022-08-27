import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false
    }
  }

  async componentDidMount() {
    let   URL = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=fa4b6d2d25754f26930b6b46e97af535';
    let data = await fetch(URL);
    let parseData = await data.json();
    console.log(parseData);
    this.setState({
      articles: parseData.articles,
    })
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
      </div>
    )
  }
}

export default News