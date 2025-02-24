import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
  const router = useRouter();
    return (
      <div
        className="offcanvas offcanvas-start ${styles['custom-sidebar']}"  
        tabIndex={-1}
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel">
        <button
            id='closeButton'
            type="button"
            className="btn-close d-md-none"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            ></button>
        <div className="offcanvas-header">
          <div className="d-flex w-100">    
          <Image 
              src="/images/Logo.png" 
              alt="Logo" 
              width={250} 
              height={225} 
              priority 
            />
          </div>        
        </div>
        <div className="offcanvas-body ">
          <ul className="nav flex-column">
            <li className="nav-item"> 
              <a className="nav-link text-dark" style={{ cursor: "pointer" }}  onClick={() => router.push("/HomePage")}>Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#actividades">Actividades</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#perfil">Mi Perfil</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" style={{ cursor: "pointer" }} onClick={() => router.push("/Recursos")}>Recursos</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark" href="#soporte">Soporte</a>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default Sidebar;