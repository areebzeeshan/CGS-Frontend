import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import SalesDashboard from "../Components/SalesDashboard";
import { GoProjectRoadmap } from "react-icons/go";
import { GiProgression } from "react-icons/gi";
import { PiExamFill } from "react-icons/pi";
import { MdIncompleteCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import ProductionDashboard from "../Components/ProductionDashboard";
import axios from "axios";
import ProductionAuth from "../Components/ProductionAuth";
import api from "../Components/Api";

const WorkspaceProduction = () => {
  const [projects, setProjects] = useState([]);

  // fetching
  useEffect(() => {
    const fetchingProjects = async () => {
      try {
        const response = await axios.get(
          `${api}/api/projects/get`
        );
        setProjects(response.data.data[0]);
        console.log(response.data.data[0]);
      } catch (error) {
        console.log("Error in fetching projects ", error);
      }
    };

    fetchingProjects();
  }, []);

  return (
    <>
      <div className="flex">
        <div>
          <ProductionDashboard />
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
                  {projects &&
                    projects.map((item, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-3 shadow-lg mb-4 text-black bg-slate-200"
                      >
                        <h3 className="text-xl mb-2">{item.title}</h3>
                        <h3 className="mb-2">Client : {item.clientName}</h3>
                        <h3 className="font-semibold mb-2">
                          <span className="text-red-500">Deadline : </span>{" "}
                          {item.deleiveryDate}
                        </h3>
                      </div>
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
                  <Link to={"/ProductionProjectDetail"}>
                    <div className="border rounded-lg p-3 shadow-lg mb-4 text-black bg-slate-200">
                      <h3 className="text-xl mb-2">Project Title</h3>
                      <h3 className="text-xl mb-2">Client Name</h3>
                      <h3 className="text-xl mb-2">
                        Deadline
                      </h3>
                    </div>
                  </Link>
                </div>
                {/* In Review */}
                <div>
                  <div className="rounded-lg p-2 bg-green-500 flex justify-between items-center">
                    <h3 className="text-xl">In Review</h3>
                    <div>
                      <div className="opacity-50">
                        <PiExamFill size={28} />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Completed */}
                <div>
                  <div className="rounded-lg p-2 bg-yellow-500 flex justify-between items-center">
                    <h3 className="text-xl">Completed</h3>
                    <div>
                      <div className="opacity-50">
                        <MdIncompleteCircle size={28} />
                      </div>
                    </div>
                  </div>
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

export default ProductionAuth(WorkspaceProduction);
