import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteChecked: false,
      displayLoading: false,
    };
  }

  componentDidMount() {
    this.getListFavorite();
  }

  // funcao assincrona que executa na montagem da pagina criando uma lista de favoritas que verifica o trackId igual
  getListFavorite = async () => {
    const { trackId } = this.props;
    const favoriteList = await getFavoriteSongs();
    if (favoriteList.some(({ trackId: music }) => music === trackId)) {
      this.setState({ favoriteChecked: true });
    }
  }

  // funcao para atualizar o checkbox e exec funcao addSong com a props album como parametro
  addFavoriteSong = () => {
    const { favoriteChecked } = this.state;
    const { album, removeFav, trackId } = this.props;

    if (favoriteChecked) {
      this.setState({ favoriteChecked: false, displayLoading: true });
      removeSong(album).then(() => {
        this.setState({ displayLoading: false });
        if (removeFav) removeFav(trackId);
      });
    } else {
      this.setState({ favoriteChecked: true, displayLoading: true });
      addSong(album).then(() => {
        this.setState({ displayLoading: false });
      });
    }
  };

  render() {
    const { musicName, preview, trackId } = this.props;
    const { favoriteChecked, displayLoading } = this.state;
    return (
      <>
        <div className="music-list">
          <p>{ musicName }</p>
          <audio data-testid="audio-component" src={ preview } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
        </div>
        <div>
          <label htmlFor="favorite" className="label-color">
            Favorita
            <input
              checked={ favoriteChecked }
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.addFavoriteSong }
            />
          </label>
        </div>
        { displayLoading && <Loading /> }
      </>
    );
  }
}

export default MusicCard;
MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  album: PropTypes.shape().isRequired,
  removeFav: PropTypes.func.isRequired,
};
