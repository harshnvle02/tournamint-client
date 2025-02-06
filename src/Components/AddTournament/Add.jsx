import React, { useEffect, useState, useContext } from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Details from './Details';
import { AuthContext } from '../../Context/AuthConntext';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { baseUrl } from '../baseUrl';


export default function Add() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(AuthContext);
  
  const addButtonClickHandler = async () => {
    try {
      var request = await axios.get(`${baseUrl}/api/Tournaments/check/${user.userId}`);
      console.log(user);
      if (request.status == 200) {
        navigate('details');
        setShowForm(true);
      }

    }
    catch (error) {
      console.log(error);
      toast.warning(
        <div>
          <Typography variant='h8'>You can create only one tournament at a time</Typography>
        </div>,
        {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeButton: false,
        }
      )
    }
  }

  useEffect(() => {
    console.log(showForm);
  }, [showForm])

  return (
    <>
      {showForm ? <Details /> : <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '70vh', position: 'fixed', marginLeft: 550 }}>
        <Typography variant='h4' component="h1" gutterBottom >Add your Tournament</Typography>
        <Typography variant='h5' component="h2">You can make a tournament one at a time</Typography>
        <Button variant='contained' color='primary'
          sx={{ padding: '10px 20px', backgroundColor: 'purple', mt: 2 }}
          onClick={() => {
            addButtonClickHandler();
          }}>Add Tournaments</Button>
      </div>}
      <ToastContainer />
    </>

  );
}
