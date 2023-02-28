import React, {useState} from 'react';
import {Menu, Layout} from "antd";
import { NavLink} from "react-router-dom";
import {
    AntDesignOutlined,
    DashboardOutlined, FormOutlined, OrderedListOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const items = [
    {
        key: '/dashboard',
        label:  <NavLink to='/dashboard'>Dashboard</NavLink>,
        icon: <DashboardOutlined />
    },
    {
        key: 'dropdown',
        label:  'Dropdown',
        icon: <AntDesignOutlined />,
        children: [
            {
                key: '/dashboard/category-create',
                label:  <NavLink to='/dashboard/category-create'>Item 1</NavLink>,
                icon: <FormOutlined />,
            },
            {
                key: '/dashboard/category-list',
                label:  <NavLink to='/dashboard/category-list'>Item 2</NavLink>,
                icon: <OrderedListOutlined />,
            }
        ]
    },
]

const SideMenuBar = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider theme='light' collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <Menu defaultSelectedKeys={window.location.pathname} items={items} mode="inline" className='mt-2'/>
        </Sider>
    );
};

export default SideMenuBar;