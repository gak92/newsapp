import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    let baseURL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}`;
    let requestedURL = `${baseURL}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(requestedURL);
    let parseData = await data.json();
    console.log(parseData);

    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    setPage(page+1);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `${this.capitalizeFirstLetter(props.category)} - NewsApp`;
    updateNews();
  });

  const fetchMoreData = async () => {
    let baseURL = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}`;
    let requestedURL = `${baseURL}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(requestedURL);
    let parseData = await data.json();

    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
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

    return (
      <div className='my-3'>
        <h2 className="text-center" style={{marginTop: '90px'}}>
          Newsapp - Top {capitalizeFirstLetter(props.category)} headlines
        </h2>
        {loading && <Spinner />}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className='row'>
              {articles.map((ele) => { 
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
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)}
            >
              Next &rarr; 
          </button>
        </div> */}
      </div>
    )
  }

News.defaultProps = {
  pageSize: 8,
  country: 'us',
  category: 'general',
};

News.propTypes = {
  pageSize: PropTypes.number,
  country: PropTypes.string,
  category: PropTypes.string,
}

export default News;