import React, { ChangeEvent, useState } from 'react';
import {
  Box,
  Button,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

type Props = {
  hidden: boolean;
  addUser: (userData: UserData) => void;
  hide: () => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#f6f6f6',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};


const NewUserForm: React.FC<Props> = ({ hidden, hide, addUser }) => {
  const [userData, setUserData] = useState({
    name: '',
    userName: '',
    email: '',
    phone: '',
    city: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    userName: '',
    email: '',
    phone: '',
    city: '',
  });

  const submitHandler = () => {
    let hasErrors = false;
    const validPhone =  /^\+(?:[0-9] ?){6,14}[0-9]$/;
    const onlyLetters = /^[a-zA-Z]+$/;
    const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (userData.name.length < 3 || userData.name.length > 20) {
      setErrors(prev => ({ ...prev, name: 'Invalid length' }));
      hasErrors = true;
    } else if (!userData.name.match(onlyLetters)) {
      setErrors(prev => ({ ...prev, name: 'Name should consist of only letters, no spacing' }));
      hasErrors = true;
    }

    if (userData.userName.includes(' ')) {
      setErrors(prev => ({ ...prev, userName: 'Spaces are not allowed in username' }));
      hasErrors = true;
    }

    if (!userData.email.match(validEmail)) {
      setErrors(prev => ({ ...prev, email: 'Invalid e-mail' }));
      hasErrors = true;
    }

     if (!userData.phone.match(validPhone)) {
      setErrors(prev => ({ ...prev, phone: 'Please enter valid phone' }));
      hasErrors = true;
    }

    if (userData.city.length < 3 || userData.city.length > 20) {
      setErrors(prev => ({ ...prev, city: 'Invalid length' }));
      hasErrors = true;
    } else if (userData.city.includes('2')) {
      setErrors(prev => ({ ...prev, city: 'City should consist of only letters' }));
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }
    addUser(userData);
    setUserData({
      name: '',
      userName: '',
      email: '',
      phone: '',
      city: '',
    })

  }

  const closeFormHandler = () => {
    hide();
    setUserData({
      name: '',
      userName: '',
      email: '',
      phone: '',
      city: '',
    })

  }

  const changeHandler = (key: keyof UserData) =>
    (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const newErrors = { ...errors };
      newErrors[key] = '';
      setErrors(newErrors);

      const newUserData = { ...userData };
      newUserData[key] = e.target.value;
      setUserData(newUserData);
    }

  return (
    <div>
      <Slide direction="down" in={!hidden} mountOnEnter unmountOnExit>
        <div>
          <Box
            component="form"
            sx={style}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h5">Add new user</Typography>
              <Button onClick={closeFormHandler}>X</Button>
            </Box>
            <TextField
              required
              label="Name"
              value={userData.name}
              onChange={changeHandler('name')}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              required
              label="User Name"
              value={userData.userName}
              onChange={changeHandler('userName')}
              error={!!errors.userName}
              helperText={errors.userName}
            />
            <TextField
              required
              label="Email"
              value={userData.email}
              onChange={changeHandler('email')}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              required
              label="Phone"
              value={userData.phone}
              onChange={changeHandler('phone')}
              error={!!errors.phone}
              helperText={errors.phone}
            />
            <TextField
              required
              label="City"
              value={userData.city}
              onChange={changeHandler('city')}
              error={!!errors.city}
              helperText={errors.city}
            />
            <Button
              variant="contained"
              onClick={submitHandler}
              disabled={
                !userData.name
                || !userData.userName
                || !userData.city
                || !userData.email
                || !userData.phone
              }
            >
              Submit
            </Button>
          </Box>
        </div>
      </Slide>
    </div>
  );
};

export default NewUserForm;
