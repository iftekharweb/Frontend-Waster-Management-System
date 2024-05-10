import axios from "axios";
import React, { useState } from "react";

const CreateThirdPartyContractors = ({ initial, handleAdding }) => {
  const [contractor, setContractor] = useState(initial);

  const createContractor = async () => {
    try {
      const res = await axios.post(
        `http://127.0.0.1:8000/third-party-contractors/`,
        contractor,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="w-[60%] flex flex-col justify-center item-center py-5 mx-5 ">
          <div className="flex justify-center items-center px-4 w-full">
            <p className="font-semibold text-3xl py-3">Create Contractor</p>
          </div>
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-[#03C9D7]"
            type="text"
            placeholder="Name of Company"
            value={contractor.name}
            onChange={(e) =>
              setContractor({ ...contractor, name: e.target.value })
            }
          />
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-[#03C9D7]"
            type="text"
            placeholder="Contract ID"
            value={contractor.contract_id}
            onChange={(e) =>
              setContractor({
                ...contractor,
                contract_id: e.target.value,
              })
            }
          />
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-[#03C9D7]"
            type="text"
            placeholder="Registration ID"
            value={contractor.reg_id}
            onChange={(e) =>
              setContractor({
                ...contractor,
                reg_id: e.target.value,
              })
            }
          />
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-[#03C9D7]"
            type="text"
            placeholder="TIN of Company"
            value={contractor.tin}
            onChange={(e) =>
              setContractor({ ...contractor, tin: e.target.value })
            }
          />
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-[#03C9D7]"
            type="text"
            placeholder="Contact Number"
            value={contractor.contact_number}
            onChange={(e) =>
              setContractor({
                ...contractor,
                contact_number: e.target.value,
              })
            }
          />
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-[#03C9D7]"
            type="text"
            placeholder="Contact Number"
            value={contractor.contact_number}
            onChange={(e) =>
              setContractor({
                ...contractor,
                contact_number: e.target.value,
              })
            }
          />
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-[#03C9D7]"
            type="number"
            placeholder="Workforce Size"
            value={contractor.workforce_size}
            onChange={(e) =>
              setContractor({
                ...contractor,
                workforce_size: e.target.value,
              })
            }
          />
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-[#03C9D7]"
            type="number"
            placeholder="Payment Per Ton"
            value={contractor.payment_per_ton}
            onChange={(e) =>
              setContractor({
                ...contractor,
                payment_per_ton: e.target.value,
              })
            }
          />
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-[#03C9D7]"
            type="number"
            placeholder="Waste per day"
            value={contractor.waste_per_day}
            onChange={(e) =>
              setContractor({
                ...contractor,
                waste_per_day: e.target.value,
              })
            }
          />
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-[#03C9D7]"
            type="number"
            placeholder="Contruct Duration"
            value={contractor.contruct_duration}
            onChange={(e) =>
              setContractor({
                ...contractor,
                contruct_duration: e.target.value,
              })
            }
          />
          <input
            className="w-full text-black py-2 my-1 bg-transparent border-b-2 outline-none focus:outline-none focus:border-[#03C9D7]"
            type="number"
            placeholder="Area of Collection"
            value={contractor.area_of_collection}
            onChange={(e) =>
              setContractor({
                ...contractor,
                area_of_collection: e.target.value,
              })
            }
          />

          <div className="flex flex-col justify-center items-center">
            <button
              onClick={() => createContractor(company.id)}
              className="w-full py-2 my-3 bg-[#03C9D7] rounded-md text-white hover:bg-[#1e666b]"
            >
              Create
            </button>
            <button
              onClick={handleAdding}
              className="p-2 text-red-400 hover:text-red-600 font-semibold"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateThirdPartyContractors;
