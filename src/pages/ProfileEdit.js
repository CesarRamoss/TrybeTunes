import React from 'react';
import Header from '../components/Header';
import {  getUser, updateUser } from '../services/userAPI';
// import { Link } from 'react-router-dom';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = { name: '', email: '', description: '' };
  }

  componentDidMount() {
    getUser().then((resolve) => this.setState({ 
      name: resolve.name, 
      email: resolve.email,
      description: resolve.description
     })); 
  }

  saveData =(e) => {
    e.target.id === "nome" && this.setState({name: e.target.value})
    e.target.id === "email" && this.setState({email: e.target.value})
    e.target.id === "descricao" && this.setState({description: e.target.value})
  }

  submitForm =() =>{
    updateUser(this.state);
    this.props.history.push('/profile')
  }
  render() {
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          <form className='form_perfil'>
            <label htmlFor='nome' className='label_perfil'>
              Nome
              <input type="text" id='nome' placeholder='Digite seu nome' onChange={this.saveData}/>
            </label>
            <label htmlFor='email'className='label_perfil'>
              Email
              <input type="email" id='email' placeholder='usuario@usuario.com' onChange={this.saveData}/>
            </label>
            <label htmlFor='descricao'className='label_perfil'>
              Descrição
              <textarea id="descricao" placeholder='Sobre mim' onChange={this.saveData}/>
            </label>
            <button type='submit' className='button_profile' onClick={this.submitForm}>
                Salvar
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default ProfileEdit;
