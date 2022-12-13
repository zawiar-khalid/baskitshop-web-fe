import React, { useEffect, useState } from "react";
import { Col, Row } from 'antd';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";



import { Breadcrumb, Layout, Menu, theme } from 'antd';
import SidebarMze from "./sidebar_mzeki";
import Catbar from "./catbar";
import PosShop from "./shop";
import { Fab } from "@material-ui/core";




const { Content, Sider } = Layout;
const helper = require("../../helper");
const moment = require("moment");




export default (props) => {
  
  return (

    <div className="content-wrapper" style={{ backgroundColor: "#ffff" , height : 300 }}>
    
        
     

    <Content>


 
      {/* Content Header (Page header) */}

    
<Col>

 <Row span={22}><PosShop/></Row>
 <Row span={2}>
 <div className="fixed-right">
 <Fab color="#E89B4C" aria-label="add">
 <ShoppingCartIcon />

</Fab>
</div>
</Row>

   
 </Col>
 




        
   
</Content> 
      </div>
   

  
  );
};
