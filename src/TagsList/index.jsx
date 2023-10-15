import '../index.scss';

function TagsList({tagsList = [], activeTag, setActiveTag}) {
    return (
        <ul className="tags">
            {tagsList.map(((item, index) => (
                <li key={index} className={index === activeTag ? "active" : ""} onClick={() => {
                    setActiveTag(index);
                }
                }>{item.name}</li>
            )))}
        </ul>
     
    )
  }
  

export default TagsList;