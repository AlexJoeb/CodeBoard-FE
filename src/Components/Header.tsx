import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

// Logo
import { ReactComponent as Logo } from '../assets/logo.svg';

// TS
import { ILink } from '../utils/types';
import { Links } from '../utils/vars';

const Header: FC = (): ReactElement => {
  return (
    <div className='w-full h-24 flex items-center justify-between'>
      <Logo />
      <ul className='flex'>
        {
          Links?.length >= 1 && Links.map((link: ILink, i: number) => (
            <li key={i}>
              <Link className={`text-blue-navy ${link?.class || ''}`.trim()} to={link.path}>{link.title}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default Header;