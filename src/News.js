import React, { useEffect,useState } from "react";
import NewsItem from "./NewsItem";
import LoaderComponent from "./LoaderComponent";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalArticles, setTotalArticles] = useState(0)
  const [hasMore, setHasMore] = useState(true)


  const fetchNews = async (page) => {
    props.setProgress(10);
    setLoading(true);
    let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    props.setProgress(30);

    let response = await fetch(url);
    props.setProgress(50);

    let parsedData = await response.json();
    props.setProgress(80);

    setArticles(parsedData.articles);
    setTotalArticles(parsedData.totalResults);
    setPage(page);
    setLoading(false);
    setHasMore(parsedData.articles.length < parsedData.totalResults); 
    props.setProgress(100);
  };

  const fetchMoreData = async () => {
    const nextPage = page + 1;

    let url = `https://newsapi.org/v2/top-headlines?category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;

    let response = await fetch(url);
    let parsedData = await response.json();

    const newArticles = parsedData.articles || [];

    // stop fetching if no articles returned
    if (newArticles.length === 0) {
      setHasMore(false);
      return;
    }
    const updatedArticles = articles.concat(newArticles);
    setArticles(updatedArticles);
    setPage(nextPage);
    setTotalArticles(parsedData.totalResults);
    setHasMore(updatedArticles.length < parsedData.totalResults);

    
  };

  useEffect(() => {
    fetchNews(page);
    document.title = `NewsMonkey - ${props.category}`;
  }, [])

  // componentDidMount = async () => {
  //   this.fetchNews(this.state.page);
  //   document.title = `NewsMonkey - ${props.category}`;
  // }


  // const handlePrevClick = async () => {
  //   if (page <= 1) return;
  //   fetchNews(page - 1);
  // };

  // const handleNextClick = async () => {
  //   if (
  //     page + 1 >
  //     Math.ceil(totalArticles / props.pageSize)
  //   )
  //     return;
  //   fetchNews(page + 1);
  // };

  
    const capitalizedCategory =
      props.category.charAt(0).toUpperCase() +
      props.category.slice(1);

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
                Math.ceil(this.state.totalArticles / props.pageSize)
                  ? "disabled"
                  : ""
              }`}
            >
              <button
                className="page-link"
                onClick={this.handleNextClick}
                disabled={
                  this.state.page + 1 >
                  Math.ceil(this.state.totalArticles / props.pageSize)
                }
              >
                Next &raquo;
              </button>
            </li>
          </ul>
        </nav>
        */}

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<LoaderComponent />}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>You have seen all the news !!</b>
            </p>
          }
        >
          <div className="row my-3">
            {articles.map((element, index) => {
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

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
