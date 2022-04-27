import React from 'react';
import AlbumList from '../components/AlbumList';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { INPUT_MIN_CHARACTER } from '../lib/constants';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchButtonDisabled: true,
      input: '',
      displayLoading: false,
      displayResult: false,
      resultBand: '',
      band: '',
    };
  }

  // funcao para atualizar a cada caracter digitado no input
  onInputChange = ({ target }) => {
    const verify = target.value.length >= INPUT_MIN_CHARACTER; // variavel true/false para validar input >=3
    this.setState({ input: target.value });
    if (verify) {
      this.setState({ searchButtonDisabled: false });
    } else {
      this.setState({ searchButtonDisabled: true });
    }
  };

  // funcao para limpar input e chamar searchAlbumsAPIs.js
  submitButton = () => {
    const { input } = this.state;
    this.setState({ displayLoading: true });
    searchAlbumsAPI(input).then((band) => {
      this.setState({
        displayLoading: false,
        band: input,
        input: '',
        displayResult: true,
        resultBand: band,
      });
    });
  };

  render() {
    const { searchButtonDisabled,
      input,
      displayLoading,
      displayResult,
      band,
      resultBand } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-search" className="search">
          <input
            className="large-input"
            type="text"
            placeholder="Nome"
            data-testid="search-artist-input"
            onChange={ this.onInputChange }
            value={ input }
          />
          <button
            disabled={ searchButtonDisabled }
            type="submit"
            data-testid="search-artist-button"
            onClick={ this.submitButton }
          >
            Pesquisar
          </button>
          { displayLoading && <Loading /> }
          { displayResult && <AlbumList data={ resultBand } band={ band } /> }
        </div>
      </>
    );
  }
}

export default Search;
