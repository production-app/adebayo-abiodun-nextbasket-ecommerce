"use client";
import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/app/globalRedux/store";
import { getSingleProduct } from "@/app/globalRedux/Features/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import DynamicItems from "@/components/DynamicItems/DynamicItems";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { default as MUILink } from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Carousel from "nuka-carousel";
import Image from "next/image";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import unsplashSales from "@/assets/unsplashCrossSale.png";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import { addToCart } from "@/app/globalRedux/Features/cartSlice";
import { addToWishlist } from "@/app/globalRedux/Features/wishlistSlice";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Rating from "@mui/material/Rating";
import Logos from "@/components/Logos/Logos";
import Footer from "@/components/Footer/Footer";
function Product({ params }: { params: { id: string } }) {
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector(
    (state: RootState) => state.products.singleProductPayload
  );

  useEffect(() => {
    dispatch(getSingleProduct({ id: params.id }));
  }, []);

  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const breadcrumbs = [
    <MUILink href={`/`} key="1">
      <Typography color="text.primary">Home</Typography>
    </MUILink>,
    <Typography key="2" color="text.primary">
      Shop
    </Typography>,
  ];

  const handleOpenSnackBar = (message: string) => {
    setOpenSnackBar(true);
    setSnackbarMessage(message);
  };

  const handleCloseSnackBar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackBar(false);
  };

  const handleAddToCart = async (item: any, message: string) => {
    await dispatch(
      addToCart({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
      })
    );

    setOpenSnackBar(true);
    setSnackbarMessage(message);
  };

  const handleAddToWishlist = async (item: any, message: string) => {
    await dispatch(
      addToWishlist({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
      })
    );

    setOpenSnackBar(true);
    setSnackbarMessage(message);
  };

  const snackBarAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackBar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <>
      <Box
        sx={{
          padding: { xs: "8px 14px", md: "8px 147px" },
          backgroundColor: "#FAFAFA",
        }}
      >
        <Stack spacing={2}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
        </Stack>
      </Box>
      <Box
        sx={{
          padding: { xs: "8px 14px", md: "8px 147px" },
          backgroundColor: "#FAFAFA",
        }}
      >
        <Box
          sx={{
            display: { xs: "block", md: "grid" },
          }}
          gridTemplateColumns="repeat(10, 1fr)"
          gap={1}
        >
          <Box
            gridColumn="span 5"
            sx={{ height: "100%", margin: "8px" }}
            key={product.title}
          >
            {product?.images && params.id && (
              <Carousel
                wrapAround={true}
                renderCenterLeftControls={({ previousSlide }) => (
                  <IconButton onClick={previousSlide} sx={{ padding: 4 }}>
                    <ArrowBackIosIcon style={{ color: "white" }} />
                  </IconButton>
                )}
                renderCenterRightControls={({ nextSlide }) => (
                  <IconButton onClick={nextSlide} sx={{ padding: 4 }}>
                    <ArrowForwardIosIcon style={{ color: "white" }} />
                  </IconButton>
                )}
              >
                {product?.images?.map((image: any) => (
                  <Image
                    key={image}
                    src={image}
                    width={500}
                    height={450}
                    objectFit="contain"
                    alt="Picture of the author"
                    style={{ margin: "10px", display: "block" }}
                  />
                ))}
              </Carousel>
            )}
            {product.thumbnail && (
              <Box sx={{ margin: "16px" }}>
                <Image
                  src={product.thumbnail}
                  width={"100"}
                  height={"150"}
                  objectFit="contain"
                  alt="Picture of the author"
                  style={{ height: "auto" }}
                />
              </Box>
            )}
          </Box>
          <Box
            gridColumn="span 5"
            sx={{ height: "100%", margin: "8px", padding: "16px" }}
            key={product.title}
          >
            <Typography
              variant="subtitle2"
              fontWeight={400}
              color="#252B42"
              fontSize="16px"
              marginBottom={"14px"}
            >
              {product.title}
            </Typography>
            <Box>
              <Rating
                name="read-only"
                value={product.rating}
                readOnly
                sx={{ marginTop: "-4px" }}
              />
              <Typography
                variant="subtitle2"
                fontWeight={700}
                color="#737373"
                fontSize="14px"
                marginBottom={"14px"}
                marginLeft={"10px"}
              >
                10 Reviews
              </Typography>
            </Box>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              color="#252B42"
              fontSize="24px"
              marginBottom={"14px"}
            >
              ${product.price}
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight={700}
              color="#737373"
              fontSize="14px"
              marginBottom={"14px"}
            >
              Availability:{" "}
              {product.stock > 0 ? (
                <span style={{ color: "#23A6F0" }}>In Stock</span>
              ) : (
                <span style={{ color: "#23A6F0" }}>Not Available</span>
              )}
            </Typography>
            <Box
              display="flex"
              borderTop="1px solid #212121"
              paddingTop="29px"
              marginTop="140px"
            >
              <div className="ellipse bg-blue"></div>
              <div className="ellipse bg-green"></div>
              <div className="ellipse bg-orange"></div>
              <div className="ellipse bg-black"></div>
            </Box>
            <Box marginTop="68px">
              <Button variant="contained" sx={{ backgroundColor: "#23a6f0" }}>
                Select Options
              </Button>
              <IconButton
                className="icon-btn-bordered"
                sx={{ mx: "5px" }}
                aria-label="add to shopping cart"
                onClick={() => {
                  handleAddToWishlist(
                    {
                      id: product.id,
                      title: product.title,
                      image: product.thumbnail,
                      price: product.price,
                    },
                    "Item added to wishlist"
                  );
                }}
              >
                <FavoriteBorderOutlinedIcon />
              </IconButton>
              <IconButton
                className="icon-btn-bordered"
                sx={{ mx: "5px" }}
                aria-label="add to shopping cart"
                onClick={() => {
                  handleAddToCart(
                    {
                      id: product.id,
                      title: product.title,
                      image: product.thumbnail,
                      price: product.price,
                    },
                    "Item added to cart"
                  );
                }}
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>
              <IconButton
                className="icon-btn-bordered"
                sx={{ mx: "5px" }}
                aria-label="add to shopping cart"
              >
                <RemoveRedEyeIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: { xs: "8px 14px", md: "8px 147px" },
        }}
      >
        <Box sx={{ padding: "24px" }}>
          <Tabs aria-label="product info tabs" centered>
            <Tab label="Descriptions" />
            <Tab label="Additional Information" />
            <Tab label="Reviews (0)" />
          </Tabs>
        </Box>
        <Box
          sx={{
            display: { xs: "block", md: "grid" },
          }}
          gridTemplateColumns="repeat(10, 1fr)"
          gap={1}
          paddingTop={"44px"}
          borderTop={"1px solid #ECECEC"}
        >
          <Box gridColumn="span 6" sx={{ height: "100%", margin: "8px" }}>
            <Typography
              variant="h2"
              fontWeight={700}
              color="#252B42"
              fontSize="24px"
              marginBottom={"14px"}
            >
              the quick fox jumps over
            </Typography>

            <Typography
              variant="subtitle2"
              fontWeight={400}
              color="#737373"
              fontSize="14px"
              marginBottom={"30px"}
              paddingRight={"150px"}
            >
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent door ENIM RELIT Mollie. Excitation
              venial consequent sent nostrum met.
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight={400}
              color="#737373"
              fontSize="14px"
              marginBottom={"30px"}
              paddingRight={"160px"}
              paddingLeft={"16px"}
              borderLeft={"3px solid #23856D"}
            >
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent door ENIM RELIT Mollie. Excitation
              venial consequent sent nostrum met.
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight={400}
              color="#737373"
              fontSize="14px"
              marginBottom={"30px"}
              paddingRight={"150px"}
            >
              Met minim Mollie non desert Alamo est sit cliquey dolor do met
              sent. RELIT official consequent door ENIM RELIT Mollie. Excitation
              venial consequent sent nostrum met.
            </Typography>
          </Box>
          <Box gridColumn="span 4" sx={{ height: "100%", margin: "8px" }}>
            <Image
              src={unsplashSales}
              alt="Some text"
              style={{ width: "100%", height: "auto" }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          padding: { xs: "8px 14px", md: "8px 100px" },
          backgroundColor: "#FAFAFA",
        }}
      >
        <Box
          sx={{
            padding: { xs: "8px 14px", md: "8px 60px" },
            backgroundColor: "#FAFAFA",
            marginTop: "48px",
            marginBottom: "-72px",
          }}
        >
          <Typography
            variant="h2"
            fontWeight={700}
            color="#252B42"
            fontSize="24px"
            marginBottom={"24px"}
          >
            BESTSELLER PRODUCTS
          </Typography>
          <hr />
        </Box>
        <DynamicItems showLoadmoreBtn={false} />
        <Logos />
      </Box>

      <Footer socialsectionbg="#FFF" />
      <Snackbar
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleCloseSnackBar}
        message={snackbarMessage}
        action={snackBarAction}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </>
  );
}

export default Product;
