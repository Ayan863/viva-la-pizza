"use client";

import { Box, Button, FormControl, FormLabel, Input, Modal, ModalClose, Sheet, Stack, TabPanel, Typography } from "@mui/joy";
import React from "react";
import Tabs from "@mui/joy/Tabs";
import Tab, { tabClasses } from "@mui/joy/Tab";
import axios from "axios";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";

const Clients = () => {
  const colors = ["primary", "danger", "success", "warning"];
  const [index, setIndex] = React.useState(0);
  const [data, setData] = React.useState([]);
  const [add, setAdd] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
    image: "",
  });
  async function getData() {
    try {
      const response = await axios.get(
        "https://66eba35c2b6cf2b89c5b2596.mockapi.io/login"
      );
      console.log(response.data); 
      setData(response.data); 
    } catch (error) {
      console.error("Error fetching data:", error); 
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAddPerson = async (e) => {
    e.preventDefault();
    const newPerson = {
      name: e.target.name.value,
      email: e.target.email.value,
      image: e.target.image.value,
      password: e.target.password.value,
    };
    try {
      console.log(formData);
      const response = await axios.post(
        "https://66eba35c2b6cf2b89c5b2596.mockapi.io/login",
        formData
      );
      setData((prevData) => [...prevData, response.data]); 
      setAdd(false); 
      setFormData({ name: "", email: "", password: "", image: "" }); 
    } catch (error) {
      console.error("Error adding person:", error);
    }
  };
  React.useEffect(() => {
    getData(); 
  }, []);

  return (
    <Box
      className="w-[100%]"
      sx={{
        flexGrow: 1,
        m: -3,
        p: 4,
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        position: "relative",
        // bgcolor: `${colors[index]}.500`,
      }}
    >
      <Tabs
        size="lg"
        aria-label="Bottom Navigation"
        value={index}
        className="lg:w-[100%]"
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
          "@media (max-width: 768px)": {
            width: "auto",
          },
        })}
      >
        <TabPanel>
          <button
            className="absolute top-2 right-2 bg-[#c46d6d] text-white px-3 py-1 rounded-md shadow-md hover:bg-[#a34d4d] transition duration-300"
            onClick={() => setAdd(true)}
          >
            Add
          </button>
          <div className="flex flex-wrap xl:gap-5 items-center justify-around xl:w-full">
            {data.map((item) => (
              <div
                key={item.id}
                className="card relative flex flex-col xl:flex-row xl:w-[47%] w-full xl:h-[100px] items-center justify-between p-4 border-4 rounded-sm border-s-[#c46d6d] border-y-transparent border-e-transparent"
              >
                <img
                  src={
                    item.image
                      ? item.image
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuEiaDNDqRo6K0Zn_NlRJjAde-B1zommEhIg&s"
                  }
                  alt={item.name}
                  className="w-[90px] h-[90px] m-2 rounded-[50%]"
                />
                <div className="title w-full xl:w-[50%] text-center max-w-[200px] xl:text-left">
                  <p className="name font-sans text-lg font-semibolds max-w-[200px] break-words">{item.name}</p>
                  <p className="password font-mono text-sm break-words">{item.password}</p>
                  <p className="email  font-mono text-sm break-words">{item.email}</p>
                </div>
                <p className="money font-sans text-lg font-semibold break-words">{item.money}₼</p>
          
              </div>
            ))}
            <Modal open={add} onClose={() => setAdd(false)}>
            <ModalDialog className="w-[50px]">
              <DialogTitle>Add person</DialogTitle>
              <DialogContent>
                Please fill in the information
              </DialogContent>
              <form
                onSubmit={(e) => {
                  handleAddPerson(e);
                  setAdd(false)
                }}
              >
                <Stack spacing={2}>
                  <div className="flex gap-3">
                    <div>
                      <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                          name="name"
                          placeholder="John"
                          autoFocus
                          value={formData.name} 
                          onChange={handleInputChange} 

                          required
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                          name="email"
                          placeholder="jhonadin@gmail.com"
                          value={formData.email} 
                          onChange={handleInputChange} 
                          autoFocus
                          required
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Password</FormLabel>
                        <Input
                          name="password"
                          placeholder="gdhjkH876"
                          autoFocus
                          value={formData.password} 
                          onChange={handleInputChange} 

                          required
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Image</FormLabel>
                        <Input
                          name="image"
                          placeholder="Image link..."
                          value={formData.image} 
                          onChange={handleInputChange} 

                          autoFocus
                          required
                        />
                      </FormControl>
                    </div>
                  </div>
                  <Button
                    type="submit"
                  >
                    Submit
                  </Button>
                </Stack>
              </form>
            </ModalDialog>
          </Modal>
          </div>
        </TabPanel>
      </Tabs>
    </Box>
  );
};

export default Clients;
