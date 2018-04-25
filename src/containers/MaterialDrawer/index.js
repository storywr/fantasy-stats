import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

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
          <MenuItem onClick={this.handleClose}>Player News</MenuItem>
          <MenuItem onClick={this.handleClose}>Single Player Stats</MenuItem>
          <MenuItem onClick={this.handleClose}>Scoring Leaders</MenuItem>
          <MenuItem onClick={this.handleClose}>Draft</MenuItem>
        </Drawer>
      </div>
    );
  }
}