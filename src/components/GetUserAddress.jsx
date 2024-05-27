import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useState } from "react";
import { setError } from "@/lib/features/error/errorSlice";
import { setAddress as setReduxAddress } from "@/lib/features/user/userSlilce";
import { userRequest } from "@/utils/axiosRequestMethods";
import { countries } from "@/utils/dummyData";

export default function GetUserAddress({ isOpen, setModal, prevAdd }) {
  const user = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();

  const [address, setAddress] = useState(
    prevAdd || {
      street: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      mobile: user?.number || "",
    }
  );

  const handle = {
    onChange: (e) => {
      setAddress({ ...address, [e.target.name]: e.target.value });
    },
    onSubmit: async (e) => {
      e.preventDefault();
      try {
        const q = prevAdd ? "update=true" : "";
        const { data } = await userRequest.post(`/api/user/address?${q}`, address);
        console.log(data);
        if (data.ok) {
          dispatch(setReduxAddress(address));
          dispatch(setError("Address successfully updated"));
        }
      } catch (error) {
        dispatch(setError(error?.response?.data?.message));
      }
      setModal(false);
      console.log(address);
    },
  };

  return (
    <Modal isOpen={isOpen}>
      <form onSubmit={handle.onSubmit} className="font-Urbanist flex flex-col gap-2">
        <label htmlFor="street" className="text-xl font-semibold block">
          Street
        </label>
        <input
          type="text"
          name="street"
          id="street"
          placeholder="enter street"
          value={address.street}
          onChange={handle.onChange}
          className="p-2 text-xl w-full border border-[#ccc] rounded-md focus:border-[#555]"
          required
        />
        <label htmlFor="city" className="text-xl font-semibold block">
          City
        </label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="enter city"
          value={address.city}
          onChange={handle.onChange}
          className="p-2 text-xl w-full border border-[#ccc] rounded-md focus:border-[#555]"
          required
        />
        <label htmlFor="state" className="text-xl font-semibold block">
          State
        </label>
        <input
          type="text"
          name="state"
          id="state"
          placeholder="enter state"
          value={address.state}
          onChange={handle.onChange}
          className="p-2 text-xl w-full border border-[#ccc] rounded-md focus:border-[#555]"
          required
        />
        <label htmlFor="zip" className="text-xl font-semibold block">
          Zip
        </label>
        <input
          type="text"
          name="zip"
          id="zip"
          placeholder="enter zip code"
          value={address.zip}
          onChange={handle.onChange}
          className="p-2 text-xl w-full border border-[#ccc] rounded-md focus:border-[#555]"
          required
        />
        <label htmlFor="country" className="text-xl font-semibold block">
          Country
        </label>
        <select
          type="text"
          name="country"
          id="country"
          value={address.country}
          onChange={handle.onChange}
          className="p-2 text-xl w-full border border-[#ccc] rounded-md focus:border-[#555]"
          required
          autoComplete="true"
        >
          <option value="" hidden>
            Select a country
          </option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <label htmlFor="mobile" className="text-xl font-semibold block">
          Mobile Number
        </label>
        <input
          type="tel"
          name="mobile"
          id="mobile"
          placeholder="enter mobile number"
          value={address.mobile}
          onChange={handle.onChange}
          className="p-2 text-xl w-full border border-[#ccc] rounded-md focus:border-[#555]"
          required
        />
        <div className="flex gap-3">
          <button type="submit" className="bg-[#555] text-[#fff] text-xl py-2 px-5 border-none rounded-md hover:bg-[#777]">
            {prevAdd ? "Update" : "Submit"}
          </button>
          <button type="reset" onClick={() => setModal(false)} className="bg-[#555] text-[#fff] text-xl py-2 px-5 border-none rounded-md hover:bg-[#777]">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}