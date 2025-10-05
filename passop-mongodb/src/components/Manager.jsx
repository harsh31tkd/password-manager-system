import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  // ✅ Fixed URL (was malformed before)
  const getPasswords = async () => {
    try {
      const req = await fetch("http://localhost:3000/");
      const passwords = await req.json();
      setPasswordArray(passwords);
    } catch (error) {
      console.error("Error fetching passwords:", error);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
  };

  const showPassword = () => {
    if (!passwordRef.current || !ref.current) return;
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      const newPassword = { ...form, id: uuidv4() };

      // ✅ Delete old password if editing
      if (form.id) {
        await fetch("http://localhost:3000/", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: form.id }),
        });
      }

      // ✅ Save new password
      setPasswordArray([...passwordArray, newPassword]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPassword),
      });

      // ✅ Reset form
      setForm({ site: "", username: "", password: "" });

      toast("Password saved!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    } else {
      toast("Error: Fill all fields properly!", { type: "error" });
    }
  };

  const deletePassword = async (id) => {
    if (window.confirm("Do you really want to delete this password?")) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));

      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      toast("Password deleted!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    const selected = passwordArray.find((item) => item.id === id);
    if (selected) {
      setForm(selected);
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer transition={Bounce} theme="dark" />
      <div className="fixed inset-0 -z-10 min-h-screen w-full bg-green-800 [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7a8d2b_100%)]"></div>

      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-800">&lt;</span>
          Pass
          <span className="text-green-600">OP</span>
          <span className="text-green-800">/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg md:text-2xl text-center font-bold">
          Your own Password Manager
        </p>

        {/* FORM */}
        <div className="flex flex-col p-4 text-black gap-5 items-center">
          <input
            className="border border-green-500 rounded-full p-3 w-full"
            onChange={handleChange}
            value={form.site}
            type="text"
            name="site"
            placeholder="Enter Website URL"
          />
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
              className="border border-green-500 rounded-full p-3 w-full"
              onChange={handleChange}
              value={form.username}
              type="text"
              name="username"
              placeholder="Enter Username"
            />
            <div className="relative w-full">
              <input
                className="border border-green-500 rounded-full p-3 w-full"
                ref={passwordRef}
                onChange={handleChange}
                value={form.password}
                type="password"
                name="password"
                placeholder="Enter Password"
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={showPassword}
              ></span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex gap-2 bg-green-500 hover:bg-green-400 justify-center items-center rounded-full px-6 py-2 w-fit text-white font-semibold"
          >
            <lord-icon
              src="https://cdn.lordicon.com/efxgwrkc.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>

        {/* PASSWORD TABLE */}
  <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{item.username}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex items-center justify-center '>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json"
                                                    trigger="hover" >
                                                </lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>

        </>
    )
}

export default Manager