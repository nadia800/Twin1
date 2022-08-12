//import useState hook to create menu collapse state
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import '../scss/SlideBar.scss';

//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//import sidebar css from react-pro-sidebar module and our custom css 
import { MdOutlineSpaceDashboard, MdOutlineHistory, MdOutlineHelpOutline } from "react-icons/md";
import { CgImport } from "react-icons/cg";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineChartPie } from "react-icons/hi";
import { AiOutlineControl, AiOutlineBars, AiOutlineCloudUpload } from "react-icons/ai";

import "react-pro-sidebar/dist/css/styles.css";
import { Link } from 'react-router-dom';



const SlideBarMaster = () => {
    const location = useLocation()
    //create initial menuCollapse state using useState hook
    const [menuCollapse, setMenuCollapse] = useState(true)


    const renderTooltip = (nom) => (
        <Tooltip id="button-tooltip">
            {nom}
        </Tooltip>
    );

    return (
        <div className="slideBar">
            <div className="header" id="header">
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div className="header__closemenu">
                                <AiOutlineBars />
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <MenuItem style={{ flexGrow: 2 }} >
                            <div className="input-icons" >
                                <i className="fa fa-key icon">
                                </i>
                              
                            </div>
                        </MenuItem>
                        <Menu iconShape="square">
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip("Upload Project")}
                            >
                                <MenuItem icon={<AiOutlineCloudUpload />}>
                                    <Link to='/twinMaster' state={location.state}>
                                    </Link>
                                </MenuItem>
                            </OverlayTrigger>
                            
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip("Dashboard")}
                            >
                                <MenuItem icon={<MdOutlineSpaceDashboard />} >
                                    <Link to='/dashboard' state={location.state}>
                                    </Link>
                                </MenuItem>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip("Project Insights")}
                            >
                                <MenuItem icon={<HiOutlineChartPie />}>
                                    <Link to='/twin/projectInsights' state={location.state}>
                                    </Link>
                                </MenuItem>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip("Project Devices")}
                            >
                                <MenuItem icon={<AiOutlineControl />} >
                                    <Link to='/projectDevices' state={location.state}>
                                    </Link>
                                </MenuItem>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip("History logs")}
                            >
                                <MenuItem icon={<MdOutlineHistory />} >
                                    <Link to='/historyLogs' state={location.state}>
                                    </Link>
                                </MenuItem>
                            </OverlayTrigger>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip("Data Exports")}
                            >
                                <MenuItem icon={<CgImport />} >
                                    <Link to='/dataExports' state={location.state}>
                                    </Link>
                                </MenuItem>
                            </OverlayTrigger>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter>
                        <Menu iconShape="square">
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip("Help")}
                            >
                                <MenuItem icon={<MdOutlineHelpOutline />} ></MenuItem>
                            </OverlayTrigger>
                            
                        </Menu>
                    </SidebarFooter>
                </ProSidebar>
            </div>
        </div>
    );
};


export default SlideBarMaster;