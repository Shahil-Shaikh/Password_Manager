import React from 'react'
import { useRef, useState, useEffect } from 'react'

function Manager() {
    const [PsswdValue, setPsswdValue] = useState("Show")
    const [form, setform] = useState({"site": "", "psswd": ""})
    const [_password_array, set_password_array] = useState([])

    
// const passowrds = localStorage.getItem("psswds") 
// dont put the above line here instead putting it inside the useEffect
    useEffect(() => {
        const passowrds = localStorage.getItem("psswds") 
        //this will fetch the passwords stored in the local storage 
        // and we are using useEffect so that it runs only once when the component is mounted 
        // and we can fetch the passwords from the local storage and set it in the state 
        // variable _password_array which we have declared for storing the passwords in the state.
        //NOTE: Put the const passowrds = localStorage.getItem("psswds")  line inside the useEffect because if we put 
        // it outside then it will run on every render and we don't want that as we only want to fetch the passwords 
        // from the local storage when the component is mounted for the first time and not on every render. 
        // So by putting it inside the useEffect with an empty dependency array, we ensure that it runs only once when the component is mounted and not on every render.
        // and it creates weird behaviour if we put that line outside useEffect, see the react_localstorage_debug_note.md

        if(passowrds){ //this means IF PASSWORD is present in the local storage or not 
            
            set_password_array(JSON.parse(passowrds))

            // we are parsing the passwords bcz when we store the passwords in the local 
            // storage we store it in the form of string and so when we fetch it we need 
            // to parse it to convert it back to the original format which is an array 
            // of objects in our case.
        }
    }, [])
    

    let handler = (e)=>{
        setform({...form, [e.target.name]: e.target.value})
    }

    const a = useRef()
    let psswdShowFun = () => {
        if(PsswdValue==="Show"){
            setPsswdValue("Hide")
            a.current.type="text"
        }
        else{
            setPsswdValue("Show")
        }
    }

    

    let submit = () => {
      console.log(form); 
        //   we can also now save it in the database using api call or we can also save it in the local storage of the browser.
        // Now if we are storing it in local storage then we can do it like this :
        // (first we will update password array and then we will update local storage)
        set_password_array([..._password_array, form])
        // by this we are pushing new password
        // here it is array so instead {} curly brackets we are using [] square ones
        localStorage.setItem("psswds", JSON.stringify([..._password_array, form]));
        // here we are setting the item in the local storage with the key "psswds" which will replace the old value and the value is 
        // the stringified version of the updated password array which includes the new password 
        // that we just added. We need to stringify it because local storage can only store strings.
        // NOTE: We could have use simply _password_array instead of [..._password_array, form] but we did not
        // cuz it takes some time for tha state of the password array to update and if we use _password_array 
        // then it will not include the new password that we just added and so we need to use the updated 
        // version of the password array which is [..._password_array, form] to make sure that we are 
        // storing the updated password array in the local storage. Otherwise the password stored will not 
        // be the updated one and it will be the old one without the new password that we just added.
        console.log(_password_array); 
        //although while doing console.log it won't just display the current state instantly cuz it takes some time to update hte array while in the mean time the console.log is done with its execution
    }
    

    return (
        <div>

            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:linear-gradient(180deg,#ffffff_0%,#c9f3f4_45%,#17bec5_100%)]"></div>


            <div className=' h-[calc(100dvh-3.75rem)] flex items-center '>
                {/* 3.75 rem is the height of the navbar and we minus it from the full viewport height */}
                <div className='inputs h-11/12 grow content_size bg-white rounded-4xl p-5 flex flex-col'>
                    {/*content_size is an applied directive see the index.css for it's definition  */}
                    {/* we are using flex-grow: 1 (i.e. "grow" in tailwind) in this item , flex-grow allows the item to grow as much as possible to cover entire available space */}

                    <div className='input_container flex flex-col items-center px-20 gap-y-2 mb-5 relative '>
                        <input name="site" value={form.site} onChange={handler} type="text" placeholder='Website URL' className='input_style' />
                        <input name="psswd" value={form.psswd} onChange={handler} ref={a} type={PsswdValue === "Show" ? "password" : "text"} placeholder='Password' className='input_style' />
                        {/* in order to change the show/hide in password input, we have used useState and as per showing the password
                        or hiding it actually we will simply change the type of input to text by referencing the input using useRef.

                        Now the initial value of PsswdValue while declaring it is set to Show and that when detected by the PsswdValue == "Show" condition
                        , it return the password which gets initialized inside type or else text is set when the condition gets false when the PsswdValue 
                        is set to "Hide" and as a result the type gets text. */}
                       
                        <span onClick={psswdShowFun} className=' font-semibold cursor-pointer text-green1 absolute top-20 right-24 text-sm hover:text-green-300 transition-colors duration-300 select-none'>
                            {PsswdValue}
                        </span>
                        <button onClick={submit} className='submit_button bg-green4 py-2 px-4 h-a00uto w-fit rounded-4xl text-2xl text-white font-normal flex items-center justify-center gap-x-2 hover:bg-green-300 hover:text-green-700 transition-colors duration-300'>
                            <lord-icon
                                src="https://cdn.lordicon.com/fgxwhgfp.json"
                                // this src defines  which icon to render.
                                trigger="hover"
                                target=".submit_button"
                                // target defines the element on which the trigger will work. Here we want the animation to trigger when we hover on the button, so we set the target as the button's class name that is submit_button.
                                colors="primary:#005461,secondary:#0c7779"
                                className="w-8 h-8">
                            </lord-icon>
                            <span>Add Password</span>
                        </button>
                        {/* flex-direction: column stretches items to full width, while row usually limits them to content width. And so by default the input boxes and the button takes full width when we set the parent for flex direction as column*/}
                    </div>

                    <div className='h-1/4 border-4 border-green4 grow rounded-4xl '>
                        {/* One thing to note here, if we open the dev options in browser in the below then this box resizes on the y axis automatically
                    by shrinking on the y axis. THis happens due to the having of flex-shrink: 1 peroperty which is the default property for flex items.  
                    setting it to 0 will stop resizing it.
                    But here setting it to 0 will still cause it to resize as the height is not fixed rather it is 1/4 th of the parent container*/}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manager
