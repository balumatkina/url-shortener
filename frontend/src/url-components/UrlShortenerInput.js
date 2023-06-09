import React, { useState } from "react";
import TopModal from "../modal-components/TopModal";
import axios from "axios";

const UrlShortenerInput = () => {
  const [url, setUrl] = useState("");
  const [baseUrl, setBaseUrl] = useState("short/");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    setResult("");
    setMessage("");
    e.preventDefault();
    if (!url) {
      setMessage(process.env.REACT_APP_URL_ERROR);
      return;
    }

    setMessage("Waiting for server resnonse...");
    await axios
      .post(`${process.env.REACT_APP_DOMAIN_URL}/${baseUrl.replace("/", "")}`, {
        origUrl: url,
      })
      .then((res) => {
        setMessage("");
        setResult(res.data.shortUrl);
      })
      .catch((err) => {
        setMessage(err.response.data.msg);
      });
    setUrl("");
  };

  const handleBaseChange = (e) => {
    setBaseUrl(e.target.value);
  };

  const handleCloseModal = () => {
    setMessage("");
  };

  return (
    <div className="flex--column font">
      <form onSubmit={handleSubmit}>
        <div className="title">
          <h2>URL Shortener</h2>
        </div>
        <div className="flex--stretch">
          <select
            className="select"
            value={baseUrl}
            onChange={handleBaseChange}
          >
            <option value="short/">short</option>
            <option value="small/">small</option>
            <option value="short-link/">short-link</option>
          </select>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="btn btn--shorten" type="submit">
            Shorten URL
          </button>
          {message && (
            <div>
              <TopModal onClose={handleCloseModal}>
                <p>{message}</p>
              </TopModal>
            </div>
          )}
        </div>
      </form>

      {result && (
        <div className="c-pill c-pill--success">
          <p>
            Shortened URL: <a href={result}>{result}</a>
          </p>
        </div>
      )}
    </div>
  );
};

export default UrlShortenerInput;
