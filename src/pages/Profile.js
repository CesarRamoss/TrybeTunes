import React from 'react';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import user from '../user.png';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = { nameUser: '', email: '', description: '' };
  }

  componentDidMount() {
    getUser().then((resolve) => this.setState({ 
      nameUser: resolve.name, 
      email: resolve.email,
      description: resolve.description
     })); 
  }
   
  render() {
    const {nameUser, email, description} = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <form className='form_perfil'>
          <div id="hover_img">
            <img src={user} alt="perfil" className='icon_perfil'onClick={()=> this.props.history.push("/profile/edit") }/>            
          <div id="mostrar">Editar 
          </div>
          </div>
            <label htmlFor='nome' className='label_perfil'>
              Nome
            </label>
             <p className='p_perfil'>{nameUser}</p>
            <label htmlFor='email'className='label_perfil'>
              Email
            </label>
              <p className='p_perfil'>{email}</p>
            <label htmlFor='descricao'className='label_perfil'>
              Descrição
            </label>
              <p className='p_perfil'>{description}</p>
          </form>
        </div>
      </>
    );
  }
}

export default Profile;
