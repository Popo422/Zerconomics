import React, { useState } from "react";
import { useGetProductsQuery } from "../../state/api";
import Header from "../../components/Header";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const Product = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat,
  }) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.5rem",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color={theme.palette.secondary[700]}
            gutterBottom
          >
            {category}
          </Typography>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography
            sx={{ marginBottom: "1.5rem" }}
            color={theme.palette.secondary[400]}
            component="div"
          >
            ${Number(price).toFixed(2)}
          </Typography>
          <Rating value={rating} readOnly />
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="primary"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            See More
          </Button>
        </CardActions>
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{ color: theme.palette.neutral[300] }}
        >
          <Box margin="0 0 1rem 1rem">
            <Typography>id: {_id}</Typography>
            <Typography>Supply Left: {supply}</Typography>
            <Typography>
              Yearly Sales This Year: {stat.yearlySalesTotal}
            </Typography>
            <Typography>
              Yearly Units Sold This Year:{stat.yearlyTotalSoldUnits}
            </Typography>
          </Box>
        </Collapse>
      </Card>
    );
  };
  return (
    <Box margin="1.5rem 2.5rem">
      <Header title="Products" subtitle="See your List Of Products"></Header>
      { data || !isLoading? (
        <Box
          marginTop="20px"
          display="grid"
          gridTemplateColumns="repeat(4,minmax(0,1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{ "&>div": { gridColumn: isNonMobile ? undefined : "span 4" } }} //every child component after this element
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <Box
          justifyContent="center"
          sx={{ display: "flex", margin: "0 0 0 0" }}
        >
          <CircularProgress
            sx={{ width: "12rem !important", height: "12rem !important" }}
          >
            {" "}
            <Typography sx={{ marginBottom: "1.5rem" }} variant="h5">
              {" "}
              TEST
            </Typography>
          </CircularProgress>
        </Box>
      )}
    </Box>
  );
};

export default Products;
