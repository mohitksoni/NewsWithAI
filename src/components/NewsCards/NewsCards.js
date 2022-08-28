import React from 'react'
import NewsCard from '../NewsCard/NewsCard'

import './NewsCards.scss'

const infoCards = [
  { color: '#127d7c', title: 'Latest News', text: 'Give me the latest news' },
  { color: '#47127d', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
  { color: '#487d12', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
  { color: '#7d1212', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
];

const NewsCards = ({articles, activeArticle}) => {

  if(articles.length === 0){
    return (
        <div className='app__introContainer'>
          {
            infoCards.map((card) => {
              return (<div className = 'app__introCards' style = {{backgroundImage:`linear-gradient(to bottom,#2b291b,${card.color})`}} key = {card.title}>
                <h1 className='h-text1'>{card.title}</h1>
                {card.info !== undefined ? card.info.split(',').map((each) => <p key = {each} className='p_category'>{each}<br/></p>):''}
                <p className='p-text'>Try Saying:</p>
                <p className='p-text1'>{card.text}</p>
              </div>
              )
            })
          }
        </div>
    )
}
  return (
        <div className='app__newsContainer'>
          {articles.map((article,index) => {
              return <NewsCard article = {article} size = {articles.length} activeArticle = {activeArticle} index = {index} key={`${article.source}${index}Card`}/>
          })}
        </div>
  )
}

export default NewsCards;