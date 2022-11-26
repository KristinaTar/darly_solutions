import React, { useState, useEffect, useCallback } from 'react';
import { addUser, getAllUsers } from '../src/api';
import UsersTable_NEW from "./UsersTable/UsersTable";
import NewUserForm from "./NewUserForm/NewUserForm";
import { Button, Container } from '@mui/material';

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showForm, setShowForm] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(()=> {
    getAllUsers().then(res => setUsers(res))
  },[]);

  const hideForm = useCallback(() => {
    setShowForm(false);
  }, []);

  const addUserHandler = (userData: UserData) => {
    setLoading(true);
    addUser(userData)
      .then(() => {
        getAllUsers().then(res => setUsers(res));
        setShowForm(false);
        setLoading(false);
      });
  }

  return (
    <Container sx={{padding: '20px'}}>
      <UsersTable_NEW users={users} loading={loading} />
      <Button
        variant="contained"
        onClick={() => setShowForm(prev => !prev)}
        sx={{margin: '20px auto'}}
      >
        Add new user
      </Button>
      <NewUserForm
        hidden={!showForm}
        hide={hideForm}
        addUser={addUserHandler}
      />
    </Container>
  );
}

export default App;
