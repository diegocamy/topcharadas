import React, { Component } from 'react'
import './Charada.css'

export default class Charada extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mostrarRespuesta: false
    }
  }


  asignarEmoji(votos) {
    // REACCIONES -> 🤬😡😠😤😒🙁😐🙂😃😄😂🤣
    if (votos <= -15) {
      return {
        emoji: '🤬',
        color: 'red'
      };
    } else if (votos > -15 && votos <= -12) {
      return {
        emoji: '😡',
        color: 'red'
      };
    } else if (votos > -12 && votos <= -9) {
      return {
        emoji: '😠',
        color: 'red'
      };
    } else if (votos > -9 && votos <= -6) {
      return {
        emoji: '😤',
        color: 'orange'
      };
    } else if (votos > -6 && votos <= -3) {
      return {
        emoji: '😒',
        color: 'orange'
      };
    } else if (votos > -3 && votos < 0) {
      return {
        emoji: '🙁',
        color: 'yellow'
      };
    } else if (votos >= 0 && votos < 3) {
      return {
        emoji: '😐',
        color: 'black'
      };
    } else if (votos >= 3 && votos < 6) {
      return {
        emoji: '🙂',
        color: 'lawngreen'
      };
    } else if (votos >= 6 && votos < 9) {
      return {
        emoji: '😃',
        color: 'lawngreen'
      }
    } else if (votos >= 9 && votos < 12) {
      return {
        emoji: '😄',
        color: 'lawngreen'
      }
    } else if (votos >= 12 && votos < 15) {
      return {
        emoji: '😂',
        color: 'rgb(39, 224, 14)'
      }
    } else if (votos >= 15) {
      return {
        emoji: '🤣',
        color: 'rgb(39, 224, 14)'
      }
    }
  }

  render() {
    const { pergunta, resposta, votos, id } = this.props.data;
    let emoji = this.asignarEmoji(votos).emoji;
    let border = this.asignarEmoji(votos).color;
    return (
      <div className="charada" style={{ border: `2px solid ${border}` }}>
        <div className="charada-votos">
          <button className="positivo" onClick={() => this.props.actualizarPuntaje("positivo", id)}>
            <i className="fas fa-2x fa-thumbs-up"></i>
          </button>
          <span role="img" aria-label="emoji" className="wobble-skew-on-hover">{emoji}</span>
          <button className="negativo" onClick={() => this.props.actualizarPuntaje("negativo", id)}>
            <i className="fas fa-2x fa-thumbs-down"></i>
          </button>
        </div>
        <div className="charada-charada">
          <p>{pergunta}</p>
          {
            this.state.mostrarRespuesta ?
              <p>{`${resposta}`}</p> :
              <button onClick={() => this.setState({ mostrarRespuesta: true })}>Ver Resposta</button>
          }
        </div>
        <div className="charada-votos-numero">
          <h1>{votos}</h1>
        </div>
      </div>
    )
  }

}
