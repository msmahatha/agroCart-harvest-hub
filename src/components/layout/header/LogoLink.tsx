
import React from 'react';
import { Link } from 'react-router-dom';

const LogoLink: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <span className="font-display text-xl font-semibold">AgroCart</span>
    </Link>
  );
};

export default LogoLink;
