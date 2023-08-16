import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { AccountCircle, Https } from '@mui/icons-material';
import { Container, Grid, Typography, Avatar, TextField, Button } from '@mui/material';
import axios from 'axios';

export default function LoginForm() {
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('/users/login', {
        username: values.username,
        password: values.password,
      });

      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error.response.data);
    }
  };

  return (
    <Container sx={{ mt: 1, mb: 1 }}>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Username is required'),
          password: Yup.string().required('Password is required'),
        })}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container direction="column" justifyContent="center" alignItems="center">
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 1, mt: 1 }}>
                <Typography variant="h6" component="h1">
                  <AccountCircle /> Username
                </Typography>
                <Field name="username" as={TextField} />
                {errors.username && touched.username && <div>{errors.username}</div>}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 1, mt: 1 }}>
                <Typography variant="h6" component="h1">
                  <Https /> Password
                </Typography>
                <Field name="password" as={TextField} type="password" />
                {errors.password && touched.password && <div>{errors.password}</div>}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 1, mt: 1 }}>
                <Button size="large" variant="contained" type="submit">
                  Login
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}