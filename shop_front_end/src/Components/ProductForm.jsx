import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  IconButton,
  Grid,  // Import Grid from MUI
} from '@mui/material';
import axios from 'axios';
import { Close as CloseIcon, Shop, Money, InsertComment, List, FileOpen } from '@mui/icons-material';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number().required('Price is required').min(0, 'Price must be positive'),
  category: Yup.string(),
  images: Yup.array().min(1, 'At least one image is required'),
});

function ProductForm() {
  const [files, setImages] = useState([]);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('category', values.category);
        
        files.forEach((file) => {
          formData.append('images', file);
        });
    
        const response = await axios.post('/products/', formData);
        console.log('Product added:', response.data);
    } catch (error) {
      console.error('Error adding product:', error.response.data);
    }
  };

  const handleImageChange = (event) => {
    const newFiles = Array.from(event.target.files);
    setImages([...files, ...newFiles]);
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = files.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
  };

  return (
    <Container>
      <Formik
        initialValues={{
          name: '',
          description: '',
          price: '',
          category: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Grid container direction="column" justifyContent="center" alignItems="center" sx={{m:1}}>  
              <Grid item sm={3} md={6} sx={{ mb: 1, mt: 1 }}>
                <Shop sx={{m:1}}/>  
                <Field name="name" as={TextField} label="Name" />
                <ErrorMessage name="name" />
              {/* </Grid>
              <Grid item sm={3} md={6} sx={{ mb: 1, mt: 1 }}> */}
                <InsertComment sx={{m:1}}/>
                <Field name="description" as={TextField} label="Description" sx={{ml:1}}/>
                <ErrorMessage name="description" />
              </Grid>
              <Grid item sm={3} md={6} sx={{ mb: 1, mt: 1 }}>
                <Money sx={{m:1}}/>
                <Field name="price" as={TextField} label="Price" type="number" />
                <ErrorMessage name="price" />
              {/* </Grid>
              <Grid item sm={3} md={6} sx={{ mb: 1, mt: 1 }}> */}
                <List sx={{m:1}}/>
                <Field name="category" as={TextField} label="Category" sx={{ml:1}}/>
                <ErrorMessage name="category" />
              </Grid>
              <Grid item md={12} sx={{ mb: 1, mt: 1}}>
                <FileOpen sx={{mr:1, mt:1, mb:0}}/>
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  onChange={handleImageChange}
                />
                {/* Display the number of selected files */}
                <Typography variant="caption" color="textSecondary">
                  {files.length} {files.length === 1 ? 'file selected' : 'files selected'}
                </Typography>
              </Grid>
              {files.length > 0 && (
                <Grid item md={12} sx={{ mb: 1, mt: 1, marginLeft: "3%" }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">Selected Images:</Typography>
                      <ul>
                        {files.map((file, index) => (
                          <li key={index}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <img src={URL.createObjectURL(file)} alt={`Selected Image ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                              <IconButton onClick={() => handleRemoveImage(index)} style={{ marginLeft: '10px' }}>
                                <CloseIcon />
                              </IconButton>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Grid>
              )}
              <Grid item md={12} sx={{ mb: 1, mt: 1 }}>
                <Button type="submit" variant="contained" color="primary">
                  Add Product
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Container>
  );
}

export default ProductForm;