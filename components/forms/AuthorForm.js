/* eslint-disable react/jsx-indent-props */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';

import { createAuthor, updateAuthor } from '../../api/authorData';

const initialAuthorState = {
  first_name: '',
  last_name: '',
  email: '',
  image: '',
  favorite: false,
};

function AuthorForm({ obj }) {
  const [aFormInput, setAFormInput] = useState(initialAuthorState);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (obj.firebaseKey) {
      setAFormInput(obj);
    }
  }, [obj]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAuthor(aFormInput).then(() => router.push(`/author/${obj.firebaseKey}`));
    } else {
      const payload = { ...aFormInput, uid: user.uid };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAuthor(patchPayload).then(() => {
          router.push('/authors');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

      <FloatingLabel controlId="FloatingInputA1" label="First Name" className="mb-3">
        <Form.Control
        type="text"
        placeholder="Matthew"
        name="first_name"
        value={aFormInput.first_name}
        onChange={handleChange}
        required
        />
      </FloatingLabel>

      <FloatingLabel controlId="FloatingInputA2" label="Last Name" className="mb-3">
        <Form.Control
          type="text"
        placeholder="Thiessen"
        name="last_name"
        value={aFormInput.last_name}
        onChange={handleChange}
        required
        />
      </FloatingLabel>

      <FloatingLabel controlId="FloatingInputA3" label="Email Address" className="mb-3">
        <Form.Control
        type="email"
        placeholder="blahblahblah@aol.com"
        name="email"
        value={aFormInput.email}
        onChange={handleChange}
        required
        />
      </FloatingLabel>

      <FloatingLabel controlId="FloatingInputA4" label="Author Image" className="mb-3">
        <Form.Control
        type="url"
        placeholder="Enter an image url"
        name="image"
        value={aFormInput.image}
        onChange={handleChange}
        required
        />
      </FloatingLabel>

      <Form.Check
      className="text-white mb-3"
      type="switch"
      id="favorite"
      name="favorite"
      label="Favorite?"
      checked={aFormInput.favorite}
      onChange={(e) => {
        setAFormInput((prevState) => ({
          ...prevState,
          favorite: e.target.checked,
        }));
      }}
      />

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Author</Button>
    </Form>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    image: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

AuthorForm.defaultProps = {
  obj: initialAuthorState,
};

export default AuthorForm;
