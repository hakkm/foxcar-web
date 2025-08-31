import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-4 text-gray-400">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>

      <Button asChild>
        <Link to="/">Go Back Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
