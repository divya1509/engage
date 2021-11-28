import React from 'react'
import Drawer from './Drawer/Drawer'
import { FacultyDash, StudentDash } from '.'
import { useLocalContext } from '../Context/context'
import { Navigate } from 'react-router-dom';

function Home() {
    const { userType } = useLocalContext();

    return (
        <div>
            {
                userType === "" ? <Navigate to="/" /> : <>
                    <Drawer />
                    {
                        userType === "Faculty" ? <FacultyDash /> : <StudentDash />
                    }
                </>
            }


        </div>
    )
}

export default Home
