import React, {Component} from 'react';

class Shipping extends Component {
    constructor (props){
        super (props);
        this.state = {
            distance_unit: 'mi',
            distance_value: 0,
            type: 'shipping',
            answer: false,
            weight_value: 0,
            weight_unit: 'kg',
            transport_method: 'truck',
            carbon_lb: 0,
            carbon_g: 0
        };
        this.handleUnit = this.handleUnit.bind(this);
        this.handleDistance = this.handleDistance.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleWeightUnit = this.handleWeightUnit.bind(this);
        this.handleWeight = this.handleWeight.bind(this);
    }

    handleUnit (event){
        this.setState({distance_unit: event.target.value});
    }

    handleDistance (event){
        this.setState({distance_value: event.target.value});
    }

    handleSubmit (event){
        event.preventDefault();
        if (this.state.distance_value <= 0 || this.state.weight_value <= 0){
            alert("Distance or Weight has to be greater than 0");
            return;
        }
        
        fetch('https://www.carboninterface.com/api/v1/estimates', {
            method: 'POST',
            headers: {
                Authorization: "Bearer rsAEeLI7NL3fl9z7RvlNzg",
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                type: this.state.type,
                weight_unit: this.state.weight_unit,
                weight_value: this.state.weight_value,
                distance_unit: this.state.distance_unit,
                distance_value: this.state.distance_value,
                transport_method: this.state.transport_method
            })
        }).then(response => {
            if (response.ok)
                return response.json();
            throw new Error ("Request failed");
        }, networkError => {
            console.log(networkError.message); }
        ).then(res => {
            console.log(res);
            this.setState({carbon_g: res.data.attributes.carbon_g, 
                carbon_lb: res.data.attributes.carbon_lb,
                answer: true
            });
        });
    }

    handleWeightUnit(event){
        this.setState({weight_unit: event.target.value });
    }

    handleWeight(event){
        this.setState({weight_value: event.target.value});
    }

    handleClick(){
        this.setState({answer: false});
    }
    
    render (){
        if (!this.state.answer){
            return (
                <div className="container-md my-5 pt-3" id="container">
                    <h2 className="py-5">Carbon Emission of Shipping</h2>
                    <form className="px-md-5" onSubmit = {this.handleSubmit}>
                            <div className="form-group">
                                <label for="exampleFormControlInput1">Weight Unit: </label>
                                <select className="form-control" for="exampleSelect1" value = {this.state.weight_unit} onChange = {this.handleWeightUnit}>
                                    <option value = 'kg'>kg</option>
                                    <option value = 'lb'>lb</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label for="exampleFormControlInput1">Weight Value of a Package: </label>
                                <input className="form-control" type="number" value = {this.state.weight_value} onChange = {this.handleWeight}></input>
                            </div>

                            <div className="form-group">
                                <label for="exampleFormControlInput1">Distance Unit: </label>
                                <select className="form-control" for="exampleSelect1" value = {this.state.distance_unit} onChange = {this.handleUnit}>
                                    <option value = 'mi'>mi</option>
                                    <option value = 'km'>km</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label for="exampleFormControlInput1">The traveling distance of the package: </label>
                                <input className="form-control" type="number" value = {this.state.distance_value} onChange = {this.handleDistance}></input>
                            </div>

                            <div className="form-group">
                                <input className="btn btn-primary pt-1" type="submit" value="search"></input>
                            </div>
                    </form>
                </div>
            )
        }
        else{
            return (
                <div className="container-md my-5 pt-3" id="container">
                    <h2 className="py-5">Carbon Emission of Shipping</h2>
                    <p>Total Carbon Emission (g): {this.state.carbon_g}</p>
                    <p>Total Carbon Emission (lb): {this.state.carbon_lb}</p>
                    <ul className="list-group" style={{color: 'black'}}>
                        <li>Greenhouse gas emissions from <b>{Math.round(1126 * this.state.carbon_lb / 1000)}</b> miles driven by an average passenger vehicle</li>
                        <li>CO<sub>2</sub> emissions from <b>{Math.round(51 * this.state.carbon_lb / 1000)}</b> gallons of gasoline consumed</li>
                        <li>CO<sub>2</sub> emissions from <b>{Math.round(500 * this.state.carbon_lb / 1000)}</b> pounds of coal burned</li>
                        <li>CO<sub>2</sub> emissions from <b>{Math.round(57848 * this.state.carbon_lb / 1000)}</b> phones charged</li>
                        <li>Carbon sequested by <b>{Math.round(7.5 * this.state.carbon_lb / 1000)}</b> tree saplings grown for 10 years</li>
                    </ul>
                    <button className="btn btn-warning pt-1" onClick = {this.handleClick}>Return</button>
                </div>
            )
        }
    }
}

export default Shipping;