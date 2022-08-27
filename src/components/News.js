import React, { Component } from 'react';
import PropTypes from 'prop-types'
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export class News extends Component {
  static defaultProps = {
    pageSize: 8,
    country: 'us',
    category: 'general',
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  }
  
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }

  async componentDidMount() {
    let baseURL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa4b6d2d25754f26930b6b46e97af535`;
    let requestedURL = `${baseURL}&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(requestedURL);
    let parseData = await data.json();

    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    })
  }

  handlepreviousClick = async () => {
    let baseURL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa4b6d2d25754f26930b6b46e97af535`;
    let requestedURL = `${baseURL}&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(requestedURL);
    let parseData = await data.json();

    this.setState({
      articles: parseData.articles,
      page: this.state.page-1,
      loading: false,
    });
  }

  handlenextClick = async () => {
    let baseURL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fa4b6d2d25754f26930b6b46e97af535`;
    if (this.state.page + 1 <= Math.ceil(this.state.totalResults/this.props.pageSize)) {
      let requestedURL = `${baseURL}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let data = await fetch(requestedURL);
      let parseData = await data.json();

      this.setState({
        articles: parseData.articles,
        page: this.state.page+1,
        loading: false,
      });
    }
  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className="text-center">Newsapp - Top headlines</h2>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((ele) => {
            return (
            <div className='col-md-4' key={ele.url}>
            <NewsItem
              title={ele.title} 
              description={ele.description} 
              imageUrl={ele.urlToImage}
              newsUrl={ele.url}
              author={ele.author}
              date={ele.publishedAt}
              source={ele.source.name}
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
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)}
            >
              Next &rarr; 
          </button>
        </div>
      </div>
    )
  }
}

export default News;