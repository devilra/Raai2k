import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtect = ({ children }) => {
  // Redux State-இல் இருந்து Admin details-ஐ எடுக்கவும்
  const { admin, isLoading } = useSelector((state) => state.admin);

  // Local Storage-இல் admin data இருக்கிறதா என சரிபார்க்கவும்
  const localAdmin = localStorage.getItem("admin");

  // ----------------------------------------------------
  // 1. Initial Loading State (Session Check நடக்கும்போது)
  // ----------------------------------------------------

  if (isLoading) {
    // isLoading இருக்கும் போது ஒரு Loading Screen-ஐக் காட்டலாம்.
    // இது வேகமான UX-க்காக Local Storage-இல் Admin இருக்கும்போது தேவையில்லை,
    // ஆனால் Server-ஐ சரிபார்க்கும் போது பிழை வராமல் இருக்க நல்லது
    return <div>Verifying Admin Session...</div>;
  }

  // ----------------------------------------------------
  // 2. Authentication Check (Login ஆகவில்லை என்றால்)
  // ----------------------------------------------------

  if (!admin && !localAdmin) {
    // Login Page-க்கு திருப்பி அனுப்பவும் (Redirect)
    // state: { from: location } கொடுப்பது, login செய்த பிறகு அதே page-க்கு திரும்ப உதவும்.
    return <Navigate to="/auth/login" replace />;
  }

  // ----------------------------------------------------
  // 3. Authenticated (Login ஆகிவிட்டார்)
  // ----------------------------------------------------

  // children props அல்லது Outlet மூலமாக protected content-ஐக் காட்டவும்
  // Outlet - Layout-க்குள் Sub-Route-களைக் காட்ட
  // children - Single element-ஐக் காட்ட (உதாரணமாக, <AdminProtect><Dashboard /></AdminProtect>)

  return children ? children : <Outlet />;
};

export default AdminProtect;
