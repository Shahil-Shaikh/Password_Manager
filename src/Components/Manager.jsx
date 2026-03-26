import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';

function Manager() {
    const [PsswdValue, setPsswdValue] = useState("Show")
    const [form, setform] = useState({ "site": "", "psswd": "" }) //form is am object
    const [_password_array, set_password_array] = useState([])


    useEffect(() => {
        const passowrds = localStorage.getItem("psswds")

        if (passowrds) {

            set_password_array(JSON.parse(passowrds))
        }
    }, [])


    let handler = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const a = useRef()
    let psswdShowFun = () => {
        if (PsswdValue === "Show") {
            setPsswdValue("Hide")
            a.current.type = "text"
        }
        else {
            setPsswdValue("Show")
        }
    }



    let submit = () => {
        console.log(form);

        set_password_array([..._password_array, { ...form, id: uuidv4() }])

        localStorage.setItem("psswds", JSON.stringify([..._password_array, { ...form, id: uuidv4() }]));

        console.log(_password_array);
        setform({ site: "", psswd: "" })
    }



    let deletePsswd = (id) => {
        let check = confirm("Are you sure to delete it?");
        if (check) {

            set_password_array(_password_array.filter((item) => {
                return id !== item.id;
            }))
            
            localStorage.setItem("psswds", JSON.stringify(
                _password_array.filter((item) => {
                    return id !== item.id;
                })
            ));
        }

    }


    let editPsswd = (id) => {
        setform(_password_array.filter((item) => {
            return id == item.id;
        })[0])
        set_password_array(_password_array.filter((item) => {
            return id !== item.id;
        }))
    }

    return (
        <div>

            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:linear-gradient(180deg,#ffffff_0%,#c9f3f4_45%,#17bec5_100%)]"></div>


            <div className='container_for_inputs_box_invisible h-[calc(100dvh-3.75rem)] flex items-center '>
                <div className='inputs_box_visible_rounded_rectangle h-11/12 grow content_size bg-white rounded-4xl p-5 flex flex-col'>

                    <div className='input_container flex flex-col items-center px-20 gap-y-2 mb-5 relative '>
                        <input name="site" value={form.site} onChange={handler} type="text" placeholder='Website URL' className='input_style' />
                        <input name="psswd" value={form.psswd} onChange={handler} ref={a} type={PsswdValue === "Show" ? "password" : "text"} placeholder='Password' className='input_style' />

                        <span onClick={psswdShowFun} className=' font-semibold cursor-pointer text-green1 absolute top-20 right-24 text-sm hover:text-green-300 transition-colors duration-300 select-none'>
                            {PsswdValue}
                        </span>
                        <button onClick={submit} className='submit_button bg-green4 py-2 px-4 h-a00uto w-fit rounded-4xl text-2xl text-white font-normal flex items-center justify-center gap-x-2 hover:bg-green-300 hover:text-green-700 transition-colors duration-300'>
                            <lord-icon
                                src="https://cdn.lordicon.com/fgxwhgfp.json"
                                trigger="hover"
                                target=".submit_button"
                                colors="primary:#005461,secondary:#0c7779"
                                className="w-8 h-8">
                            </lord-icon>
                            <span>Add Password</span>
                        </button>
                    </div>

                    <div className='h-1/4 border-4 border-green4 grow  w-full overflow-y-auto'>

                        {_password_array.length == 0 && <div className='w-full h-full text-center py-12'>No passwords to show</div>}

                        {_password_array.length != 0 &&

                            <table className="table-auto  w-full h-full   text-center">
                                <thead className='bg-green4 text-green1'>
                                    <tr>
                                        <th>Sites</th>
                                        <th>Passwords</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='px-1.5 text-white font-medium bg-green2'>
                                    {_password_array.map((item, index) => {
                                        return <tr key={index}>
                                            <td className='py-2 border border-white'><a href={item.site} target='_blank'>{item.site}</a></td >
                                            <td className='py-2 border border-white'>{item.psswd}</td >
                                            <td className='py-2 border border-white'>


                                                <lord-icon onClick={() => { editPsswd(item.id) }}
                                                    src="https://cdn.lordicon.com/exymduqj.json"
                                                    trigger="hover"
                                                    colors="primary:#121331,secondary:#ffffff"
                                                    className="w-7">
                                                </lord-icon>


                                                <lord-icon onClick={() => { deletePsswd(item.id) }}
                                                    src="https://cdn.lordicon.com/jzinekkv.json"
                                                    trigger="hover"
                                                    colors="primary:#121331,secondary:#ffffff"
                                                    className="w-7">
                                                </lord-icon>


                                            </td >
                                        </tr>
                                    })}


                                </tbody>
                            </table>
                        }

                    </div>



                </div>
            </div>
        </div>
    )
}

export default Manager
