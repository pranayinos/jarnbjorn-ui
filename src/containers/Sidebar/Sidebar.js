import React, { Component } from 'react';
import { connect } from 'react-redux';
import clone from 'clone';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';
import options from './options';
import Scrollbars from '../../components/utility/customScrollBar.js';
import Menu from '../../components/uielements/menu';
import IntlMessages from '../../components/utility/intlMessages';
import SidebarWrapper from './sidebar.style';
import appActions from '../../redux/app/actions';
import Logo from '../../components/utility/logo';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;

const {
  toggleOpenDrawer,
  changeOpenKeys,
  changeCurrent,
  toggleCollapsed,
} = appActions;
const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.onOpenChange = this.onOpenChange.bind(this);
  }
  handleClick(e) {
    this.props.changeCurrent([e.key]);
    if (this.props.app.view === 'MobileView') {
      setTimeout(() => {
        this.props.toggleCollapsed();
        this.props.toggleOpenDrawer();
      }, 100);
    }
  }
  onOpenChange(newOpenKeys) {
    const { app, changeOpenKeys } = this.props;
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    changeOpenKeys(nextOpenKeys);
  }
  getAncestorKeys = key => {
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  };
  getMenuItem = ({ singleOption, submenuStyle, submenuColor }) => {
    const { key, label, leftIcon, children } = singleOption;
    const url = stripTrailingSlash(this.props.url);
    if (children) {
      return (
        <SubMenu
          key={key}
          title={
            <span className="isoMenuHolder" style={submenuColor}>
              <i className={leftIcon} />
              <span className="nav-text">
                <IntlMessages id={label} />
              </span>
            </span>
          }
        >
          {children.map(child => {
            const linkTo = child.withoutDashboard
              ? `/${child.key}`
              : `${url}/${child.key}`;
            return (
              <Menu.Item style={submenuStyle} key={child.key}>
                <Link style={submenuColor} to={linkTo}>
                  <IntlMessages id={child.label} />
                </Link>
              </Menu.Item>
            );
          })}
        </SubMenu>
      );
    }
    return (
      <Menu.Item key={key}>
        <Link to={`${url}/${key}`}>
          <span className="isoMenuHolder" style={submenuColor}>
            <i className={leftIcon} />
            <span className="nav-text">
              <IntlMessages id={label} />
            </span>
          </span>
        </Link>
      </Menu.Item>
    );
  };
  render() {
    const { app, toggleOpenDrawer, customizedTheme, height } = this.props;
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = event => {
      if (openDrawer === false) {
        toggleOpenDrawer();
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        toggleOpenDrawer();
      }
      return;
    };
    const styling = {
      backgroundColor: customizedTheme.backgroundColor,
    };
    const submenuStyle = {
      backgroundColor: 'rgba(0,0,0,0.3)',
      color: customizedTheme.textColor,
    };
    const submenuColor = {
      color: customizedTheme.textColor,
    };
    return (
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width="240"
          className="isomorphicSidebar"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={styling}
        >
          <Logo collapsed={collapsed} />
          <Scrollbars style={{ height: height - 70 }}>
            <Menu
              onClick={this.handleClick}
              theme="dark"
              className="isoDashboardMenu"
              mode={mode}
              openKeys={collapsed ? [] : app.openKeys}
              selectedKeys={app.current}
              onOpenChange={this.onOpenChange}
            >
               <SubMenu
                key="delivery"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-android-cart" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.delivery" />
                    </span>
                  </span>
                }
              >
                  <Menu.Item style={submenuStyle} key="delivery">
                    <Link to="/dashboard/delivery" >
                      <IntlMessages id="sidebar.newDelivery" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item style={submenuStyle} key="deliveries">
                    <Link to="/dashboard/deliveries" >
                      <IntlMessages id="sidebar.deliveries" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item style={submenuStyle} key="invoices">
                    <Link to="/dashboard/invoices" >
                      <IntlMessages id="sidebar.invoices" />
                    </Link>
                  </Menu.Item>
              </SubMenu>
              <SubMenu
                key="accounts"
                title={
                  <span className="isoMenuHolder" style={submenuColor}>
                    <i className="ion-ios-person-outline" />
                    <span className="nav-text">
                      <IntlMessages id="sidebar.accounts" />
                    </span>
                  </span>
                }
              >
                  <Menu.Item style={submenuStyle} key="tools">
                    <Link to="/dashboard/blank_page" >
                      <IntlMessages id="sidebar.tools" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item style={submenuStyle} key="settings">
                    <Link to="/dashboard/blank_page" >
                      <IntlMessages id="sidebar.settings" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item style={submenuStyle} key="wallet">
                    <Link to="/dashboard/blank_page" >
                      <IntlMessages id="sidebar.wallet" />
                    </Link>
                  </Menu.Item>
              </SubMenu>

               {options.map(singleOption =>
                this.getMenuItem({ submenuStyle, submenuColor, singleOption })
              )}
            </Menu>
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
  }
}

export default connect(
  state => ({
    app: state.App.toJS(),
    customizedTheme: state.ThemeSwitcher.toJS().sidebarTheme,
    height: state.App.toJS().height,
  }),
  { toggleOpenDrawer, changeOpenKeys, changeCurrent, toggleCollapsed }
)(Sidebar);
