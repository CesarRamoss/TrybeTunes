import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import logo from '../logo.png';
import user from '../user.png';

class Header extends React.Component {
  constructor() {
    super();

    this.state = { nameUser: '' };
  }

  componentDidMount() {
    getUser().then((resolve) => this.setState({ nameUser: resolve.name })); // em DidMount, a funcao getUser captura o input de login criando em seu state e imprimindo na tela
  }

  render() {
    const { nameUser } = this.state;
    return (
      nameUser === '' ? <Loading /> // renderizacao condicional para o carregando...
        : (

          <header data-testid="header-component">
            <div className="user" data-testid="header-user-name">
              <img src={ logo } alt="logo" />
              <p>
                <img src={ user } alt={ nameUser } id="icon-user" />
                { nameUser }
              </p>
            </div>
            <nav>
              <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
              <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
            </nav>
          </header>

        )
    );
  }
}

export default Header;
