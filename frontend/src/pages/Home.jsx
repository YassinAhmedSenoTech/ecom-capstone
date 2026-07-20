import { Link } from 'react-router-dom';
import '../style/home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-content">
        <h1>Welcome to Our Store</h1>
        <p>High-quality tech and accessories at your fingertips.</p>
        <Link to="/products" className="cta-button">
          Shop Products
        </Link>
      </div>
    </div>
  );
};

export default Home;