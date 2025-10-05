"use client";
import React from "react";
import Lottie from "lottie-react";
import doctorAnimation from "./../../../public/images/contactus.json"; // json ফাইল public ফোল্ডারে রাখো

const ContactAnimation = () => {
  return (
    <div className="w-full ">
      <Lottie animationData={doctorAnimation} loop={true} />
    </div>
  );
};

export default ContactAnimation;
