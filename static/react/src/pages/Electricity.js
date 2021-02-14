import React, {Component} from 'react';

class Electricity extends Component {
    constructor (props){
        super (props);
        this.state = {
            type: 'electricity',
            electricity_unit: 'kwh',
            electricity_value: 0,
            country: 'us',
            answer: false,
            carbon_lb: 0,
            carbon_kg: 0
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleElectricity = this.handleElectricity.bind(this);
    }

    handleElectricity (event){
        this.setState({electricity_value: event.target.value});
    }

    handleSubmit (event){
        event.preventDefault();
        if (this.state.electricity_value <= 0){
            alert("Electricity Consumption has to be greater than 0");
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
                electricity_unit: this.state.electricity_unit,
                electricity_value: this.state.electricity_value,
                country: this.state.country
            })
        }).then(response => {
            if (response.ok)
                return response.json();
            throw new Error ("Request failed");
        }, networkError => {
            console.log(networkError.message); }
        ).then(res => {
            console.log(res);
            this.setState({carbon_kg: res.data.attributes.carbon_kg, 
                carbon_lb: res.data.attributes.carbon_lb,
                answer: true
            });
        });
    }

    handleClick(){
        this.setState({answer: false});
    }
    
    render (){
        if (!this.state.answer){
            return (
                <div className="container-md my-5 pt-3" id="container">
                    <h2 className="py-5">Carbon Emission of Electricity Consumption</h2>
                    <form className="px-md-5" onSubmit = {this.handleSubmit}>
                        <div className="form-group">
                            <label for="exampleFormControlInput1">Electricity Consumption(kwh): </label>
                            <input className="form-control" type="number" value = {this.state.electricity_value} onChange = {this.handleElectricity}></input>
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
                    <h2 className="py-5">Carbon Emission of Electricity Consumption</h2>
                    <p>Total Carbon Emission (kg): {this.state.carbon_kg}</p>
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

export default Electricity;