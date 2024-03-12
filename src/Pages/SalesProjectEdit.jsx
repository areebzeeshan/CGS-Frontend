import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import SalesDashboard from '../Components/SalesDashboard'
import Select, { components } from "react-select";
import axios from 'axios';
import { IoIosSend } from 'react-icons/io';
import SalesAuth from '../Components/SalesAuth';
import api from '../Components/Api';
import { Link, useParams } from 'react-router-dom';

const SalesProjectEdit = () => {

    const { id } = useParams();

    const [projectNature, setProjectNature] = useState([{ label: "", value: "" }]);
    const [platform, setPlatform] = useState([{ label: "", value: "" }]);
    const [department, setDepartment] = useState([{ label: "", value: "" }]);
    const [Id, setId] = useState(null);
    const [title, setTitle] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [deleiveryDate, setDelieveryDate] = useState(null);
    const [plat, setPlat] = useState(null);
    const [depart, setDepart] = useState(null);
    const [nature, setNature] = useState(null);
    const [profile, setProfile] = useState(null);
    const [salesPerson, setSalesPerson] = useState(null);
    const [amount, setAmount] = useState(null);
    const [clientName, setClientName] = useState(null);
    const [description, setDescription] = useState(null);
    const [attachments, setAttachments] = useState(null);
    // const handleInputChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append("attachments", attachments);
            formData.append("id", id);
            formData.append("title", title);
            formData.append("startDate", startDate);
            formData.append("deleiveryDate", deleiveryDate);
            formData.append("platform", plat);
            formData.append("department", depart);
            formData.append("nature", nature);
            formData.append("profile", profile);
            formData.append("salesPerson", salesPerson);
            formData.append("amount", amount);
            formData.append("clientName", clientName);
            formData.append("description", description);

            console.log("Form Data : ", formData)

            const updatedProject = await axios.put(`${api}/api/projects/update/${id}`, formData);
            if (updatedProject.status === 200 && updatedProject.data.success) {
                console.log('Updated Projects : ', updatedProject)
                alert("Projects updated successfully!")
            }
        } catch (error) {
            console.log("Error in updating project : ", error)
            alert(error.message)
        }
    }

    useEffect(() => {
        const getProjectNature = async () => {
            try {
                const response = await axios.get(`${api}/dropdown/getProjectNature`);
                setProjectNature(response.data.data[0])
                console.log("Response", response.data.data[0])
            } catch (error) {
                console.log("Error in fetching Project Nature", error)
            }
        };

        const getPlatform = async () => {
            try {
                const response = await axios.get(`${api}/dropdown/getPlatform`);
                setPlatform(response.data.data[0])
                console.log("Response", response.data.data[0])
            } catch (error) {
                console.log("Error in fetching Project Nature", error)
            }
        };

        const getDepartment = async () => {
            try {
                const response = await axios.get(`${api}/dropdown/getDepartment`);
                setDepartment(response.data.data[0])
                console.log("Response", response.data.data[0])
            } catch (error) {
                console.log("Error in fetching Project Nature", error)
            }
        };

        const getProjectByID = async () => {
            try {
                const response = await axios.get(`${api}/api/projects/search/${id}`);
                console.log("Response:", response);
                if (response) {
                    console.log("project search : ", response.data.data[0])
                    const responseData = response.data.data[0];
                    // setFormData({
                    //     title: responseData.title,
                    //     startDate: responseData.startDate,
                    //     deleiveryDate: responseData.deleiveryDate,
                    //     plat: responseData.platform,
                    //     depart: responseData.department,
                    //     nature: responseData.nature,
                    //     profile: responseData.profile,
                    //     salesPerson: responseData.salesPerson,
                    //     amount: responseData.amount,
                    //     clientName: responseData.clientName,
                    //     description: responseData.description,
                    //     // attachments: responseData.attachments
                    // })
                    setTitle(responseData.title)
                    setStartDate(responseData.startDate)
                    setDelieveryDate(responseData.deleiveryDate)
                    setPlat(responseData.platform)
                    setDepart(responseData.department)
                    setNature(responseData.nature)
                    setProfile(responseData.profile)
                    setSalesPerson(responseData.salesPerson)
                    setAmount(responseData.amount)
                    setClientName(responseData.clientName)
                    setDescription(responseData.description)
                }
            } catch (error) {
                console.log("Error fetching project:", error);
                alert(error.message);
            }
        };


        getProjectByID();
        getProjectNature();
        getPlatform();
        getDepartment();
    }, [])

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
                            <div>
                                <h1 className='text-2xl md:text-3xl lg:text-4xl lg:font-semibold text-slate-500 my-5'>Project Details</h1>
                            </div>
                            <div className=''>
                                {/* form start */}
                                <form>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-center lg:text-start">
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
                                                value={id}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label
                                                htmlFor="startDate"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Start Date:
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="startDate"
                                                name="startDate"
                                                placeholder='YYYY-MM-DD'
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
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
                                                value={clientName}
                                                onChange={(e) => setClientName(e.target.value)}

                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="platform" className="block text-sm font-medium leading-6 text-gray-900">Platform:</label>
                                            <select id="platform" className='w-full border p-2 rounded' name='plat' value={plat} onChange={(e) => setPlat(e.target.value)}>
                                                <option className='m-5' value="">Select</option>
                                                {
                                                    platform.map((item, index) => (
                                                        <option key={index} className='m-5' value={item.label}>{item.label}</option>
                                                    ))
                                                }
                                            </select>
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
                                                value={salesPerson}
                                                onChange={(e) => setSalesPerson(e.target.value)}

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
                                                value={attachments}
                                                onChange={(e) => setAttachments(e.target.value)}
                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label
                                                htmlFor="delieveryDate"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Delievery Date:
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="delieveryDate"
                                                name="delieveryDate"
                                                placeholder='YYYY-MM-DD'
                                                value={deleiveryDate}
                                                onChange={(e) => setDelieveryDate(e.target.value)}

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
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}

                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="depart" className="block text-sm font-medium leading-6 text-gray-900">Department:</label>
                                            <select id="depart" className='w-full border p-2 rounded' name='depart' value={depart} onChange={(e) => setDepart(e.target.value)}>
                                                <option className='m-5' value="">Select</option>
                                                {
                                                    department.map((item, index) => (
                                                        <option key={index} className='m-5' value={item.label}>{item.label}</option>
                                                    ))
                                                }
                                            </select>
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
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}

                                            />
                                        </div>

                                        <div className="mb-3">
                                            <label htmlFor="nature" className="block text-sm font-medium leading-6 text-gray-900">Project Nature:</label>
                                            <select id="nature" className='w-full border p-2 rounded' name='nature' value={nature} onChange={(e) => setNature(e.target.value)}>
                                                <option className='m-5' value="">Select</option>
                                                {
                                                    projectNature.map((item, index) => (
                                                        <option key={index} className='m-5' value={item.label}>{item.label}</option>
                                                    ))
                                                }
                                            </select>
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
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                </form>
                                {/* form end */}

                                <div className='flex justify-center my-10'>
                                    <button onClick={handleUpdate} className="text-white w-full lg:w-1/3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                        Edit
                                    </button>
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
    )
}

export default SalesProjectEdit