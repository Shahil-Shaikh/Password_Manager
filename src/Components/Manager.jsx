import React from 'react'

function Manager() {
    return (
        <div>

            <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:linear-gradient(180deg,#ffffff_0%,#c9f3f4_45%,#17bec5_100%)]"></div>


            <div className=' h-[calc(100dvh-3.75rem)] flex items-center '>
                {/* 3.75 rem is the height of the navbar and we minus it from the full viewport height */}
                <div className='inputs h-11/12 grow content_size bg-white rounded-4xl p-5 flex flex-col'>
                    {/*content_size is an applied directive see the index.css for it's definition  */}
                    {/* we are using flex-grow: 1 (i.e. "grow" in tailwind) in this item , flex-grow allows the item to grow as much as possible to cover entire available space */}

                    <div className='input_container flex flex-col items-center px-20 gap-y-2 mb-5'>
                        <input type="text" placeholder='Website URL' className='input_style' />
                        <input type="password" placeholder='Password' className='input_style' />
                        <button className='bg-green2 p-2 h-auto w-1/4 rounded-4xl text-2xl text-green1 font-normal'>Add Password</button>
                        {/* flex-direction: column stretches items to full width, while row usually limits them to content width. And so by default the input boxes and the button takes full width when we set the parent for flex direction as column*/}
                    </div>

                    <div className='h-1/4 bg-green2 grow rounded-4xl'>
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
