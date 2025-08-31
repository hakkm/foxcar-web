import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const HomePage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to FoxCar Web</h1>
      <p className="text-lg text-gray-600 mb-8">Your premium car service platform</p>

      <div className="flex gap-4 mb-8">
        <Button asChild>
          <Link to="/about">Learn About Us</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>

      <div className="flex gap-4">
        <Link to="/about" className="text-blue-600 hover:underline">
          About
        </Link>
        <Link to="/contact" className="text-blue-600 hover:underline">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
