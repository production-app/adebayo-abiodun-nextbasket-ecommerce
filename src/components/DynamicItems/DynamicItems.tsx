"use client";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "@/app/globalRedux/store";
import {
  getProducts,
  getMoreProducts,
} from "@/app/globalRedux/Features/productsSlice";
import { useDispatch, useSelector } from "react-redux";

import { default as MUILink } from "@mui/material/Link";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

function DynamicItems({
  showLoadmoreBtn = true,
}: {
  showLoadmoreBtn: boolean;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getProducts({ skip: 0 }));
  }, []);

  const handleLoadMore = () => {
    const skip = products.payload?.products.length;
    dispatch(getMoreProducts({ skip: skip }));
  };

  function getDiscountPrice(price: number, discountPercent: number) {
    const discountDecimal = discountPercent / 100.0;
    const total = price - price * discountDecimal;
    return total.toFixed(2);
  }
  return (
    <Box sx={{ mt: "90px", mb: "24px", mx: "56px" }}>
      {products?.payload?.products && (
        <Box
          sx={{ display: { xs: "block", md: "grid" }, mt: "80px" }}
          gridTemplateColumns="repeat(10, 1fr)"
          gap={1}
        >
          {products.payload?.products?.map((product: any) => (
            <Box
              gridColumn="span 2"
              sx={{ height: "100%", margin: "8px" }}
              key={product.title}
            >
              <MUILink href={`/products/${product.id}`}>
                <Card
                  sx={{
                    maxWidth: 390,
                    height: "100%",
                    boxShadow: "none",
                    margin: "auto",
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="240"
                      image={product.images[0]}
                      alt={product.description}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        textAlign="center"
                        color="#252B42"
                        fontSize="15px"
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        fontWeight={700}
                        textAlign="center"
                        color="#737373"
                        fontSize="14px"
                        marginTop="8px"
                        marginBottom="8px"
                      >
                        {product?.brand}
                      </Typography>
                      <Box sx={{ display: "flex" }}>
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          textAlign="center"
                          color="#BDBDBD"
                          fontSize="13px"
                          marginRight="4px"
                        >
                          ${product?.price}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          textAlign="center"
                          color="#23856D"
                          fontSize="14px"
                        >
                          $
                          {getDiscountPrice(
                            product?.price,
                            product?.discountPercentage
                          )}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </MUILink>
            </Box>
          ))}
        </Box>
      )}
      {showLoadmoreBtn &&
        products.payload?.products?.length < products?.payload?.total && (
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            sx={{
              margin: "auto",
              display: "block",
              mt: "40px",
              color: "#23a6f0",
              borderColor: "#23a6f0",
            }}
          >
            LOAD MORE PRODUCTS
          </Button>
        )}
    </Box>
  );
}

export default DynamicItems;
