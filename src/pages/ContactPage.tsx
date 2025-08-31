import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const ContactPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <div className="max-w-md text-center">
        <p className="text-lg text-gray-600 mb-6">
          Get in touch with our team for any inquiries or support.
        </p>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-600">contact@foxcar.com</p>
          </div>
          <div>
            <h3 className="font-semibold">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div>
            <h3 className="font-semibold">Address</h3>
            <p className="text-gray-600">123 Car Street, Auto City, AC 12345</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button asChild>
          <Link to="/">Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/about">About Us</Link>
        </Button>
      </div>
    </div>
  );
};

export default ContactPage;
