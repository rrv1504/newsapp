import React, { Component } from "react";
import NewsItem from "./NewsItem";
import LoaderComponent from "./LoaderComponent";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 9,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalArticles: 0,
      hasMore: true,
    };
  }

  fetchNews = async (page) => {
    this.props.setProgress(10);
    this.setState({ loading: true });

    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
    this.props.setProgress(30);

    let response = await fetch(url);
    this.props.setProgress(50);

    let parsedData = await response.json();
    this.props.setProgress(80);

    this.setState({
      articles: parsedData.articles,
      totalArticles: parsedData.totalResults,
      page: page,
      loading: false,
      hasMore: parsedData.articles.length < parsedData.totalResults,
    });
    this.props.setProgress(100);
  };

  fetchMoreData = async () => {
    const nextPage = this.state.page + 1;

    let url = `https://newsapi.org/v2/top-headlines?category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;

    let response = await fetch(url);
    let parsedData = await response.json();

    const newArticles = parsedData.articles || [];

    // stop fetching if no articles returned
    if (newArticles.length === 0) {
      this.setState({ hasMore: false });
      return;
    }

    this.setState((prevState) => {
      const updatedArticles = prevState.articles.concat(newArticles);

      return {
        articles: updatedArticles,
        page: nextPage,
        totalArticles: parsedData.totalResults,
        hasMore: updatedArticles.length < parsedData.totalResults,
      };
    });
  };

  async componentDidMount() {
    this.fetchNews(this.state.page);
    document.title = `NewsMonkey - ${this.props.category}`;
  }

  handlePrevClick = async () => {
    if (this.state.page <= 1) return;
    this.fetchNews(this.state.page - 1);
  };

  handleNextClick = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalArticles / this.props.pageSize)
    )
      return;
    this.fetchNews(this.state.page + 1);
  };

  render() {
    const capitalizedCategory =
      this.props.category.charAt(0).toUpperCase() +
      this.props.category.slice(1);

    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - {capitalizedCategory}</h1>

        {/* ================= PAGINATION IMPLEMENTATION ================= */}

        {/* 
        <div className="row my-3">
          {this.state.loading && <LoaderComponent />}

          {this.state.articles.map((element, index) => {
            return (
              <div className="col-md-4 my-3 d-flex" key={element.url + index}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description
                      ? element.description.slice(0, 88)
                      : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
            );
          })}
        </div>

        <nav aria-label="Page navigation example">
          <ul className="pagination d-flex justify-content-between">
            <li
              className={`page-item ${
                this.state.page === 1 ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={this.handlePrevClick}
                disabled={this.state.page === 1}
              >
                &laquo; Previous
              </button>
            </li>

            <li
              className={`page-item ${
                this.state.page + 1 >
                Math.ceil(this.state.totalArticles / this.props.pageSize)
                  ? "disabled"
                  : ""
              }`}
            >
              <button
                className="page-link"
                onClick={this.handleNextClick}
                disabled={
                  this.state.page + 1 >
                  Math.ceil(this.state.totalArticles / this.props.pageSize)
                }
              >
                Next &raquo;
              </button>
            </li>
          </ul>
        </nav>
        */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<LoaderComponent />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You have seen all the news !!</b>
            </p>
          }
        >
          <div className="row my-3">
            {this.state.articles.map((element, index) => {
              return (
                <div className="col-md-4 my-3 d-flex" key={element.url + index}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              );
            })}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

export default News;
