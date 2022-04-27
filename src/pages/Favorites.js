import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      displayLoading: false,
      favoriteMusics: [],
    };
  }

  componentDidMount() {
    this.getMusics();
    this.attLoading(); // antes do resultado da funcao assincrona o display fica true
  }

  // funcao para excluir uma musica do favorito e atualiza no estado para renderizar na tela
  removeMusic = (id) => {
    const { favoriteMusics } = this.state;
    const newArray = favoriteMusics.filter((music) => music.trackId !== id);
    this.setState({ favoriteMusics: newArray });
  }

  attLoading = () => {
    this.setState({ displayLoading: true });
  }

  // funcao assincrona para colocar loading e criar o estado com todas as musicas devolvidas pela funcao getfavoritesongs
  getMusics = async () => {
    this.setState({ displayLoading: true });
    const musicsFavorites = await getFavoriteSongs();
    this.setState({ favoriteMusics: musicsFavorites, displayLoading: false });
  }

  render() {
    const { displayLoading, favoriteMusics } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites" className="favorite-main">
          { !displayLoading && favoriteMusics.map((music) => (
            <MusicCard
              key={ music.trackName }
              musicName={ music.trackName }
              preview={ music.previewUrl }
              trackId={ music.trackId }
              album={ music }
              removeFav={ this.removeMusic }
            />
          )) }
        </div>
      </>
    );
  }
}

export default Favorites;
