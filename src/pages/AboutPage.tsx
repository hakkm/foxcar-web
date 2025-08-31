import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const AboutPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">About FoxCar</h1>
      <div className="max-w-2xl text-center">
        <p className="text-lg text-gray-600 mb-6">
          FoxCar is a premium car service platform dedicated to providing
          exceptional automotive solutions for our customers.
        </p>
        <p className="text-gray-600 mb-8">
          With years of experience in the automotive industry, we strive to
          deliver quality service and build lasting relationships with our clients.
        </p>
      </div>

      <div className="flex gap-4">
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  );
};

export default AboutPage;
