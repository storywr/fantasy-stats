import React from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components'
import Menu from 'material-ui/svg-icons/navigation/menu'
import Divider from 'material-ui/Divider';

import { Link } from 'react-router-dom'

const FantasyHqAppBar = styled(AppBar)`
  @media (max-width: 767px) {
    padding: 0 3%;
  }

  padding-left: 7% !important;
`

const StyledLink = styled(Link)`
  text-decoration: none;
`

export default class NavigationBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  handleClose = () => this.setState({open: false});

  render() {
    return (
      <div>
        <FantasyHqAppBar
          title="Fantasy HQ"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonClick={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <StyledLink to='/'><MenuItem onClick={this.handleClose}>Player News</MenuItem></StyledLink>
          <StyledLink to='/stats'><MenuItem onClick={this.handleClose}>Base Player Stats</MenuItem></StyledLink>
          <StyledLink to='/advanced'><MenuItem onClick={this.handleClose}>Advanced Player Stats</MenuItem></StyledLink>
          <StyledLink to='/scoring'><MenuItem onClick={this.handleClose}>Scoring Leaders</MenuItem></StyledLink>
          <StyledLink to='/draft'><MenuItem onClick={this.handleClose}>Draft</MenuItem></StyledLink>
          <Divider />
          <a style={{ textDecoration: 'none' }} href='https://github.com/storywr/fantasy-stats' target='_blank'>
            <MenuItem onClick={this.handleClose}>GitHub Repo</MenuItem>
          </a>
        </Drawer>
      </div>
    )
  }
}