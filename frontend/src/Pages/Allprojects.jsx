import React, { useState, useEffect, useRef } from "react";
import AppBar from "../Components/Appbar";
import Menu from "../Components/menu";
import axios from "axios";
import Addprojects from "../Pages/Addprojects";
import { useReactToPrint } from 'react-to-print';

const URL = "http://localhost:5000/projects";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data)
}

function Allprojects() {
  const [projects, setProjects] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setProjects(data.project));
  }, [])

  // Report print functions
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: 'Project Report',
    onAfterPrint: () => alert("Project Report successfully Download !"),
  })

  return (
    <div style={{ marginLeft: '255px', paddingTop: '80px' }}>
      <AppBar />
      <Menu />
      <h1 style={{ color: 'blue', marginLeft: '40px' }}>
        All projects display page
      </h1>

      {/* Table with headers */}
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Project Budget</th>
            <th>Employees</th>
            <th>Status</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Project Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody ref={ComponentsRef}>
          {/* Render each project */}
          {projects && projects.map((project) => (
            <Addprojects key={project.id} Project={project} />
          ))}
        </tbody>
      </table>
      
      <button onClick={handlePrint}>Download ALL Report</button>
    </div>
  );
}

export default Allprojects;
