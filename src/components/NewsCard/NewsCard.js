import React,{useState, useEffect, createRef} from 'react'
import './NewsCard.scss'

const NewsCard = (props) => {
    const activeArticle = props.activeArticle
    const article = props.article;
    const index = props.index + 1;
    const size = props.size;
    const {description, publishedAt, source, title, url, urlToImage} = article;
    const date = new Date(publishedAt);
    
    const [elRefs, setElRefs] = useState([]);
    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

    useEffect(() => {
        window.scroll(0, 0);

        setElRefs((refs) => Array(size).fill().map((_, j) => refs[j] || createRef()));
    }, []);

    useEffect(() => {
        if (index === activeArticle && elRefs[activeArticle]) {
        scrollToRef(elRefs[activeArticle]);
        }
    }, [index, activeArticle, elRefs]);

    return (
        <div ref={elRefs[index]} className='app__newsCard' style={(activeArticle === index)?{borderBottom: "8px solid #2b397c"}:{}}>
            <div>
                <img className='app__newsCard-img' src = {urlToImage} alt = {`${source}${index}img`}/>
            </div>
            <div className='app__newsCard-content'>
                <div className='app__newsCard-card pl-0 pr-0'>
                    <p className='p-text'>{date.toDateString('dddd MMM yyyy h:mm:ss')}</p>
                    <p className='p-text p-text2'>{source.name}</p>
                </div>
                <h1 className='h-text2'>{title}</h1>
                <p className='p-text middle_text'>{description}</p>
                <div className='app__newsCard-card-bottom'>
                    <a href={url} target = '__blank'><p>LEARN MORE</p></a>
                    <span>{index}</span>
                </div>
            </div>
        </div>
  )
}

export default NewsCard;