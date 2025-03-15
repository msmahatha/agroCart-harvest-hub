
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const LogoLink: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <Leaf className="text-primary h-6 w-6 mr-2" />
      <span className="font-display text-xl font-semibold">AgroCart</span>
    </Link>
  );
};

export default LogoLink;
