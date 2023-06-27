import React from 'react';
import { db } from "../firebase";
import { useState, useEffect } from 'react';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

const Admin = () => {
  const [todoList, setTodoList] = useState([]);

  // New Todo States

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newReleseDate, setNewReleseDate] = useState(0);
  const [isNewTodoComplete, setIsNewTodoComplete] = useState(false);

  // Update title State

  const [updateTitle, setUpdatedTitle] = useState('');

  const todoCollectionRef = collection(db, 'todo');

  const getTodoList = async () => {
    try {
      const data = await getDocs(todoCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTodoList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const onSubmitTodo = async () => {
    try {
      await addDoc(todoCollectionRef, {
        title: newTodoTitle,
        releaseDate: newReleseDate,
        complete: isNewTodoComplete,
      });
      getTodoList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    const todoDoc = doc(db, 'todo', id);
    await deleteDoc(todoDoc);
    getTodoList(); // Actualizar la lista después de eliminar un elemento
  };

  const updateTodoTitle = async (id) => {
    const todoDoc = doc(db, 'todo', id);
    await updateDoc(todoDoc, { title: updateTitle });
    getTodoList(); // Actualizar la lista después de eliminar un elemento
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Admin Panel
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            placeholder="Todo title"
            fullWidth
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <TextField
            placeholder="Release Date"
            type="number"
            fullWidth
            value={newReleseDate}
            onChange={(e) => setNewReleseDate(Number(e.target.value))}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isNewTodoComplete}
                onChange={(e) => setIsNewTodoComplete(e.target.checked)}
              />
            }
            label="Todo Complete"
          />
          <Button onClick={onSubmitTodo} variant="contained" color="primary" fullWidth>
            Submit Movie
          </Button>
        </Box>
        {todoList.map((todo) => (
          <Box key={todo.id} sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ color: todo.complete ? 'green' : 'red' }}>
              {todo.title}
            </Typography>
            <Typography>Date: {todo.releaseDate}</Typography>
            <Button onClick={() => deleteTodo(todo.id)} variant="outlined" color="error">
              Delete Todo
            </Button>
            <TextField
              placeholder="New Title"
              fullWidth
              value={updateTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <Button onClick={() => updateTodoTitle(todo.id)} variant="outlined" color="primary">
              Update Title
            </Button>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Admin;
