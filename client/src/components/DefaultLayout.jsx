import React from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../resources/global.css';
import '../resources/Layout.css';

function DefaultLayout({children}) {
    const navigate = useNavigate();
    const[collapsed,setCollapsed] = useState(false);
    const {user} = useSelector(state => state.users);

    const userMenu = [
        {
            name:"Home",
            path:"/",
            icon:"ri-home-2-line"
        },
        {
            name:"Logout",
            path:"/logout",
            icon:"ri-logout-box-line"
        }
    ];
    const adminMenu = [
        {
            name:"Home",
            path:"/",
            icon:"ri-home-2-line"
        },
        {
            name:'Buses',
            path:"/admin/buses",
            icon:"ri-bus-line"
        },
        {
            name:"Logout",
            path:"/logout",
            icon:"ri-logout-box-line"
        }
    ];
    const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;;
  return (
    <>
    <h2 className='busTitle'>Welcome To Appy Bus</h2>
    <div className="layout-parent">
    <div className='sidebar'>
        <div className="sidebar-header">
            <h3 className='logo'>Appy Bus</h3>
            <p className='role'>{user?.name} <br/> Role:{user?.isAdmin ? 'Admin' : 'user'}</p>
        </div>
        <div className='d-flex flex-column gap-3 justify-content-start menu'>
            {menuToBeRendered.map((item,index) => {
                return <div className='menu-item'>
                    <i className={item.icon}></i>
                    {!collapsed && <span onClick={() => {
                        if(item.path === '/logout'){
                            localStorage.removeItem("token");
                            navigate("/login");
                        }else{
                            navigate(item.path)
                        }
                        }}>{item.name}</span>}
                    </div>
            })}
        </div>

    </div>
    <div className="body">
        <div className="header">
            {collapsed ? (<i class="ri-menu-line" onClick={() => setCollapsed(!collapsed)}></i>) : (<i class="ri-close-circle-line" onClick={() => setCollapsed(!collapsed)}></i>)}
        </div>
        <div className="content">
            {children}
        </div>
        </div>
    </div>
    </>
  )
}

export default DefaultLayout