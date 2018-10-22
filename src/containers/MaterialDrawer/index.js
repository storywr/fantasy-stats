import React from 'react'

import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import styled from 'styled-components'
import Menu from 'material-ui/svg-icons/navigation/menu'

import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  text-decoration: none;
`

const MenuButton = styled(Menu)`
  margin-top: 32px;
  min-height: 50px;
  min-width: 50px;
  cursor: pointer;
`

export default class DrawerUndockedExample extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <MenuButton onClick={this.handleToggle} hoverColor='rgb(0, 188, 212)'/>
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <StyledLink to='/'><MenuItem onClick={this.handleClose}>Player News</MenuItem></StyledLink>
          <StyledLink to='/advanced'><MenuItem onClick={this.handleClose}>Player Stats</MenuItem></StyledLink>
          <StyledLink to='/scoring'><MenuItem onClick={this.handleClose}>Scoring Leaders</MenuItem></StyledLink>
          <StyledLink to='/draft'><MenuItem onClick={this.handleClose}>Draft</MenuItem></StyledLink>
        </Drawer>
      </div>
    );
  }
}