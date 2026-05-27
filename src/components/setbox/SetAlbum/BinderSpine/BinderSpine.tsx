"use client";

import css from "./BinderSpine.module.css";

const BinderSpine = () => {
  return (
    <div className={css.spineContainer}>
      <div className={css.spineMaterial}>
        {/* Три металлических кольца биндера */}
        <div className={css.ringWrapper}>
          <div className={css.ring} />
        </div>
        <div className={css.ringWrapper}>
          <div className={css.ring} />
        </div>
        <div className={css.ringWrapper}>
          <div className={css.ring} />
        </div>
      </div>
    </div>
  );
};

export default BinderSpine;