// get quotes from api
let apiQuotes = [];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}


function newQuote(){
    //pick random quote
    loading();
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    //check the author field
    if(!quote.author)
        authorText.textContent = 'Unknown';
    else
        authorText.textContent = quote.author;
        
    //check the quote length
    if(quote.text.length > 120) 
        quoteText.classList.add = 'long-quote';
    else 
        quoteText.classList.remove = 'long-quote';
    
    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch(e){
        //catch error here
    }
}

//tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//on load
getQuotes();