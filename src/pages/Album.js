import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      bandName: '',
      albumName: '',
      dataAlbum: [],
      albumImg: '',
    };
  }

  componentDidMount() {
    this.changeState();
  }

  // funcao para capturar o id que será passado para getMusics via parametro
  changeState = () => {
    const { match } = this.props;
    getMusics(match.params.id).then((album) => this.setState({
      dataAlbum: album,
      bandName: album[0].artistName,
      albumName: album[0].collectionName,
      albumImg: album[0].artworkUrl100,
    }));
  }

  render() {
    const { bandName, albumName, dataAlbum, albumImg } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-album" className="album-check">
          <div>
            <img src={ albumImg } alt={ albumName } />
            <h1 data-testid="album-name">{ albumName }</h1>
            <h2 data-testid="artist-name">{ bandName }</h2>
          </div>
          <div className="musics-album">
            { dataAlbum.filter((music) => music.kind === 'song').map((music) => (
              <MusicCard
                key={ music.trackName }
                musicName={ music.trackName }
                preview={ music.previewUrl }
                trackId={ music.trackId }
                album={ music }
                removeFav={ null }
              />
            )) }
          </div>
        </div>
      </>
    );
  }
}

export default Album;
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
