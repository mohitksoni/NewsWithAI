import React, {useState, useEffect, useCallback, useRef} from 'react'
import NewsCards from './components/NewsCards/NewsCards';
import alanBtn from '@alan-ai/alan-sdk-web';
import './App.scss'

import {images} from './images/index'

const country = ['--Choose The Country--','Argrntina','Australia','Austria','Brlgium','Brazil','Bulgaria','Canada','China','Colombia','Cuba','Czech Republic',
                'Egypt','France','Germany','Greece','Hong Kong','Hungary','India','Indonesia','Ireland','Israel','Italy','Japan','Latvia','Lithuania',
                'Malaysia','Mexico','Morocco','Netherlands','New Zealand','Nigeria','Norway','Philippines','Poland','Portugal','Romania','Russia',
                'Saudi Arabia','Serbia','Singapore','Slovakia','Slovenia','South Africa','South Korea','Sweden','Switzerland','Taiwan','Thailand',
                'Turkey','UAE','Ukraine','United Kingdom','United States','Venuzuela'];
const language = ['--Choose The Language--','Arabic','Chinese','Dutch','English','French','German','Hebrew','Italian','Norwegian','Portuguese','Russian','Spanish','Swedish'];

const sortBy = ['--Sort By--','Popularity','Relevancy','Recent'];

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);
  const [alanInstance, setAlanInstance] = useState();
  const [selectedCountry, setSelectedCountry] = useState("--Choose The Country--");
  const [selectedLanguage, setSelectedLanguage] = useState("--Choose The Language--");
  const [selectedSortBy, setSelectedSortBy] = useState('--Sort By--');
  const [fromInDate, setFromInDate] = useState(new Date());
  const [toInDate, settoInDate] = useState(new Date());

  const countryRef = useRef();
  const languageRef = useRef();
  const sortByRef = useRef();
  const fromInRef = useRef();
  const toInRef = useRef();

  const openArticle = useCallback(() => {
    alanInstance.playText("Opening...")
    },
    [alanInstance],
  )
  const openArticleError = useCallback(() => {
    alanInstance.playText("Please try that again...")
    },
    [alanInstance],
  )

  useEffect(() =>{
    window.addEventListener("openArticle",openArticle);
    
    return () => {
      window.removeEventListener("openArticle",openArticle);
    }
  },[openArticle]);

  useEffect(() =>{
    window.addEventListener("openArticleError",openArticleError)  ;
    
    return () => {
      window.removeEventListener("openArticleError",openArticleError);
    }
  },[openArticleError]);

  useEffect(() => {
    if(alanInstance != null) return;
    setAlanInstance(alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      top:'10px',
      onCommand: ({command, articles, number}) => {
        if(command === 'newsHeadlines'){
          setNewsArticles(articles);
          setActiveArticle(0);
        }
        else if(command === 'highlight'){
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        }
        else if (command === 'open') {
          const article = articles[number - 1];
          if (article) {
            window.open(article.url, '_blank');
            window.dispatchEvent(new CustomEvent("openArticle"));
          }
          else{
            window.dispatchEvent(new CustomEvent("openArticleError"));
          }
        }
      }
    }))
  },[]);

  function countryFilter(event){
    setSelectedCountry(event.target.value);
    alanInstance.callProjectApi("script::countryFilter", {data:countryRef.current.value}, function(error, result){});
  }
  function languageFilter(event){
    setSelectedLanguage(event.target.value);
    alanInstance.callProjectApi("script::languageFilter", {data:languageRef.current.value}, function(error, result){});
  }
  function sortByFilter(event){
    setSelectedSortBy(event.target.value);
    alanInstance.callProjectApi("script::sortByFilter", {data:sortByRef.current.value}, function(error, result){});
  }
  function fromTime(event){
    setFromInDate(event.target.value);
    let frmtime = new Date(fromInRef.current.value);
    let dateStr = `${frmtime.getFullYear()}-${frmtime.getMonth()}-${frmtime.getDate()}`;
    console.log(dateStr);
    alanInstance.callProjectApi("script::fromTime", {data:dateStr}, function(error, result){});
  }
  function toTime(event){
    settoInDate(event.target.value);
    let ttime = new Date(toInRef.current.value);
    let dateStr = `${ttime.getFullYear()}-${ttime.getMonth()}-${ttime.getDate()}`;
    alanInstance.callProjectApi("script::toTime", {data:dateStr}, function(error, result){});
  }
  return (
    <div className='app__main'>
        <div className='app__innerContainer'>
          <h1 className='h-text'>Ask <span>News</span> That Interests you </h1>
          <div className='app__cardsFilter'>
            <div className='app__aiLogo'>
              <img src={images.logo} alt = 'logo'/>
            </div>
            <div className='app__filterCard'>
              <label htmlFor='countrySel' className='label-1'>Country</label>
              <select id='countrySel' onChange={countryFilter} ref = {countryRef} value = {selectedCountry}>
                {country.map((each,index)=><option key={`${each}${index}`}>{each}</option>)}
              </select>
              <label htmlFor='languageSel' className='label-1'>Language</label>
              <select id='languageSel' onChange={languageFilter} ref = {languageRef} value = {selectedLanguage}>
                {language.map((each,index)=><option key={`${each}${index}`}>{each}</option>)}
              </select>
              <label htmlFor='fromInput' className='label-1'>From</label>
              <input onChange={fromTime} id='fromInput' ref={fromInRef} type="Date"></input>
              <label htmlFor='toInput' className='label-1'>To</label>
              <input onChange={toTime} id= 'toInput' ref={toInRef} type="Date"></input>
              <label htmlFor='sortEl' className='label-1'>Sort By</label>
              <select id='sortEl' onChange={sortByFilter} ref = {sortByRef} value = {selectedSortBy}>
                {sortBy.map((each,index)=><option key={`${each}${index}`}>{each}</option>)}
              </select>
            </div>
          </div>
          <div className='app__main-content col-12'>
            <NewsCards articles = {newsArticles} activeArticle = {activeArticle}/>
          </div>
        </div>
    </div>
  )
}

export default App;