
"use client";

import { useState } from "react";
import { Settings, User, Mail, Pencil, Check, Lock } from "lucide-react";
import css from "./Profile.module.css";

interface AccountUser {
  id: string;
  name?: string | null;
  firstName?: string;
  lastName?: string;
  email?: string;
}

const Profile = ({ user }: { user: AccountUser }) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");

  const handleSave = () => {
    // Здесь будет ваша логика отправки новых данных на бэкенд (API)
    console.log("Сохраняем новое имя:", firstName, lastName);
    setIsEditingName(false); 
  };

  return (
    <div className={css.container}>
      
      {/* ЗАГОЛОВОК */}
      {/* <div className={css.header}> */}
        {/* <Settings size={28} className="text-[#041e3a]" /> */}
        <h2 className={css.title}>Personal Information</h2>
      {/* </div> */}

      <div className={css.form}>
        
        {/* ПОЛЕ: ИМЯ */}
        <label className={css.label}>
          <span className={css.labelText}>
            <User size={16} /> 
            First Name
          </span>
          <div className={css.inputContainer}>
            <input
              type="text"
              className={css.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={!isEditingName} 
            />
            
            <button 
              type="button"
              className={css.editBtn} 
              onClick={() => isEditingName ? handleSave() : setIsEditingName(true)}
              aria-label="Edit Name"
              title={isEditingName ? "Save Name" : "Edit Name"}
            >
              {isEditingName ? <Check size={18} className="text-green-600" /> : <Pencil size={18} />}
            </button>
          </div>
        </label>

        {/* ПОЛЕ: ФАМИЛИЯ */}
        <label className={css.label}>
          <span className={css.labelText}>
            <User size={16} /> 
            Last Name
          </span>
          <div className={css.inputContainer}>
            <input
              type="text"
              className={css.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!isEditingName} 
            />
            
            <button 
              type="button"
              className={css.editBtn} 
              onClick={() => isEditingName ? handleSave() : setIsEditingName(true)}
              aria-label="Edit Name"
              title={isEditingName ? "Save Name" : "Edit Name"}
            >
              {isEditingName ? <Check size={18} className="text-green-600" /> : <Pencil size={18} />}
            </button>
          </div>
        </label>

        {/* ПОЛЕ: EMAIL (Только для чтения) */}
        <label className={css.label}>
          <span className={css.labelText}>
            <Mail size={16} /> 
            Email Address
          </span>
          <div className={css.inputContainer}>
            <input
              type="email"
              className={css.input}
              value={user.email || ""}
              disabled 
            />
            <button 
              type="button"
              className={css.editBtn} 
              aria-label="Email cannot be changed here"
              title="Contact support to change email"
              disabled
            >
              {/* Заменили полупрозрачный карандаш на красивый замочек */}
              <Lock size={16} className="opacity-40" />
            </button>
          </div>
        </label>

        {/* Кнопка сохранения */}
        {isEditingName && (
          <button className={css.saveBtn} onClick={handleSave}>
            Save Changes
          </button>
        )}

      </div>
    </div>
  );
};

export default Profile;