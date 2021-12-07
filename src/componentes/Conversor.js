import React, { Component } from 'react';

export default class Conversor extends Component {
     constructor(props){
        super(props);

        this.state = {
            lado1: "",
            lado2: "",
            hipotenusa: "",
            method: "calcular_hipotenusa",
            cateto_menor:"",
            cateto_maior:"",
        }

        this.calcular_hipotenusa = this.calcular_hipotenusa.bind(this);
     }
     print_state(){
        console.log(this.state.hipotenusa)
        console.log(this.state.cateto_menor)
        console.log(this.state.cateto_maior)
     }
     calcular_hipotenusa(){
        let lado1 = this.state.lado1;
        let lado2 = this.state.lado2;
        let method = this.state.method
        let url = `https://flaskprojectravellys.herokuapp.com/${method}/${lado1}/${lado2}`;
        console.log(url)

        fetch(url)
            .then( res => {
                return res.json()
            })
            .then(json => {
                console.log('return', json)
                this.setState(json, this.print_state);
                
                let statusCode = json.statusCode;
                if (statusCode !== 200) {
                    alert("Error ao chamar API: " + json.message)
                }

            });
    }


    render() {
        return (
            <div className="conversor">
                
                <h2> Lado 1: 
                    <input className="lado1" onChange={(event) => { this.setState({lado1:event.target.value})}} type="text"></input>
                </h2>
                <h2> Lado 2: 
                    <input className="lado2" onChange={(event) => { this.setState({lado2:event.target.value})}} type="text"></input>
                </h2>
                <h2> Metódo:
                    <select name="select" onChange={(event) => this.setState({method:event.target.value})} value={this.state.valeu}>
                        <option value="calcular_hipotenusa" selected>Calcular Hipotenusa</option>
                        <option value="calcular_cateto" >Calcular Cateto</option>
                    </select>
                </h2>
                <input className="button" type="button" value="Converter" onClick={this.calcular_hipotenusa}></input>
                

                <h2>Hipotenusa: <span> {this.state.hipotenusa} </span></h2>
                <h2>Cateto Menor: <span> {this.state.cateto_menor} </span></h2>
                <h2>Cateto Maior: <span> {this.state.cateto_maior} </span></h2>

            </div>
        )
    }
}