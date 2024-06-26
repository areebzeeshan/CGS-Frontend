import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import { CiCircleInfo } from "react-icons/ci";
import Footer from "../Components/Footer";
import { GoProjectRoadmap } from "react-icons/go";
import { MdIncompleteCircle } from "react-icons/md";
import { PiExamFill } from "react-icons/pi";
import { GiProgression } from "react-icons/gi";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { useDrop, useDrag } from "react-dnd";
import WithAuth from "../Components/WithAuth";
import api from "../Components/Api";

const Workspace = () => {

  const [projects, setProjects] = useState([]);
  const [allotedProjects, setAllotedProjects] = useState([]);
  const [reviewProjects, setReviewProjects] = useState([]);
  const [completedProjects, setCompletedProjects] = useState([]);
  const [progressProjects, setProgressProjects] = useState([]);

  // const fetchingProjects = async () => {
  //   try {
  //     const response = await axios.get(
  //       `${api}/api/projects/get`
  //     );
  //     setProjects(response.data.data[0]);
  //     console.log(response.data.data[0]);
  //   } catch (error) {
  //     console.log("Error in fetching projects ", error);
  //   }
  // };

  const fetchingAllotedProjects = async () => {
    try {
      const response = await axios.get(
        `${api}/api/alloted/get`
      );
      if (response.status === 200 && response.data.success) {
        setAllotedProjects(response.data.data[0]);
        console.log(response.data.data[0]);
      }
    } catch (error) {
      console.log("Error in fetching Alloted Projects ", error);
    }
  }

  const fetchingReviewProjects = async () => {
    try {
      const response = await axios.get(
        `${api}/api/review/get`
      );
      if (response.status === 200 && response.data.success) {
        setReviewProjects(response.data.data[0]);
        console.log(response.data.data[0]);
      }
    } catch (error) {
      console.log("Error in fetching Review Projects ", error);
    }
  }

  const fetchingCompletedProjects = async () => {
    try {
      const response = await axios.get(
        `${api}/api/completed/get`
      );
      if (response.status === 200 && response.data.success) {
        setCompletedProjects(response.data.data[0]);
        console.log(response.data.data[0]);
      }
    } catch (error) {
      console.log("Error in fetching Completed Projects ", error);
    }
  }

  const fetchingProgressProjects = async () => {
    try {
      const response = await axios.get(
        `${api}/api/progress/get`
      );
      if (response.status === 200 && response.data.success) {
        setProgressProjects(response.data.data[0]);
        console.log(response.data.data[0]);
      }
    } catch (error) {
      console.log("Error in fetching progress Projects ", error);
    }
  }

  // useEffect(() => {

  //   // fetchingProjects();
  //   fetchingAllotedProjects();
  //   fetchingReviewProjects();
  //   fetchingCompletedProjects();
  //   fetchingProgressProjects();
  // }, []);

  const fetchingProjects = async () => {
    try {
      const response = await axios.get(
        `${api}/api/projects/get`
      );
      const project = response.data.data[0];
      const allotProjects = project.filter(item => item.status === "To be Alloted");
      const progProjects = project.filter(item => item.status === "In Progress");
      const revProjects = project.filter(item => item.status === "In Review");
      const compProjects = project.filter(item => item.status === "Completed");
      setAllotedProjects(allotProjects);
      setProgressProjects(progProjects);
      setReviewProjects(revProjects);
      setCompletedProjects(compProjects);
    } catch (error) {
      console.log("Error in fetching projects ", error);
    }
  };

  useEffect(() => {

    fetchingProjects();
  }, []);

  return (
    <>
      <div className="flex">
        <div>
          <Dashboard />
        </div>
        <div className="container flex flex-col justify-between">
          <div>
            <Navbar />
            <div className="pt-10 px-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-white">
                {/* to be alloted */}
                <div>
                  <div className="rounded-lg p-2 bg-red-500 flex justify-between items-center mb-4">
                    <h3 className="text-xl">To be Alloted</h3>
                    <div>
                      <div className="opacity-50">
                        <GoProjectRoadmap size={28} />
                      </div>
                    </div>
                  </div>
                  {allotedProjects && allotedProjects.map((item, index) => (
                    <Link key={index} to={`/ProjectDetails/${item.id}`}>
                      <div className="border rounded-lg p-3 shadow-lg mb-4 text-black bg-slate-200">
                        <h3 className="text-xl mb-2">{item.title}</h3>
                        <h3 className="mb-2">Client : {item.clientName}</h3>
                        <h3 className="font-semibold mb-2">
                          <span className="text-red-500">Deadline : {item.deliveryDate}</span>
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
                {/* In progress */}
                <div>
                  <div className="rounded-lg p-2 bg-orange-500 flex justify-between items-center mb-4">
                    <h3 className="text-xl">In Progress</h3>
                    <div>
                      <div className="opacity-50">
                        <GiProgression size={28} />
                      </div>
                    </div>
                  </div>
                  {progressProjects && progressProjects.map((item, index) => (
                    <Link key={index} to={`/ProjectDetails/${item.id}`}>
                      <div className="border rounded-lg p-3 shadow-lg mb-4 text-black bg-slate-200">
                        <h3 className="text-xl mb-2">{item.title}</h3>
                        <h3 className="mb-2">Client : {item.clientName}</h3>
                        <h3 className="font-semibold mb-2">
                          <span className="text-red-500">Deadline : {item.deliveryDate}</span>
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
                {/* In Review */}
                <div>
                  <div className="rounded-lg p-2 bg-green-500 flex justify-between items-center mb-4">
                    <h3 className="text-xl">In Review</h3>
                    <div>
                      <div className="opacity-50">
                        <PiExamFill size={28} />
                      </div>
                    </div>
                  </div>

                  {reviewProjects && reviewProjects.map((item, index) => (
                    <Link key={index} to={`/ProjectDetails/${item.id}`}>
                      <div className="border rounded-lg p-3 shadow-lg mb-4 text-black bg-slate-200">
                        <h3 className="text-xl mb-2">{item.title}</h3>
                        <h3 className="mb-2">Client : {item.clientName}</h3>
                        <h3 className="font-semibold mb-2">
                          <span className="text-red-500">Deadline : {item.deliveryDate}</span>
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
                {/* Completed */}
                <div>
                  <div className="rounded-lg p-2 bg-yellow-500 flex justify-between items-center mb-4">
                    <h3 className="text-xl">Completed</h3>
                    <div>
                      <div className="opacity-50">
                        <MdIncompleteCircle size={28} />
                      </div>
                    </div>
                  </div>

                  {completedProjects && completedProjects.map((item, index) => (
                    <Link key={index} to={`/ProjectDetails/${item.id}`}>
                      <div className="border rounded-lg p-3 shadow-lg mb-4 text-black bg-slate-200">
                        <h3 className="text-xl mb-2">{item.title}</h3>
                        <h3 className="mb-2">Client : {item.clientName}</h3>
                        <h3 className="font-semibold mb-2">
                          <span className="text-red-500">Deadline : {item.deliveryDate}</span>
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default WithAuth(Workspace);
