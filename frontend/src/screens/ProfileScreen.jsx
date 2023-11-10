import React, { useEffect, useState } from 'react';
import FormContainer from '../companents/FormContainer';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useUpdateMutation } from '../slices/usersApiSlice';
import Loader from '../companents/Loader';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
function ProfileScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [ComfirmPassword, setComfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [update, { isLoading }] = useUpdateMutation();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== ComfirmPassword) {
      toast.error('password do not match');
    } else {
      try {
        const res = await update({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.dismiss();
        toast.success('Profile Updated');
        navigate('/profile');
      } catch (err) {
        toast.dismiss();
        // console.log(err?.data?.message || err.error);
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      {isLoading && <Loader />}
      <h1>Update Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='name'>
          <Form.Label>Name </Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='comfirmpassword'>
          <Form.Label>Comfirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Comfrim Password'
            value={ComfirmPassword}
            onChange={(e) => setComfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Update
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ProfileScreen;
