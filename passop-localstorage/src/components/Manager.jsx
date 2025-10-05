import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  // const ref = useRef();
  const PasswordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast("Your text has been copied to clipboard", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      })
      .catch(() => {
        toast.error("Failed to copy text", {
          position: "top-right",
          autoClose: 3000,
        });
      });
  };

    const savePassword = () => {
        if(form.site.length >3 && form.username.length >3 &&form.password.length >3){

            setpasswordArray([...passwordArray, {...form, id: uuidv4()}])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            console.log([...passwordArray, form])
            setform({ site: "", username: "", password: "" })
            toast('Password saved!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    else{
        toast('Error: Password not saved!');
    }

    }

const deletePassword = (id) => {
  toast(
    ({ closeToast }) => (
      <div className="">
        <p>Do you really want to delete this password?</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              const newPasswords = passwordArray.filter((item) => item.id !== id);
              setpasswordArray(newPasswords);
              localStorage.setItem("passwords", JSON.stringify(newPasswords));
              closeToast();
              toast.success("Password deleted!");
            }}
            className="bg-red-500 px-3 py-1 rounded text-white"
          >
            Yes
          </button>
          <button
            onClick={closeToast}
            className="bg-gray-400 px-3 py-1 rounded text-white"
          >
            No
          </button>
        </div>
      </div>
    ),
    { autoClose: false }
  );
};

const editPassword = (id) => {
  const itemToEdit = passwordArray.find((item) => item.id === id);

  if (itemToEdit) {
    setform({
      site: itemToEdit.site,
      username: itemToEdit.username,
      password: itemToEdit.password,
    });

    // silently remove old entry without triggering toast
    const newPasswords = passwordArray.filter((item) => item.id !== id);
    setpasswordArray(newPasswords);
    localStorage.setItem("passwords", JSON.stringify(newPasswords));

    toast.info("Editing password... Make your changes and click Save", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
};


  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className="fixed inset-0 -z-10 min-h-screen w-full bg-green-800 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7a8d2b_100%)]"></div>
      <div className="p-4 md:p-6 max-w-7xl mx-auto md:mycontainer ">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          <span className="text-green-800">&lt;</span>
          Pass
          <span className="text-green-600">OP</span>
          <span className="text-green-800">/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg md:text-2xl text-center font-bold">
          Your own Password Manager
        </p>

        <div className=" flex flex-col p-4 text-black gap-5 items-center">
          <input
            className=" border border-green-500 rounded-full  p-5 py-1 w-full "
            onChange={handleChange}
            value={form.site}
            type="text"
            name="site"
            placeholder="Enter Website URL"
          />
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
              className=" border border-green-500 rounded-full  p-5 py-1 w-full"
              onChange={handleChange}
              value={form.username}
              type="text"
              name="username"
              placeholder="Enter Username"
            />
            <div className="relative ">
              <input
                className=" border border-green-500 rounded-full  p-5 py-1 w-full"
                ref={PasswordRef}
                onChange={handleChange}
                value={form.password}
                type="password"
                name="password"
                placeholder="Enter Password"
              />
              {/* <span
                className="absolute right-[3px] top-[3px] cursor-pointer"
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={27}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span> */}
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex gap-4  bg-green-500 hover:bg-green-400 justify-center items-center rounded-full px-5 py-2 w-fit"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords mt-6">
          <h2 className="font-bold text-xl md:text-2xl py-4 text-center">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <div className="overflow-x-auto">

            
            <table className="table-auto w-full min-w-[500px] rounded-xl overflow-hidden">
              <thead className="bg-green-700 text-white text-sm md:text-base">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Passwords</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-300 text-sm md:text-base">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={item.id}>
                      <td className="text-center py-2 border border-white">
                        <div className="flex items-center justify-center gap-2">
                          <a
                            href={item.site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="truncate max-w-[120px] md:max-w-none"
                          >
                            {item.site}
                          </a>
                          <div
                            className="loadiconcopy size-7 cursor-pointer "
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white px-2">
                        <div className="flex items-center justify-center gap-2 ">
                          <span className="truncate max-w-[100px] md:max-w-none">{item.username}</span>
                          <div
                            className="loadiconcopy size-7 cursor-pointer "
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-2 border border-white px-2">
                        <div className="flex items-center justify-center gap-2">
                          <span className="truncate max-w-[100px] md:max-w-none">{item.password}</span>
                          <div
                            className="loadiconcopy size-7 cursor-pointer "
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/xuoapdes.json"
                              trigger="hover"
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center text-center py-2 border border-white px-2">
                      <div className="flex justify-center gap-3">

                        
                        <span className="cursor-pointer mx-2" onClick={()=>{editPassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/fikcyfpp.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-2" onClick={()=>{deletePassword(item.id)}}>
                          <lord-icon
                            src="https://cdn.lordicon.com/xyfswyxf.json"
                            trigger="hover"
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            ></lord-icon>
                        </span>
                      </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
