import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';
import { getAuthorBooks } from '../../api/authorData';

// inside component use
export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();

  // grab the firebase key from url
  const { firebaseKey } = router.query;

  // make the call to the API layer to grab data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={authorDetails.image} alt={authorDetails.first_name} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {authorDetails.first_name} {authorDetails.last_name}
        </h5>
        <p>Email: {authorDetails.email}</p>
        <p>{authorDetails?.favorite ? '🤍' : ''}</p>
      </div>
      <div className="d-flex flex-wrap">
        {authorDetails.books?.map((book) => (
          <BookCard key={book.firebaseKey} bookObj={book} onUpdate={getAuthorBooks} />
        ))}
      </div>
    </div>
  );
}
