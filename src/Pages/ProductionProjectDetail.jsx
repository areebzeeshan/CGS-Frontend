import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ProductionDashboard from '../Components/ProductionDashboard';
import Select, { components } from "react-select";
import axios from 'axios';
import { IoIosSend } from 'react-icons/io';
import api from '../Components/Api';


const Input = (props) => (
    <components.Input {...props} readOnly={props.selectProps.isReadOnly} />
);

const MySelect = (props) => {
    const { options, label, onChange, isReadOnly } = props;
    const [menuIsOpen, setMenuIsOpen] = useState(false); // State to manage menu open/close

    const handleChange = (selectedOption) => {
        onChange(selectedOption);
    };

    return (
        <Select
            options={options}
            label={label}
            onChange={handleChange}
            menuIsOpen={!isReadOnly && menuIsOpen} // Open menu if not read-only and state is open
            onMenuOpen={() => setMenuIsOpen(true)} // Open menu when clicked
            onMenuClose={() => setMenuIsOpen(false)} // Close menu when clicked outside
            components={{ Input }}
        />
    );
};
const ProductionProjectDetail = () => {


    const [projectNature, setProjectNature] = useState([{ label: "", value: "" }]);
    const [platform, setPlatform] = useState([{ label: "", value: "" }]);
    const [department, setDepartment] = useState([{ label: "", value: "" }]);
    const [id, setId] = useState(null);
    const [title, setTitle] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [deleiveryDate, setDeleiveryDate] = useState(null);
    const [plat, setPlat] = useState(null);
    const [depart, setDepart] = useState(null);
    const [nature, setNature] = useState(null);
    const [profile, setProfile] = useState(null);
    const [salesPerson, setSalesPerson] = useState(null);
    const [amount, setAmount] = useState(null);
    const [clientName, setClientName] = useState(null);
    const [description, setDescription] = useState(null);
    const [attachments, setAttachments] = useState(null);
    // const [formData, setFormData] = useState({
    //   title: "",
    //   id: "",
    //   startDate: "",
    //   deleiveryDate: "",
    //   platform: "",
    //   department: "",
    //   nature: "",
    //   profile: "",
    //   salesPerson: "",
    //   amount: "",
    //   clientName: "",
    //   description: "",
    //   attachments: "",
    // });
    // const handleInputChange = (e) => {
    //   setFormData({ ...formData, [e.target.name]: e.target.value });
    //   console.log({ [e.target.name]: e.target.value })
    // };

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

        getProjectNature();
        getPlatform();
        getDepartment();
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            let formData = new FormData();
            console.log("attachments", attachments)
            formData.append("attachments", attachments)
            formData.append("id", id);
            formData.append("title", title);
            formData.append("startDate", startDate);
            formData.append("deleiveryDate", deleiveryDate);
            formData.append("platform", platform);
            formData.append("department", department);
            formData.append("nature", nature);
            formData.append("profile", profile);
            formData.append("salesPerson", salesPerson);
            formData.append("amount", amount);
            formData.append("clientName", clientName);
            formData.append("description", description);
            console.log(formData,"asdadad");
            var response = await axios.post(`${api}/api/projects/submit`,formData)
            if (response.status === 200 && response.data.success) {
                console.log(response);
                console.log("Project Posted Successfully")
                alert("Project Posted Successfully");
            }
        } catch (error) {
            console.log(response)
            console.log("Error in posting Project", error)
            // alert(error.message)
        }
    }

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
                            <h1 className='text-2xl md:text-3xl lg:text-4xl lg:font-semibold text-slate-500 my-5'>Project Details</h1>
                            <div>
                                {/* form start */}
                                <form onSubmit={handleSubmit}>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-center lg:text-start">
                                        {/* 1 */}
                                        <div>
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
                                                    onChange={(e) => setId(e.target.value)}

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
                                                    type="date"
                                                    className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                    id="startDate"
                                                    name="startDate"
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
                                                <label htmlFor="dropdown" className="block text-sm font-medium leading-6 text-gray-900">Project Nature:</label> <br />
                                                <select id="dropdown" className='w-full border p-2 rounded' name='nature' value={nature} onChange={(e) => setNature(e.target.value)}>
                                                    <option className='m-5' value="">Select</option>
                                                    {
                                                        projectNature.map((item, index) => (
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
                                                    onChange={(e) => setAttachments(e.target.files[0])}
                                                />
                                            </div>
                                        </div>

                                        {/* 2 */}
                                        <div>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="profile"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Profile:
                                                </label>
                                                <input
                                                    type="text"
                                                    className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                    id="profile"
                                                    name="profile"
                                                    value={profile}
                                                    onChange={(e) => setProfile(e.target.value)}

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
                                                    type="date"
                                                    className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                    id="delieveryDate"
                                                    name="deleiveryDate"
                                                    value={deleiveryDate}
                                                    onChange={(e) => setDeleiveryDate(e.target.value)}

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
                                                <label htmlFor="dropdown" className="block text-sm font-medium leading-6 text-gray-900">Department:</label> <br />
                                                <select id="dropdown" className='w-full border p-2 rounded' name='department' value={depart} onChange={(e) => setDepart(e.target.value)}>
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
                                                <label htmlFor="dropdown" className="block text-sm font-medium leading-6 text-gray-900">Platform:</label> <br />
                                                <select id="dropdown" className='w-full border p-2 rounded' name='platform' value={plat} onChange={(e) => setPlat(e.target.value)}>
                                                    <option className='m-5' value="">Select</option>
                                                    {
                                                        platform.map((item, index) => (
                                                            <option key={index} className='m-5' value={item.label}>{item.label}</option>
                                                        ))
                                                    }
                                                </select>
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
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}

                                        ></textarea>
                                    </div>

                                    <div className="flex justify-center my-10">
                                        <button type='submit' className="text-white w-full lg:w-1/3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                                {/* form end */}

                                {/* submit button */}
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

export default ProductionProjectDetail;