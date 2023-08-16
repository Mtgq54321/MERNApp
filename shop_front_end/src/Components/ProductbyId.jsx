import * as React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams hook
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function ProductCard() {
  const { id } = useParams(); // Get the product ID from URL params
  const [product, setProduct] = React.useState(null);

  React.useEffect(() => {
    axios.get(`/products/${id}`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]); // Fetch product based on the ID

  if (!product) {
    return null;
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 250, width: '100%', objectFit: 'contain' }}
          image={product.images[0]}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {product.name}
          </Typography>
          <Typography gutterBottom variant='h3'>
            ${product.price}
          </Typography>
          <Typography gutterBottom variant='h6'>
            {product.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Buy</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
}