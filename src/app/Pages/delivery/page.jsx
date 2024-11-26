"use client";
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('../../Components/Map/Map'));
import * as React from 'react';
import Box from '@mui/joy/Box';
import toast, { Toaster } from 'react-hot-toast';

import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';
import Rating from '@mui/material/Rating';
import Boxx from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import "./delivery.css"
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function Delivery() {
  const [timeLeft, setTimeLeft] = useState(10); 
  const [randomTime, setRandomTime] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);
  const [randomSelected, setRandomSelected] = useState(false);
  const [text, setText] = React.useState('');
  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);
  const [userData, setUserData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserData(user);
      const total = user.basket.reduce((acc, item) => acc + parseFloat(item.price || 0), 0);
      setTotalAmount(total.toFixed(2));
    }
  }, []);
  useEffect(() => {
    if (!randomSelected) {
      const randomValue = Math.floor(Math.random() * (10 * 60));
      setRandomTime(randomValue);
      setRandomSelected(true);
      console.log('Random value selected: ', randomValue);
    }
  }, [randomSelected]);
  useEffect(() => {
    let interval;
  
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            handleTimeEnd();
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  
    return () => clearInterval(interval); 
  }, [timeLeft]);
  
  
  const handleTimeEnd = () => {
    console.log("Handle Time End: ", randomTime);

    setTimeout(() => {
      if (randomTime > 30 * 60) {
        toast.error('Sorry, delivery is delayed.');
        setShowContent(false);
        setTimeLeft(randomTime - 150);
      } else {
        toast.success('Your delivery is on time! Enjoy your meal.');
        setShowContent(true);
      }
    }, 2000);
  };
  if (!userData) {
    return <p>Loading...</p>;
  }
  const minutes = Math.floor(timeLeft / 60); 
  const seconds = timeLeft % 60; 
  const radius = 50;
  const circumference = 2 * Math.PI * radius; 
  const offset = circumference - (timeLeft / (30 * 60)) * circumference;

  return (
    <section>
            <Toaster />

    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2>Pizza Delivery</h2>

      <div className='flex' >
      <div className='personal info'>

<div>
<h3>Your Order Summary</h3>
<div>
<h3>Delivery Information</h3>
  <p><strong>Deivery:</strong> {userData.orders.map(item => item.name).join(', ')}</p>
  {/* <p><strong>Drink</strong> Pepperoni, Mushrooms</p> */}
</div>
</div>
<div>
  <p><strong>Name:</strong> {userData.name}</p>
  <p><strong>Phone Number:</strong>  <input type="tel" placeholder="+994... " /></p>
  <p><strong>Gmail:</strong> {userData.email}</p>
  <p><strong>Detailed Adress:</strong> <input type="text" placeholder="Hamburg IT" /></p>
<Map className="h-[20px]"/>
</div>
</div>

<div className='time-remaining'>
<h3>Delivery Time Remaining</h3>


<div style={{ position: 'relative', width: '200px', height: '200px', margin: '0 auto' }}>
  <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
    <circle
      cx="100"
      cy="100"
      r="50"
      stroke="#e6e6e6"
      strokeWidth="10"
      fill="none"
    />
    <circle
      cx="100"
      cy="100"
      r="50"
      stroke="#4caf50"
      strokeWidth="10"
      fill="none"
      strokeDasharray={2 * Math.PI * 50}
      strokeDashoffset={
        2 * Math.PI * 50 - (timeLeft / (30 * 60)) * (2 * Math.PI * 50)
      }
      style={{ transition: 'stroke-dashoffset 1s linear' }}
    />
  </svg>
  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '20px' }}>
    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
  </div>
</div>
</div>
      </div>
      {showContent && (
          <div>
            <h3>Additional Content</h3>
            <p>Your delivery is on time! Enjoy your meal!</p>
            <Textarea
          placeholder="Type in here…"
          value={text}
          onChange={(event) => setText(event.target.value)}
          minRows={2}
          maxRows={4}
          startDecorator={
            <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
              <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
                👍
              </IconButton>
              <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')}>
                🏖
              </IconButton>
              <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
                😍
              </IconButton>
              <Button variant="outlined" color="neutral" sx={{ ml: 'auto' }}>
                See all
              </Button>
            </Box>
          }
          endDecorator={
            <Typography level="body-xs" sx={{ ml: 'auto' }}>
              {text.length} character(s)
            </Typography>
          }
          sx={{ minWidth: 300 }}
        />
      <Boxx sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Boxx sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Boxx>
      )}
    </Boxx>
          </div>
        )}
    </div>

    </section>
  );
}
