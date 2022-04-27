import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumList extends React.Component {
  render() {
    const { data, band } = this.props;
    if (data.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }
    return (
      <>
        <h1>{ `Resultado de álbuns de: ${band}` }</h1>
        <section>
          { data.map((album) => (
            <Link
              key={ album.collectionId }
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              <div>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <p>{ album.collectionName }</p>
                <p>{ album.artistName }</p>
              </div>
            </Link>
          )) }
        </section>
      </>
    );
  }
}

export default AlbumList;

AlbumList.propTypes = {
  band: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
