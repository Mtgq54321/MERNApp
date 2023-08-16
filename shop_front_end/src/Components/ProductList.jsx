import * as React from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export default function ProductList() {
  const [products, setProducts] = React.useState([]);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    axios.get('/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleLearnMoreClick = (_id) => {
    // Redirect to the specified product URL using _id
    window.location.href = `/products/${_id}`;
  };

  const ImageSlider = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const handleImageChange = (step) => {
      const newIndex = (currentImageIndex + step + images.length) % images.length;
      setCurrentImageIndex(newIndex);
    };

    return (
        <CardMedia
          sx={{ height: 250, width: '100%', objectFit: 'contain', position: 'relative' }}
          image={images[currentImageIndex]}
          title={products.name}
        >
          {images.length > 1 && (
            <>
              <ArrowBackIcon
                sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                onClick={() => handleImageChange(-1)}
              />
              <ArrowForwardIcon
                sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }}
                onClick={() => handleImageChange(1)}
              />
            </>
          )}
        </CardMedia>
      );
    };

  return (
    <Grid container spacing={2}>
      {products.map(product => (
        <Grid item key={product._id} xs={12} sm={6} md={4} lg={3}>
          <Card sx={{ maxWidth: 345 }}>
            <ImageSlider images={product.images} />
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
              <Link to={`/products/${product._id}`}>
                <Button size="small">Learn More</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}