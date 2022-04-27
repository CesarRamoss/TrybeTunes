import React from 'react';
import { Redirect } from 'react-router';
import Loading from '../components/Loading';
import { MIN_CHARACTER } from '../lib/constants';
import { createUser } from '../services/userAPI';
import logo from '../logo.png';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      loginButtonDisabled: true,
      user: '',
      displayLoading: false,
      userLogged: false,
    };
  }

  // funcao para atualizar a cada caracter digitado no input
  onInputChange = ({ target }) => {
    const verify = target.value.length >= MIN_CHARACTER; // variavel true/false para validar input >=3
    this.setState({
      user: target.value,
    });

    if (verify) {
      this.setState({ loginButtonDisabled: false });
    } else {
      this.setState({ loginButtonDisabled: true });
    }
  };

  // funcao após submit do Entrar
  handleSubmit = (e) => {
    e.preventDefault();
    const { user: name } = this.state; // meu user do estado é passado como name para a funcao createUser
    this.setState({ displayLoading: true });
    createUser({ name }).then(() => { // após a conclusao da funcao, o displayLoading retorna para false
      this.setState({
        displayLoading: false,
        userLogged: true,
      });
    });
  }

  render() {
    const { loginButtonDisabled, user, displayLoading, userLogged } = this.state;
    return (
      <>
        <div className="logo">
          <img src={ logo } alt="logo" />
        </div>
        <div data-testid="page-login">
          <form onSubmit={ this.handleSubmit }>
            <input
              className="large-input"
              type="text"
              placeholder="Nome"
              data-testid="login-name-input"
              onChange={ this.onInputChange }
              value={ user }
            />
            <button
              disabled={ loginButtonDisabled }
              type="submit"
              data-testid="login-submit-button"
            >
              Entrar
            </button>
          </form>
          { displayLoading && <Loading /> }
          { userLogged && <Redirect to="/search" /> }
        </div>
      </>
    );
  }
}

export default Login;
