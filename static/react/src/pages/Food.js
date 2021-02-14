import {useState} from 'react';
import './Food.css';

const Food = () => {
    const [img, setImg] = useState(null);
    const [foods, setFoods] = useState([]);
    const [carbons, setCarbons] = useState([]);
    const [equiv, setEquiv] = useState({
        mi: '',
        gas: '',
        coal: '',
        phone: '',
        trees: '',
    });
    const serverEndpoint = 'http://localhost:5000';
    const submitForm = (e) => {
        e.preventDefault();
        let userInput = document.getElementById('image-upload').value;
        fetch(serverEndpoint + '/ingredients?query_url=' + userInput
        ).then(response => response.json()
        ).then(parsedResponse => {
            setImg(parsedResponse.img);
            setFoods(parsedResponse.foods);
            setCarbons(parsedResponse.carbons);
            setEquiv(parsedResponse.equiv);
        });
    }

    return (
        <div id="container" style={{"padding-top": '100px'}}>
            <h2>Carbon Emission from Food Sources</h2>
            <form>
                <input type="text" name="query_url" placeholder="Paste in a URL of an image" id="image-upload" />
                <input type="submit" value="Submit" className="sub" onClick={submitForm}/>
            </form>
            {
                img && (
                    <div id="pic">
                        <h2>Your submission: </h2>
                        <img id="query-img" src={img} />
                    </div>
                )
            }
            <div id="ingredients">
                {
                    foods && (
                        <div>
                            <h2>Food Matches</h2>
                            <ul>
                                {foods.map(item => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )
                }
                <br />
                <DisplayResults carbons={carbons} equiv={equiv} />
            </div>
        </div>
    );
}

const DisplayResults = ({carbons, equiv}) => {
    if(!carbons) {
        return <div></div>
    }
    if(carbons.length === 0){
        return (
            <>
                <h3>Match Failure</h3>
                <p>Unfortunately, we weren't able to match your picture with an item in our food to carbon database.</p>
                <p>Please try another image.</p>
            </>
        );
    }
    return (
        <>
            <h2>Greenhouse Gas Emissions</h2>
            <h4>In Lbs of CO<sub>2</sub> per Kilogram of Food Product</h4>
            <ul>
                {carbons.map(item => (
                    <li key={item[0]}>{ item[0] }: {item[1]}</li>
                ))}
            </ul>
            <br />
            <h3>That could mean the equivalent of...</h3>
            <ul>
                <li>Greenhouse gas emissions from <b>{equiv["mi"]}</b> miles driven by an average passenger vehicle</li>
                <li>CO<sub>2</sub> emissions from <b>{equiv["gas"]}</b> gallons of gasoline consumed</li>
                <li>CO<sub>2</sub> emissions from <b>{equiv["coal"]}</b> pounds of coal burned</li>
                <li>CO<sub>2</sub> emissions from <b>{equiv["phone"]}</b> phones charged</li>
                <li>Carbon sequested by <b>{equiv["trees"]}</b> tree saplings grown for 10 years</li>
            </ul>
        </>
    );
}

export default Food;