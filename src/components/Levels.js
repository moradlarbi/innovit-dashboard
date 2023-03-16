const Levels = ({title, elements, type}) => {
    //title ex : Ingredient's levels
    //Elements=[{id, name, value}]
    //type : can be "level" or "temperature" 

    //need to import <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    
    const symbol= type==="level"? '%' : '°C';
    return ( 
        <div className="level-window">
            <center>
                <h3>{title}</h3>
            </center>
            <div className="level-container">
                <button>&lt;</button>
                <div className="elements-container">
                    {elements.map(element =>(
                        <div className="element-preview" key={element.id}>
                            <p>{element.name}</p>
                        <div class='progress'>
                            <div class="w3-light-grey w3-round-xlarge">
                                <div class="w3-container w3-color w3-round-xlarge w3-center" style={{
                                    width:element.value+'%',
                                    backgroundColor: element.value<30?'#FF6651' : '#11B07A',
                                    color:'white',
                                    }}>{element.value}{symbol}</div>
                            </div>
                        </div>
                        </div>
                    ))}
                </div>
                <button>&gt;</button>
            </div>
        </div>
     );
}
 
export default Levels ;