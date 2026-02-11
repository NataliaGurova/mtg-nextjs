
// import React from "react";
import Image from "next/image";
import css from "./Loader.module.css";

const Loader = () => {
  
  return (
    <div className={css.loaderContainer}>
      <div className={`${css.circle} ${css.white}`}></div>
      <div className={`${css.circle} ${css.green}`}></div>
      <div className={`${css.circle} ${css.blue}`}></div>
      <div className={`${css.circle} ${css.red}`}></div>
      <div className={`${css.circle} ${css.black}`}>
        <Image
          src="/color/black.png"
          alt="Spinner"
          width={28}
          height={28}
          className={css.imgColor}
          title="Black"
        />
        {/* <div className={css.loaderText}>Loading...</div> */}
      </div>
    </div>
  );
};

export default Loader;