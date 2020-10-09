import React from "react";
import ROUTES from "Constants/routes";
import { Link } from "react-router-dom";
import "./welcome.css";

import Drawer from "Components/drawer/drawer"

import RightDrawer from "Components/drawer/rightDrawer"


import AppBar from "Components/appbar/appbar"


import Button from '@material-ui/core/Button';


function homePage() {

  return (
    <>
      <Drawer/>

    <div className={'frontPageContent'}>
      <h1>Velkommen til NemMadplan</h1>
      <div className={'fpHolder'}>
        <button className={'fpButtons'}>Opret ny madplan</button>
      </div>

      <div className={'fpHolder'}>
        <button className={'fpButtons'}>Gemte madplaner</button>
      </div>

      <div className={'fpHolder'}>
        <button className={'fpButtons'}>Gemte retter</button>
      </div>

    </div>
    </>
  )
}

export default homePage;




/*class Welcome extends React.Component {
  render() {
    return (
      <div id="welcome">
        <h1 className="header">
          Thank you for trying out the secure-electron-template!
        </h1>
        <div>
          <Link to={ROUTES.MOTD}>View a sample of using the store.</Link><br />
          <Link to={ROUTES.LOCALIZATION}>
            View a sample of changing locales.
          </Link> <br />
          <Link to={ROUTES.UNDOREDO}>
            View a sample of undo/redoing actions.
          </Link> <br />
          <Link to={ROUTES.CONTEXTMENU}>
            View a sample of a custom context menu.
          </Link> <br />
        </div>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}

export default Welcome;*/
