import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import styled from 'styled-components'

import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  text-decoration: none;
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
        <RaisedButton
          label="Navigation"
          onClick={this.handleToggle}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <StyledLink to='/'><MenuItem onClick={this.handleClose}>Player News</MenuItem></StyledLink>
          <StyledLink to='/test'><MenuItem onClick={this.handleClose}>Player Stats</MenuItem></StyledLink>
          <StyledLink to='/test'><MenuItem onClick={this.handleClose}>Scoring Leaders</MenuItem></StyledLink>
          <StyledLink to='/draft'><MenuItem onClick={this.handleClose}>Draft</MenuItem></StyledLink>
        </Drawer>
      </div>
    );
  }
}