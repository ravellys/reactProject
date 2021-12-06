import React, { Component } from 'react';

export default class Conversor extends Component {
     constructor(props){
        super(props);

        this.state = {
            lado1: "",
            lado2: "",
            hipotenusa: ""
        }

        this.calcular_hipotenusa = this.calcular_hipotenusa.bind(this);
     }

     calcular_hipotenusa(){
        let lado1 = this.state.lado1;
        let lado2 = this.state.lado2;
        let url = `https://flaskprojectravellys.herokuapp.com/calcular_hipotenusa/${lado1}/${lado2}`;
        console.log(url)

        fetch(url)
            .then( res => {
                return res.json()
            })
            .then(json => {
                console.log('return', json)
                let hipotenusa = parseFloat(json['hipotenusa']);
                this.setState({hipotenusa})
            });
    }


    render() {
        return (
            <div className="conversor">

                <input className="lado1" onChange={(event) => { this.setState({lado1:event.target.value})}} type="text"></input>
                <input className="lado2" onChange={(event) => { this.setState({lado2:event.target.value})}} type="text"></input>
                <input className="button" type="button" value="Converter" onClick={this.calcular_hipotenusa}></input>
                
                <h2>Hipotenusa: <span> {this.state.hipotenusa} </span></h2>

            </div>
        )
    }
}