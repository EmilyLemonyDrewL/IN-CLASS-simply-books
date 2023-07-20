import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import AuthorCard from '../components/AuthorCard';
import { getAuthors } from '../api/authorData';

function ShowAllAuthors() {
  // Set state for authors
  const [authors, setAuthors] = useState([]);

  // Get uid
  const { user } = useAuth();
  // create a function that makes an API call to get the authors
  const getAllTheAuthors = () => {
    getAuthors(user.uid).then(setAuthors);
  };

  // make the call to the API to get all the authors on component render
  useEffect(() => {
    getAllTheAuthors();
  });

  return (
    <div className="text-center my-4">
      <Link href="author/new" passHref>
        <Button>Add An Author</Button>
      </Link>
      <div className="d-flex flex-wrap">
        {/* map over the authors here using the AuthorCard component */}
        {authors.map((author) => (
          <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAllTheAuthors} />
        ))}

      </div>
    </div>
  );
}

export default ShowAllAuthors;
