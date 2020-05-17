import React, { useState, useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState<string>(path);

  const handleItemClick = (name: string) => {
    setActiveItem(name);
  };

  const menuBar =
    user && user.username ? (
      <Menu pointing secondary size='massive' color='teal'>
        <Menu.Item name={user && user.username} active as={Link} to='/' />
        <Menu.Menu position='right'>
          <Menu.Item name='logout' onClick={logout} as={Link} to='/logout' />
        </Menu.Menu>
      </Menu>
    ) : (
      <Menu pointing secondary size='massive' color='teal'>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={() => handleItemClick('home')}
          as={Link}
          to='/'
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={() => handleItemClick('login')}
            as={Link}
            to='/login'
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={() => handleItemClick('register')}
            as={Link}
            to='/register'
          />
        </Menu.Menu>
      </Menu>
    );

  return menuBar;
}

export default MenuBar;
