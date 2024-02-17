import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import SalesDashboard from '../Components/SalesDashboard'
import Select, { components } from "react-select";
import axios from 'axios';
import { IoIosSend } from 'react-icons/io';

const Input = (props) => (
  <components.Input {...props} readOnly={props.selectProps.isReadOnly} />
);

const MySelect = (props) => {
  const menuIsOpen = props.isReadOnly ? false : props.menuIsOpen;
  return <Select components={{ Input }} {...props} menuIsOpen={menuIsOpen} />;
};

const Projects = () => {

  const [projectNature, setProjectNature] = useState([{ label: "", value: "" }]);
  const [platform, setPlatform] = useState([{ label: "", value: "" }]);
  const [department, setDepartment] = useState([{ label: "", value: "" }]);
  const [formData, setFormData] = useState({
    title: "",
    id: "",
    startDate: "",
    deleiveryDate: "",
    platform: "",
    profile: "",
    salesPerson: "",
    amount: "",
    clientName: "",
    description: "",
    attachments: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log({ [e.target.name]: e.target.value })
  };

  useEffect(() => {
    const getProjectNature = async () => {
      try {
        const response = await axios.get("http://localhost:4000/dropdown/getProjectNature");
        setProjectNature(response.data.data[0])
        console.log("Response", response.data.data[0])
      } catch (error) {
        console.log("Error in fetching Project Nature", error)
      }
    };

    const getPlatform = async () => {
      try {
        const response = await axios.get("http://localhost:4000/dropdown/getPlatform");
        setPlatform(response.data.data[0])
        console.log("Response", response.data.data[0])
      } catch (error) {
        console.log("Error in fetching Project Nature", error)
      }
    };

    const getDepartment = async () => {
      try {
        const response = await axios.get("http://localhost:4000/dropdown/getDepartment");
        setDepartment(response.data.data[0])
        console.log("Response", response.data.data[0])
      } catch (error) {
        console.log("Error in fetching Project Nature", error)
      }
    };

    getProjectNature();
    getPlatform();
    getDepartment();
  }, [])

  const handleSubmit = async () => {
    try {

    } catch (error) {
      alert(error.message)
    }
  }

  console.log(formData.platform);

  return (
    <>
      <div className='flex'>
        <div>
          <SalesDashboard />
        </div>
        <div className='container flex flex-col justify-between'>
          <div>
            <Navbar />
            <div className='py-5 px-5'>
              <h1 className='text-2xl md:text-3xl lg:text-4xl lg:font-semibold text-slate-500 my-5'>Upload a Project</h1>
              <div>
                {/* form start */}
                <form>
                  <div className="mb-3">
                    <label
                      htmlFor="ID"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ID:
                    </label>
                    <input
                      type="number"
                      className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                      id="ID"
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}

                    />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-center lg:text-start">
                    {/* 1 */}
                    <div>
                      <div className="mb-3">
                        <label
                          htmlFor="startDate"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Start Date:
                        </label>
                        <input
                          type="date"
                          className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                          id="startDate"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}

                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="clientName"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Client Name:
                        </label>
                        <input
                          type="text"
                          className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                          id="clientName"
                          name="clientName"
                          value={formData.clientName}
                          onChange={handleInputChange}

                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="platform"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Platform:
                        </label>
                        <MySelect
                          options={platform}

                          defaultValue={"Select"}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="salesPerson"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Sales Person:
                        </label>
                        <input
                          type="text"
                          className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                          id="salesPerson"
                          name="salesPerson"
                          value={formData.salesPerson}
                          onChange={handleInputChange}

                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="attachments"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Attachments:
                        </label>
                        <input
                          type="file"
                          className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                          id="attachments"
                          name="attachments"
                          value={formData.attachments}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    {/* 2 */}
                    <div>
                      <div className="mb-3">
                        <label
                          htmlFor="delieveryDate"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Delievery Date:
                        </label>
                        <input
                          type="date"
                          className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                          id="delieveryDate"
                          name="delieveryDate"
                          value={formData.deleiveryDate}
                          onChange={handleInputChange}

                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Title:
                        </label>
                        <input
                          type="text"
                          className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}

                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="department"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Department:
                        </label>
                        <MySelect
                          options={department}

                          defaultValue={"Select"}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="amount"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Amount:
                        </label>
                        <input
                          type="number"
                          className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                          id="amount"
                          name="amount"
                          value={formData.amount}
                          onChange={handleInputChange}

                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="nature"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Nature of Work:
                        </label>
                        <MySelect
                          options={projectNature}

                          defaultValue={"Select"}
                        />
                      </div>
                    </div>
                  </div>

                  {/* description */}
                  <div className="mb-3">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description:
                    </label>
                    <textarea
                      className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                      name="description"
                      id="description"
                      value={formData.description}
                      onChange={handleInputChange}

                    ></textarea>
                  </div>

                  {/* submit button */}
                  <div className="flex justify-center my-10">
                    <button onClick={handleSubmit} className="text-white w-full lg:w-1/3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                      Submit
                    </button>
                  </div>
                </form>
                {/* form end */}
              </div>
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects
