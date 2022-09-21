import React, { createContext, useState, useEffect } from "react";

export const UserDataContext = createContext();

export const UserDataStorage = function (props) {
  const savedUserData = JSON.parse(localStorage.getItem("savedUserData"));
  const emptyValues = {
    cpi: 0,
    adBudget: 0,
    usersAcquired: 0,
    userOutflow: 0,
    userInvites: 0,
    adCpm: 0,
    dailyAdsPerUser: 0,
    adCpc: 0,
    clickingUsers: 0,
    appPrice: 0,
    googleFee: 0,
    buyingUsers: 0,
  };
  const [userData, setUserData] = useState(
    savedUserData ? savedUserData : emptyValues
  );

  const updateData = (e) =>
    setUserData({
      ...userData,
      [e.target.name]: parseFloat(e.target.value),
    });
  const resetData = () => setUserData(emptyValues);

  useEffect(() => {
    localStorage.setItem("savedUserData", JSON.stringify(userData));
  });

  return (
    <UserDataContext.Provider value={{ userData, updateData, resetData }}>
      {props.children}
    </UserDataContext.Provider>
  );
};
