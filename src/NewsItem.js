import React from "react";

export const NewsItem = (props) => {
  const defaultImage = "/default-image.webp";
  let { title, description, imageUrl, newsUrl, author, date } = props;
  let d = new Date(date);
  let formattedDate = d.toLocaleString();

  return (
    <div>
      <div className="card h-100">
        <img
          src={imageUrl || defaultImage}
          className="card-img-top"
          alt="news"
          style={{ height: "250px", objectFit: "cover" }}
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = defaultImage;
          }}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "Unknown" : author} on {formattedDate}
            </small>
          </p>

          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary mt-auto"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
