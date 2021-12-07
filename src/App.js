import { useEffect, useState } from "react";
import "./App.css";

import Quotes from "./components/Quotes";

function App() {
  const [quotesList, setQuoteList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getQuotes();
  }, []);

  const getQuotes = () => {
    const quotesApi =
      "https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json";
    fetch(quotesApi)
      .then((response) => response.json())
      .then((data) => {
        const getRandomNumber = Math.floor(
          Math.random() * (data.length - 1) + 1
        );
        setQuoteList(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setIsError(error);
      });
  };

  const displayQuotes = isLoading ? (
    <p>ładowanie</p>
  ) : (
    <Quotes quotesList={quotesList} isLoading={isLoading} isError={isError} />
  );

  return (
    <div className="App">
      <header className="App-header">Zadanie 3 - React</header>
      <main>
        <div className="quote-wrapper">
          <p className="quote"></p>
          <p className="author"></p>
        </div>
        {displayQuotes}
      </main>
    </div>
  );
}

export default App;
