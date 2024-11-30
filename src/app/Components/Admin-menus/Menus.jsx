"use client";
import { FaPen } from "react-icons/fa";
import * as React from "react";
import Box from "@mui/joy/Box";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab, { tabClasses } from "@mui/joy/Tab";
import { TiDelete } from "react-icons/ti";
import { IoIosAddCircle } from "react-icons/io";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";
import { RiDrinks2Fill } from "react-icons/ri";
import { FaPizzaSlice } from "react-icons/fa";
import { GrRestaurant } from "react-icons/gr";
import { GiSaucepan } from "react-icons/gi";
import { AspectRatio, Card, TabPanel, TextField, Typography } from "@mui/joy";
import { useDispatch, useSelector } from "react-redux";
import CardComp from "../Card/Card";
import Skeleton from "@mui/joy/Skeleton";
import {
  getProduct,
  editProduct,
  deleteProduct,
  addProduct,
} from "../../redux/feature/product/ProductSlice.js";
export const setItemToLocalStorage = (key, data) => {
  let existingData = JSON.parse(localStorage.getItem(key)) || [];

  existingData = existingData.map((item) =>
    item.id === data.id ? { ...item, ...data } : item
  );

  localStorage.setItem(key, JSON.stringify(existingData));
};
const OurMenuTab = () => {
  const [index, setIndex] = React.useState(0);
  const colors = ["primary", "danger", "success", "warning"];
  const dispatch = useDispatch();
  const { value, loading } = useSelector((state) => state.product);
  const [localProducts, setLocalProducts] = React.useState([]);
  const reduxProducts = useSelector((state) => state.product.value);
  const [open, setOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({
    type: "",
    status: "",
    price: [],
    ingredients: "",
    name: "",
    image: "",
  });
  const safeValue = Array.isArray(value) ? value : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedItem((prevItem) => ({
      ...prevItem,
      [name]: name === "price" ? value.split(",").map((v) => v.trim()) : value,
    }));
  };

  const [createModalOpen, setCreateModalOpen] = React.useState(false);

  const handleCreateModalOpen = () => setCreateModalOpen(true);
  const handleCreateModalClose = () => setCreateModalOpen(false);
  const handleOpen = (item) => {
    setSelectedItem({
      id: item.id,
      name: item.name || "",
      type: item.type || "",
      status: item.status || "",
      price: item.price || [],
      ingredients: item.ingredients || "",
      image: item.image || "",
    });
    setOpen(true);
  };
  const handleEditProduct = (e) => {
    e.preventDefault();

    const updatedProduct = {
      ...selectedItem,
    };

    dispatch(editProduct(updatedProduct))
      .then(() => {
        setOpen(false);
      })
      .catch((error) => {
        console.error("Redaktə zamanı səhv:", error);
      });
  };
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    if (reduxProducts.length === 0) {
      dispatch(getProduct());
    }
  }, [dispatch, reduxProducts]);

  const handleDelete = (id) => {
    const updatedProducts = localProducts.filter(
      (product) => product.id !== id
    );
    setLocalProducts(updatedProducts);
    saveToLocalStorage("products", updatedProducts);

    dispatch(deleteProduct(id));
  };
  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  React.useEffect(() => {
    const storedProducts = loadFromLocalStorage("products");
    if (storedProducts.length > 0) {
      setLocalProducts(storedProducts);
    } else {
      getProduct();
    }
  }, []);

  const handleAddProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      name: e.target.name.value,
      ingredients: e.target.ingredients.value || "-",
      price: [parseFloat(e.target.price.value).toFixed(2)],
      image: e.target.image.value || "default-image.jpg",
      type: e.target.type.value || "other",
    };

    const updatedProducts = [...localProducts, newProduct];
    setLocalProducts(updatedProducts);
    saveToLocalStorage("products", updatedProducts);

    dispatch(addProduct(newProduct));

    e.target.reset();
  };
  const handleSaveChanges = (e) => {
    e.preventDefault();
    const { target } = e;
  
    console.log(target);
  
    if (target) {
      const priceValue = target.price.value;
      console.log("Price Value:", priceValue);
  
      const price = priceValue ? parseFloat(priceValue) : 0;
  
      console.log("Selected Item:", selectedItem);
  
      const updatedProduct = {
        id: selectedItem.id,
        name: selectedItem.name,
        type: selectedItem.type,
        status: selectedItem.status,
        price,
        ingredients: selectedItem.ingredients,
        image: selectedItem.image,
      };
  
      dispatch(editProduct(updatedProduct))
        .then(() => {
          const currentProducts = JSON.parse(localStorage.getItem("products")) || [];
          console.log("Current Products:", currentProducts);
  
          const updatedProducts = currentProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          );
          localStorage.setItem("products", JSON.stringify(updatedProducts));
  
          setOpen(false);
        })
        .catch((error) => {
          console.error("Error during update:", error);
        });
    }
  };
  
  const getApi = (name) => {
    if (loading) {
      return (
        <div
          className="grid w-full gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
          }}
        >
          {[...Array(10)].map((_, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <AspectRatio ratio="4/3">
                <Skeleton variant="overlay">
                  <img
                    alt=""
                    src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                  />
                </Skeleton>
              </AspectRatio>
              <Typography>
                <Skeleton>
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries.
                </Skeleton>
              </Typography>
            </Card>
          ))}
        </div>
      );
    }

    if (!value || value.length === 0) {
      return <div>No items available.</div>;
    }

    const filteredItems =
      name !== "all"
        ? value.filter((item) => item.type.toLowerCase() == name.toLowerCase())
        : value;
    return (
      <div className="flex flex-wrap xl:gap-5 items-center justify-around xl:w-full">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              className="card relative flex flex-col xl:flex-row xl:w-[47%] w-full xl:h-[100px] items-center justify-between p-4 border-4 rounded-sm border-s-[#c46d6d] border-y-transparent border-e-transparent"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[90px] h-[90px] m-2"
              />
              <div className="title   w-full xl:w-[50%] text-center max-w-[200px] xl:text-left">
                <p className="name font-sans text-lg font-semibolds max-w-[200px] break-words">
                  {item.name}
                </p>
                <span className="ingredients font-mono text-sm break-words">
                  {item.ingredients !== "-" ? item.ingredients : null}
                </span>
              </div>
              <div className="price font-mono text-sm break-words">
                <span>{item.price[0] ? item.price[0] : item.price}₼</span>
              </div>

              <button
                className="absolute right-[-10px] text-red-900"
                onClick={() => handleOpen(item)}
              >
                <FaPen />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="delete-btn text-red-500  rounded-full w-8 h-8 flex items-center justify-center absolute right-[-21px] top-[-4px]"
              >
                <TiDelete />
              </button>
            </div>

          ))
        ) : (
          <div>No items found for the specified name.</div>
        )}
      </div>
    );
  };
  const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };

  React.useEffect(() => {
    const storedProducts = loadFromLocalStorage("products");
    if (storedProducts.length > 0) {
      setLocalProducts(storedProducts);
    } else {
      dispatch(getProduct());
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (reduxProducts.length > 0 && localProducts.length === 0) {
      setLocalProducts(reduxProducts);
      saveToLocalStorage("products", reduxProducts);
    }
  }, [reduxProducts]);

  return (
    <Box
      className="w-[100%]"
      sx={{
        flexGrow: 1,
        m: -3,
        p: 4,
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        bgcolor: `${"var(--colors-index)"}.500`,
      }}
      style={{ "--colors-index": colors[index] }}
    >
      <Tabs
        size="lg"
        aria-label="Bottom Navigation"
        value={index}
        onChange={(event, value) => setIndex(value)}
        sx={(theme) => ({
          p: 1,
          borderRadius: 16,
          width: "89%",
          mx: "auto",
          boxShadow: theme.shadow.sm,
          "--joy-shadowChannel": theme.vars.palette[colors[index]].darkChannel,
          [`& .${tabClasses.root}`]: {
            py: 1,
            flex: 1,
            transition: "0.3s",
            fontWeight: "md",
            fontSize: "md",
            [`&:not(.${tabClasses.selected}):not(:hover)`]: {
              opacity: 0.7,
            },
          },
        })}
      >
        <TabList
          variant="plain"
          size="sm"
          disableUnderline
          sx={{ borderRadius: "lg", p: 0 }}
        >
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 1 && { color: colors[1] })}
          >
            <ListItemDecorator>
              <FaPizzaSlice />
            </ListItemDecorator>
            Pizzas
          </Tab>
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 2 && { color: colors[2] })}
          >
            <ListItemDecorator>
              <RiDrinks2Fill />
            </ListItemDecorator>
            Drinks
          </Tab>
          <Tab
            disableIndicator
            orientation="vertical"
            {...(index === 3 && { color: colors[3] })}
          >
            <ListItemDecorator>
              <GiSaucepan />
            </ListItemDecorator>
            Sauce
          </Tab>
        </TabList>
        {/* <TabPanel value={0}>{getApi("all")}</TabPanel> */}
        <TabPanel value={0}>{getApi("pizza")}</TabPanel>
        <TabPanel value={1}>{getApi("drinks")}</TabPanel>
        <TabPanel value={2}>{getApi("sous")}</TabPanel>
        <React.Fragment>
          <Button
            variant="outlined"
            color="neutral"
            startDecorator={<Add />}
            onClick={handleCreateModalOpen}
          >
            New Menu
          </Button>
          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: 4,
                borderRadius: 2,
                boxShadow: 24,
              }}
            >
              {selectedItem && (
                <div>
                  <Typography variant="h6" component="h2">
                    Edit Product
                  </Typography>

                  <form
                    onSubmit={(e) => {
                      // handleEditProduct(e);
                      handleSaveChanges(e)
                      setOpen(false);
                    }}
                  >
                    <Stack spacing={2}>
                      <div className="flex gap-3">
                        <div>
                          <FormControl>
                            <FormLabel>Type</FormLabel>
                            <Input
                              label="type"
                              name="type"
                              value={selectedItem.type}
                              onChange={handleInputChange}
                              fullWidth
                              margin="normal"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Status</FormLabel>
                            <Input
                              label="status"
                              name="status"
                              value={selectedItem.status}
                              onChange={handleInputChange}
                              fullWidth
                              margin="normal"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Price</FormLabel>
                            <Input
                              label="price"
                              name="price"
                              value={selectedItem.price}
                              onChange={handleInputChange}
                              fullWidth
                              margin="normal"
                            />
                          </FormControl>
                        </div>
                        <div>
                          <FormControl>
                            <FormLabel>Ingredients</FormLabel>
                            <Input
                              label="ingredients"
                              name="ingredients"
                              value={selectedItem.ingredients}
                              onChange={handleInputChange}
                              fullWidth
                              margin="normal"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                              label="name"
                              name="name"
                              value={selectedItem.name}
                              onChange={handleInputChange}
                              fullWidth
                              margin="normal"
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Image</FormLabel>
                            <Input
                              label="image"
                              name="image"
                              value={selectedItem.image}
                              onChange={handleInputChange}
                              fullWidth
                              margin="normal"
                            />
                          </FormControl>
                        </div>
                      </div>
                      <Button
                        
                        variant="contained"
                        sx={{ marginTop: 2 }}
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </Stack>
                  </form>

                </div>
              )}
            </Box>
          </Modal>
          <Modal open={createModalOpen} onClose={handleCreateModalClose}>
            <ModalDialog>
              <DialogTitle>Create new menu item</DialogTitle>
              <DialogContent>
                Please fill in the information of the menu.
              </DialogContent>
              <form
                onSubmit={(e) => {
                  handleAddProduct(e);
                  handleCreateModalClose(); 
                }}
              >
                <Stack spacing={2}>
                  <div className="flex gap-3">
                    <div>
                      <FormControl>
                        <FormLabel>Type</FormLabel>
                        <Input
                          name="type"
                          placeholder="pizza/drinks/sous"
                          autoFocus
                          required
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Status</FormLabel>
                        <Input
                          name="status"
                          placeholder="bestseller/available..."
                          autoFocus
                          required
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Price</FormLabel>
                        <Input
                          name="price"
                          placeholder="[small/medium/large]"
                          autoFocus
                          required
                        />
                      </FormControl>
                    </div>
                    <div>
                      <FormControl>
                        <FormLabel>Ingredients</FormLabel>
                        <Input
                          name="ingredients"
                          placeholder="Tomato sauce, mozzarella cheese"
                          autoFocus
                          required
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                          name="name"
                          placeholder="Margherita"
                          autoFocus
                          required
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Image</FormLabel>
                        <Input
                          name="image"
                          placeholder="https://vivalapizza.az/upload/resize_cache/iblock/9c5/254_254_2/9c569f8bc8a550ac6d2df4ba7f00b077.png?1714726493144977"
                          autoFocus
                          required
                        />
                      </FormControl>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    onClick={() => handleCreateModalClose()}
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </ModalDialog>
          </Modal>
        </React.Fragment>
      </Tabs>
    </Box>
  );
};

export default OurMenuTab;
