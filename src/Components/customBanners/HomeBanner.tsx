// HomeBanner.tsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  banners: { id: string, src: string, alt: string }[];
}

const HomeBanner: React.FC<Props> = ({ banners }) => {
  return (
    <div className="container">
        
    </div>
  );
};
export default HomeBanner;