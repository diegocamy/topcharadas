import React, { Component } from 'react'
import Charada from '../Components/Charada'
import './TopCharadas.css'

import FlipMove from 'react-flip-move';

export default class TopCharadas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      charadas: []
    }
    this.getCharada = this.getCharada.bind(this);
    this.guardarCharadas = this.guardarCharadas.bind(this);
    this.cargarCharadasGuardadas = this.cargarCharadasGuardadas.bind(this);
    this.actualizarPuntaje = this.actualizarPuntaje.bind(this);
  }

  async getCharada() {
    const resp = await fetch("https://cors-anywhere.herokuapp.com/https://us-central1-kivson.cloudfunctions.net/charada-aleatoria", {
      headers: {
        "Accept": "application/json"
      }
    });
    const charada = await resp.json();
    //Verificar si la charada ya existe en state
    //Si no existe se agrega
    if (!this.state.charadas.find(ch => ch.id === charada.id)) {
      this.setState(prevst => {
        return {
          charadas: [...prevst.charadas, { ...charada, votos: 0 }]
        }
      });
    } else {
      //Si existe se llama la funcion nuevamente
      this.getCharada();
    }

  }

  cargarCharadasGuardadas() {
    if (window.localStorage.getItem('charadas')) {
      const charadas = JSON.parse(window.localStorage.getItem('charadas'));
      this.setState({ charadas })
    }
  }

  guardarCharadas() {
    if (this.state.charadas.length > 0) {
      window.localStorage.setItem('charadas', JSON.stringify(this.state.charadas));
    }
  }

  actualizarPuntaje(valoracion, id) {
    if (valoracion === "positivo") {
      //Sumar un voto a la charada
      const charadas = this.state.charadas.map(charada => {
        if (charada.id === id) {
          charada.votos++;
        }
        return charada;
      });
      //actualizar state
      this.setState({ charadas });
    } else if (valoracion === "negativo") {
      //Restar un voto a la charada
      const charadas = this.state.charadas.map(charada => {
        if (charada.id === id) {
          charada.votos--;
        }
        return charada;
      });
      //actualizar state
      this.setState({ charadas });
    }
  }

  componentDidMount() {
    this.cargarCharadasGuardadas();
  }

  componentDidUpdate() {
    this.guardarCharadas();
  }

  render() {
    const charadas = this.state.charadas.map(charada => <Charada data={charada} key={charada.id}
      actualizarPuntaje={this.actualizarPuntaje} />);
    return (
      <div className="topcharadas">
        <div className="titulo">
          <h1>TOP CHARADAS</h1>
          <div>
            <button onClick={this.getCharada}>NOVA CHARADA</button>
          </div>
        </div>
        <div className="lista-charadas">
          <FlipMove
            staggerDurationBy={22}
            staggerDelayBy={0}
            delay={0}
            easing="cubic-bezier(0.39,0,0.5,1.4)"
            duration={600}>
            {charadas.sort((a, b) => b.props.data.votos - a.props.data.votos)}
          </FlipMove>
        </div>
      </div>
    )
  }
}
