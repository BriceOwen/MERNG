import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function MenuBar() {
  const pathname = window.location.pathname;
  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState<string>(path);

  const handleItemClick = (name: string) => {
    setActiveItem(name);
  };

  return (
    <div>
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
    </div>
  );
}

export default MenuBar;
