import * as React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Icecream, Delete, Email, AccountCircle, Https, Check } from '@mui/icons-material';
import {
  Container,
  Grid,
  Typography,
  Avatar,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
} from '@mui/material';
import axios from 'axios';

const passwordSchema = Yup.string()
  .required('Password is required')
  .min(8, 'Password must be at least 8 characters long')
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
  );

function validatePassword(value) {
  try {
    passwordSchema.validateSync(value);
    return undefined; //If No error then password is valid
  } catch (error) {
    return error.message;
  }
}



export default function SignupForm() {

  const handleSubmit=(value)=>{
    if (value.password !== value.confirmPassword) {
      alert("Passwords don't match!");
           return;
         }
      console.log("values :", value)
      axios.post('/users/register', value, { headers: {"Content-Type": "application/json"}}
      )
    }
  return (
    <>
      <Container sx={{ mt: 1, mb: 1 }}>
        <Formik
          initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
          // onSubmit={(values) => {
          //   //passwords match
          //   if (values.password !== values.confirmPassword) {
          //     alert("Passwords don't match!");
          //     return;
          //   }
          //   console.log(values);
          // }}

          //http://localhost:6000/api/v1/users/register
          onSubmit={handleSubmit}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .required('Email is required')
              .email('Invalid email address'),
            username: Yup.string().required('Username is required'),
            password: passwordSchema,
            confirmPassword: Yup.string().required('Confirm Password is required'),
          })}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <Grid container direction="column" justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Avatar />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 1, mt: 1 }}>
                  <Typography variant="h5" component="h1">
                    <Icecream/> Sign Up
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 1, mt: 1 }}>
                  <Typography variant="h6" component="h1">
                    <Email/> Email
                  </Typography>
                  <Field name="email" as={TextField} />
                  {errors.email && touched.email && <div>{errors.email}</div>}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 1, mt: 1 }}>
                  <Typography variant="h6" component="h1">
                    <AccountCircle/> Username
                  </Typography>
                  <Field name="username" as={TextField} />
                  {errors.username && touched.username && <div>{errors.username}</div>}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 1, mt: 1 }}>
                  <Typography variant="h6" component="h1">
                    <Https/> Password
                  </Typography>
                  <Field name="password" as={TextField} type="password" validate={validatePassword} />
                  {errors.passwordHash && touched.passwordHash && <div>{errors.passwordHash}</div>}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 1, mt: 1 }}>
                  <Typography variant="h6" component="h1">
                    <Check/> Confirm Password
                  </Typography>
                  <Field name="confirmPassword" as={TextField} type="password" label="Confirm Password" placeholder="Confirm Password"/>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div>{errors.confirmPassword}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 1, mt: 1 }}>
                  <FormControlLabel control={<Checkbox />} label={<Typography variant="body1">Remember Me?</Typography>} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 1, mt: 1 }}>
                  <Button size='large' variant='contained' type='submit'>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}