import React, { useEffect, useState } from "react";
import axios from "axios";

import { useStateContext } from "../contexts/ContextProvider";

import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { MdDelete, MdEditDocument } from "react-icons/md";

const ContractorManager = () => {
  const { authToken } = useStateContext();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [idToEdit, setIdToEdit] = useState(null);
  const [role, setRole] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [contractor, setContractor] = useState("");
  const [allContractors, setAllContractors] = useState([]);
  const [TPCID, setTPCID] = useState(null);
  const [selectedArea, setSelectedArea] = useState("");

  const [access_level, setAccessLevel] = useState("");
  const [contact_number, setContactNumber] = useState("");

  const filteredUsers = users.filter(
    (user) =>
      user.user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/contractor-managers/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (res.data) {
        setUsers(res.data);
      } else {
        console.error("Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchContractors = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASEURL}/third-party-contractors/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (res.data) {
        setAllContractors(res.data);
        setSelectedArea(res.data[0].Location);
      } else {
        console.error("Failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authToken === "") {
      navigate("/");
      return;
    }
    fetchUsers();
    fetchContractors();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BASEURL}/contractor-managers/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
    fetchUsers();
  };

  const changeUserData = async (id) => {
    try {
      console.log(role);
      const res = await axios.patch(
        `${import.meta.env.VITE_BASEURL}/contractor-managers/${id}/`,
        {
          contact_number: contact_number,
          assigned_contractor_company : TPCID,
          access_level: access_level
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setIdToEdit(null);
      setContractor("");
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const obj = allContractors.filter((x) => x.Location === selectedArea);
    setTPCID(obj[0]?.id);
  }, [selectedArea]);

  const handleEdit = (user) => {
    setIdToEdit(user.user.id);
    //setAllContractors(user.sts);
  };

  const nullIdToEdit = () => {
    setIdToEdit(null);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className="w-full h-full flex flex-col">
        <div className="w-full flex flex-row justify-between items-center px-5">
          <h1 className="text-3xl font-semibold">Contrator Managers</h1>
          <div className="flex flex-row justify-end items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border-2 border-[#03C9D7] focus:border-[#03C9D7] focus:outline-none rounded-md"
            />
          </div>
        </div>

        <div className="w-full px-5 py-7 flex flex-col justify-start item-center">
          {/* table Header*/}
          <div className="flex flex-row justify-evenly items-center border-2 border-[#03C9D7] rounded-md p-2 font-semibold text-lg mb-2">
            <div className="w-1/4 flex justify-center items-center">
              <span>Full Name</span>
            </div>
            <div className="w-1/4 flex justify-center items-center">
              <span>Email Address</span>
            </div>
            <div className="w-1/4 flex justify-center items-center">
              <span>Contractor Company ID</span>
            </div>
            <div className="w-1/4 flex justify-center items-center">
              <FaArrowAltCircleDown className="text-xl text-[#03C9D7]" />
            </div>
          </div>

          {/* table Header*/}
          {filteredUsers.map((user) => (
            <>
              <div
                className="flex flex-row justify-evenly items-center py-2 border-l-4 my-2 border-[#03C9D7] bg-gray-50 rounded-sm"
                key={user.id}
              >
                <div className="w-1/4 flex justify-center items-center">
                  <span>
                    {user.user.first_name} {user.user.last_name} {!user.user.first_name && !user.user.last_name && "-"}
                  </span>
                </div>
                <div className="w-1/4 flex justify-center items-center">
                  <span>{user.user.email}</span>
                </div>
                <div className="w-1/4 flex justify-center items-center">
                  <span>
                    {user.assigned_contractor_company
                      ? user.assigned_contractor_company
                      : "-"}
                  </span>
                </div>
                <div className="w-1/4 flex justify-center items-center">
                  <div className="flex flex-row justify-between items-center">
                    <button
                      className="px-5 text-2xl text-sky-500 hover:text-sky-800"
                      onClick={() => handleEdit(user)}
                    >
                      <MdEditDocument />
                    </button>
                    <button
                      className="px-5 text-2xl text-red-500 hover:text-red-800"
                      onClick={() => handleDelete(user.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              </div>
              {idToEdit === user.user.id && (
                <div className="w-full flex justify-center items-center">
                  <div className="w-[50%] flex flex-col justify-center item-center py-5 mx-5">
                    <div className="flex justify-center items-center px-4 w-full py-2">
                      <p className="font-semibold">Update Manager Info</p>
                    </div>
                    <div>
                    <input
                        className="w-full text-black py-2 my-2 bg-transparent border-b-2 outline-none focus:outline-none focus:border-[#03C9D7]"
                        type="text"
                        placeholder="Contact Number"
                        value={contact_number}
                        onChange={(e) => setContactNumber(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex justify-center items-center">
                      <select
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                        className="mx-4 p-2 w-full border-1 border-[#03C9D7] focus:border-2 focus:border-[#03C9D7] rounded-lg"
                      >
                        {allContractors.map((one) => (
                          <option key={one.id} value={one.name}>
                            {one.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <input
                        className="w-full text-black py-2 my-2 bg-transparent border-b-2 outline-none focus:outline-none focus:border-[#03C9D7]"
                        type="text"
                        placeholder="Access Level"
                        value={access_level}
                        onChange={(e) => setAccessLevel(e.target.value)}
                        required
                      />
                    </div>

                    <div className="flex flex-row justify-center items-center">
                      <button
                        onClick={() => changeUserData(user.id)}
                        className="p-2 text-sky-400 hover:text-sky-600 font-semibold"
                      >
                        Update
                      </button>
                      <button
                        onClick={nullIdToEdit}
                        className="p-2 text-red-400 hover:text-red-600 font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractorManager;
