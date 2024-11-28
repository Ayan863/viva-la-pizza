"use client";

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
// import { getProduct } from "@/app/redux/feature/product/ProductSlice";
import CardComp from "../Card/Card";
import Skeleton from "@mui/joy/Skeleton";
// import { getProduct } from "@/app/redux/feature/product/ProductSlice.jsx";//basqa hardasa productslice istifade
import {
  getProduct,
  editProduct,
  deleteProduct,
  addProduct,
} from "../../redux/feature/product/ProductSlice.js"; //basqa hardasa productslice istifade
// bumu reduxdaki hisseler eslinde js ile olsaydi yaxsi olardi cunki sadeca js emeliyyatlari var ama html de olsaydi onda jsx tamam?
export const setItemToLocalStorage = (key, data) => {
  let existingData = JSON.parse(localStorage.getItem(key)) || [];

  // Məhsul varsa, onu yeniləyirik
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
    id: '',
    name: '',
    type: '',
    status: '',
    price: [0],
    ingredients: '',
    image: ''
  });
  const safeValue = Array.isArray(value) ? value : [];
  const price = selectedItem.price[0] !== undefined ? selectedItem.price[0] : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedItem) { // Check if selectedItem exists
      setSelectedItem((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };
    const [createModalOpen, setCreateModalOpen] = React.useState(false);

  // Funksiyalar

  const handleCreateModalOpen = () => setCreateModalOpen(true);
  const handleCreateModalClose = () => setCreateModalOpen(false);
  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

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

    // Redux-da da silinməsi üçün
    dispatch(deleteProduct(id));
  };
  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // İlk dəfə məhsulları yükləyərkən
  React.useEffect(() => {
    const storedProducts = loadFromLocalStorage("products");
    if (storedProducts.length > 0) {
      setLocalProducts(storedProducts);
    } else {
      // Əgər localStorage boşdursa, backend-dən məhsulları al
      getProduct();
    }
  }, []);
  const handleEditProduct = (e) => {
    e.preventDefault();
    
    // Inputlardan verilən məlumatları götürürük
    const updatedProduct = {
      id: selectedItem.id,  // Redaktə edilən məhsulun ID-sini saxlayırıq
      name: selectedItem.name,
      type: selectedItem.type,
      status: selectedItem.status,
      price: selectedItem.price,
      ingredients: selectedItem.ingredients,
      image: selectedItem.image,
    };
  
    // Redux əməliyyatını çağırırıq
    dispatch(editProduct(updatedProduct))
      .then(() => {
        // Yeniləmə uğurla başa çatdıqda modalı bağlayırıq
        setOpen(false);
        // Məsələn, istifadəçiyə bildiriş göstərə bilərik
      })
      .catch((error) => {
        // Hata baş verərsə, istifadəçiyə bildiriş göstəririk
        console.error('Redaktə zamanı səhv:', error);
      });
  };
  
  
  
  const handleAddProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      id: Date.now(), // Unikal ID üçün timestamp istifadə edə bilərsiniz
      name: e.target.name.value,
      ingredients: e.target.ingredients.value || "-",
      price: [parseFloat(e.target.price.value).toFixed(2)],
      image: e.target.image.value || "default-image.jpg",
      type: e.target.type.value || "other",
    };

    // LocalStorage-ə əlavə et
    const updatedProducts = [...localProducts, newProduct];
    setLocalProducts(updatedProducts);
    saveToLocalStorage("products", updatedProducts);

    // Redux vasitəsilə API-ə göndər
    dispatch(addProduct(newProduct));

    // Input sahələrini sıfırla
    e.target.reset();
  };
  const handleSaveChanges = (e) => {
    e.preventDefault(); // Formun yenidən yüklənməsinin qarşısını alır
    const { target } = e;
    if (target) {
      const updatedProduct = {
        id: selectedItem.id, // Make sure selectedItem is not undefined
        name: selectedItem.name,
        type: selectedItem.type,
        status: selectedItem.status,
        price: parseFloat(target.price.value) || 0,
        ingredients: selectedItem.ingredients,
        image: selectedItem.image,
      };
  
      dispatch(editProduct(updatedProduct))
    
    .then(() => {
      // Uğurla yeniləndikdən sonra localStorage-da da saxlayın
      const currentProducts = JSON.parse(localStorage.getItem("products")) || [];
      const updatedProducts = currentProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      localStorage.setItem("products", JSON.stringify(updatedProducts));

      // Uğurla yeniləndikdən sonra modalı bağlayın
      setOpen(false);
    })
    .catch((error) => {
      // Hata baş verərsə, bildiriş göstərin
      console.error("Redaktə zamanı səhv:", error);
    });
  };
}
  
  // Modal bağlama funksiyası
  const handleClose = () => setOpen(false);

  // Form məlumatları üçün dəyişiklik
  

  //     // LocalStorage-ə əlavə et
  //     const updatedProducts = [...localProducts, newProduct];
  //     setLocalProducts(updatedProducts);
  //     saveToLocalStorage("products", updatedProducts);

  //     // Redux vasitəsilə API-ə göndər
  //     dispatch(fetchProducts(newProduct));

  //     // Input sahələrini sıfırla
  //     e.target.reset();
  //   };
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
      <div className="flex flex-wrap gap-5 items-center justify-around">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              className="card flex w-[47%] h-[100px] items-center justify-between p-2 border-4	rounded-sm	border-s-[#c46d6d]	border-y-transparent border-e-transparent	"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-[90px] h-[90px] m-2"
              />
              <div className="title w-[50%]">
                <p className="name">{item.name}</p>
                <span className="ingredients">
                  {item.ingredients !== "-" ? item.ingredients : null}
                </span>
              </div>
              <div className="price">
                <span>
                  {item.price[0]
                    ? item.price[0]
                    : item.price}
                  ₼
                </span>
              </div>
              
                <Button onClick={() => handleOpen(item)}>Edit</Button>
              <button
                onClick={() => handleDelete(item.id)}
                className="delete-btn bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                <TiDelete />
              </button>
            </div>
            // <CardComp
            //   key={item.id}
            //   type={item.type}
            //   status={item.status}
            //   price={item.price}
            //   ingredients={item.ingredients}
            //   name={item.name}
            //   image={item.image}
            //   id={item.id}
            // />
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

  // İlk yükləmə zamanı `localStorage`-u yoxla
  React.useEffect(() => {
    const storedProducts = loadFromLocalStorage("products");
    if (storedProducts.length > 0) {
      setLocalProducts(storedProducts);
    } else {
      dispatch(getProduct());
    }
  }, [dispatch]);

  // Redux məhsulları dəyişəndə `localStorage`-u yenilə
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
                // width: 400,
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
                      handleEditProduct(e);
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
                      {/* <Button type="submit" onclick={() => setOpen(false)}>
                        Submit
                      </Button> */}
                  <Button
                      onClick={(e) => {
                        handleSaveChanges(e);
                        setOpen(false);
                      }}
                    variant="contained"
                    // color="primary"
                    sx={{ marginTop: 2 }}
                    type="submit"
                  >
                    Save Changes
                  </Button>
                    </Stack>
                  </form>

                  {/* Save Button */}
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
                  handleCreateModalClose(); // Modalı bağlamaq
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
                    onclick={() => handleCreateModalClose()}
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
