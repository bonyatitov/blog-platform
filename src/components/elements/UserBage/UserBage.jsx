import React from 'react';
import { DownOutlined, UserOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons';
import { Dropdown, Space, Avatar } from 'antd';
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { useHistory } from 'react-router-dom'; 
import './user-bage.css';

const UserBage = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory(); 
  const userName = user?.username || 'Пользователь';

  const items = [
    {
      key: '1',
      label: 'Create Article',
      icon: <EditOutlined />,
      onClick: () => history.push('/new-article'),
    },
    {
      key: '2',
      label: 'Edit Profile',
      icon: <SettingOutlined />,
      onClick: () => history.push('/edit-profile'), 
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: 'Log Out',
      icon: <UserOutlined />,
      onClick: () => dispatch(logout()), 
    },
  ];

  return (
    <div className="user-bage">
      <Dropdown menu={{ items }} trigger={['hover']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {userName}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      {user?.image ? (
        <Avatar size={40} src={user.image} style={{ marginRight: 8 }} />
      ) : (
        <Avatar size={40} icon={<UserOutlined />} style={{ marginRight: 8 }} />
      )}
    </div>
  );
};

export default UserBage;