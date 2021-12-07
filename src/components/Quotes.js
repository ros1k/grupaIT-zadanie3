import { useEffect, useState } from "react";
import React from "react";
import styled from 'styled-components'



const QuoteCard = styled.div`
    max-width: 800px;
    margin: 0 auto;
    border: 1px solid #282c34;
    border-radius: 10px;
    padding: 35px 45px;
    margin-bottom: 50px;
    min-height: 320px;
    display: flex;
    background-color: rgba(95, 158, 160, 0.3);
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    
`
const Quote = styled.h2`
    font-size:28px;
    color:#282c34;
    margin-bottom: 30px;
    text-align: left;
    flex-grow: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &:before{
        content:"˶";
        font-size:100px;
        position: absolute;
        top:0;
        left:10px;
        line-height: 50px;
        opacity: 0.3;
    }
`;

const Author = styled.span`
    font-size:20px;
    color:#282c34;
    text-align: right;
    font-style:italic;
`

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #d5d9d9;
  border-radius: 8px;
  box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
  box-sizing: border-box;
  color: #0f1111;
  cursor: pointer;
  display: inline-block;
  font-family: "Amazon Ember",sans-serif;
  font-size: 13px;
  line-height: 29px;
  padding: 0 10px 0 11px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  margin: 0px 10px;
  &:hover {
    background-color: #f7fafa;
  }
  &:focus {
    border-color: #008296;
    box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
    outline: 0;
  }
`



const NewQuoteButton = styled(Button)`
   
`
const PreviusQuoteButton = styled(Button)`
   
`

const Quotes = ({ quotesList, isLoading, isError }) => {
  const [quotes, setQuotes] = useState([]);
  const [showQuote, setShowQuote] = useState({ author: "", quote: "" });
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    if (!isLoading && quotes.length === 0) {
      getRandomQuote();
    }
    setCurrentId(quotes.length);
  }, [isLoading, quotes]);

  const getRandomQuote = () => {
    const getRandomNumber = Math.floor(
      Math.random() * (quotesList.length - 1) + 1
    );
    const getQuote = quotesList[getRandomNumber];
    const newQuote = {
      author: getQuote.author,
      quote: getQuote.quote,
    };

    setQuotes((arr) => [...arr, getQuote]);
    setShowQuote(newQuote);
  };

  const getPreviusQuote = () => {
    for (const key in quotes) {
      if (key == currentId - 2) {
        setShowQuote({
          author: quotes[key].author,
          quote: quotes[key].quote,
        });
      }
    }
    if (currentId > 0) {
      setCurrentId((id) => id - 1);
    }
  };

  if (isError) {
    return <div>Coś poszło nie tak {isError}</div>;
  }

  if (isLoading) {
    return <div>ładowanie cytatu</div>;
  }

  return (
    <div>
      <QuoteCard>
        <Quote>
          {showQuote.quote}
        </Quote>
        <Author>
          {showQuote.author}
        </Author>
      </QuoteCard>
      {quotes.length > 1 ? (
        <PreviusQuoteButton onClick={getPreviusQuote}>Porzedni cytat</PreviusQuoteButton>
      ) : null}
      <NewQuoteButton onClick={getRandomQuote}>Losuj następny cytat</NewQuoteButton>
    </div>
  );
};

export default Quotes;
