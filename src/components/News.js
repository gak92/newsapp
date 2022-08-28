import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
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

  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsApp`;
  }

  async updateNews() {
    this.props.setProgress(10);
    let baseURL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}`;
    let requestedURL = `${baseURL}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(requestedURL);
    let parseData = await data.json();
    console.log(parseData);

    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
      page: this.state.page+1,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.updateNews();
  }

  fetchMoreData = async () => {
    console.log("Before Page #", this.state.page);

    this.setState({ page: this.state.page+1 });

    console.log("After Page #", this.state.page);

    let baseURL = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}`;
    let requestedURL = `${baseURL}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    let data = await fetch(requestedURL);
    let parseData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults,
    });
  };

  // handlepreviousClick = async () => {
  //   this.setState({
  //     page: this.state.page-1,
  //   });
  //   this.updateNews();
  // }

  // handlenextClick = async () => {
  //   this.setState({
  //     page: this.state.page+1,
  //   });
  //   this.updateNews();
  // }

  render() {
    return (
      <div className='my-3'>
        <h2 className="text-center">
          Newsapp - Top {this.capitalizeFirstLetter(this.props.category)} headlines
        </h2>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className='row'>
              {this.state.articles.map((ele) => { 
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
          </div>
        </InfiniteScroll>
        {/* <div className='d-flex justify-content-between'>
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
        </div> */}
      </div>
    )
  }
}

export default News;