import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AppBar from "../Components/Appbar";
import Menu from "../Components/menu";
import { TextField, Button, Grid, Box, MenuItem } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

function AddProject() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    projectID: "",
    projectName: "",
    projectBudget: "",
    Locate: "",
    contractor: "",
    Employees: "",
    Status: "",
    startDate: "",
    endDate: "",
    projectType: "",
    description: "",
  });
 // const [nextProjectId, setNextProjectId] = useState(null);


  /*useEffect(() => {
    fetchNextProjectId();
  }, []);

  const fetchNextProjectId = async () => {
    try {
      const response = await axios.get('http://localhost:5000/nextProjectId');
      setNextProjectId(response.data.nextProjectId);
    } catch (error) {
      console.error('Error fetching next project ID:', error);
    }
  };*/

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs/*, projectID: nextProjectId*/ );
    sendRequest().then(() => history('/allprojects'));
  };
  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/projects", {
        ...inputs,
       // projectID: nextProjectId,
        startDate: new Date(inputs.startDate).toISOString(),
        endDate: new Date(inputs.endDate).toISOString(),
      })
      .then((res) => res.data);
  };

  /*const GoogleMapComponent = ({ label, name, value, onChange }) => {
    const { isLoaded } = useJsApiLoader({
      id: "google-map-script",
      googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
    });

    const [position, setPosition] = useState({ lat: 0, lng: 0 });

    const handleMapClick = (event) => {
      setPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      onChange({
        target: { name, value: `${event.latLng.lat()}, ${event.latLng.lng()}` },
      });
    };

    return isLoaded ? (
      <div>
        <label>{label}</label>
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={position}
          zoom={10}
          onClick={handleMapClick}
        >
          <Marker position={position} />
        </GoogleMap>
      </div>
    ) : (
      <></>
    );
  };
  */

  return (
    <div>
      <AppBar />
      <Menu />
      <div style={{ marginLeft: "255px", paddingTop: "80px" }}>
        <Breadcrumbs
          arial-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
        >
          <Link underline="hover" key="1" color="inherit" href="/projects">
            Project Dashboard
          </Link>
          <Link underline="hover" key="2" color="inherit" href="/allprojects">
            Projects List
          </Link>
          <Typography key="3" color="text.primary">
            Add Project
          </Typography>
        </Breadcrumbs>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: "80%",
              maxWidth: 800,
              padding: 4,
              bgcolor: "background.paper",
              boxShadow: 3,
            }}
          >
            <Typography align="center" gutterBottom variant="h4" component="h2">
              <strong>Add Project Details</strong>
            </Typography>
            <br></br>

            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project ID"
                  name="projectID"
                  value={inputs.projectID}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Name"
                  name="projectName"
                  value={inputs.projectName}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Budget"
                  name="projectBudget"
                  value={inputs.projectBudget}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  type="number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField  //GoogleMapComponent
                  label="Location"
                  name="Locate"
                  value={inputs.Locate}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contractor"
                  name="contractor"
                  value={inputs.contractor}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Employees"
                  name="Employees"
                  value={inputs.Employees}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={inputs.startDate}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={inputs.endDate}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Status"
                  name="Status"
                  value={inputs.Status}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  select
                >
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Start">Start</MenuItem>
                  <MenuItem value="Done">Done</MenuItem>
                  <MenuItem value="End">End</MenuItem>
                  <MenuItem value="Pouse">Pause</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Type"
                  name="projectType"
                  value={inputs.projectType}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  select
                >
                  <MenuItem value="furniture">Furniture</MenuItem>
                  <MenuItem value="elevator">Elevator</MenuItem>
                  <MenuItem value="paint">Paint</MenuItem>
                  <MenuItem value="water">Water-supply</MenuItem>
                  <MenuItem value="Tile">Tile</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Description"
                  name="description"
                  value={inputs.description}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{
                    mt: 7,
                    mb: 2,
                    height: "50px",
                    width: "150px",
                    borderRadius: "21px",
                    backgroundColor: "#1B1A55",
                    "&:hover": {
                      backgroundColor: "#16155d",
                    },
                  }}
                >
                  Add Project
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default AddProject;
