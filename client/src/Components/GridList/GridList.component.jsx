import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import "./GridList.styles.scss";
import TextOutputField from "../TextOutputField/TextOutputField.component";
import { ListSubheader } from "@material-ui/core";

export default function UrlGridList(props) {
  return (
    <div className="grid-list-root">
      <GridList cols={1}>
        <GridListTile key="Subheader" cols={1} style={{ height: "unset" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ListSubheader component="div">Original</ListSubheader>
            <ListSubheader component="div">Short</ListSubheader>
          </div>
        </GridListTile>
        {props.data.map(url => (
          //   <React.Fragment>
          <GridListTile key={url._id} style={{ height: "unset" }}>
            <div className="element">
              <div style={{ display: "flex" }}>
                <TextOutputField value={url.originalUrl} className="text" />
              </div>
              <div style={{ display: "flex" }}>
                <TextOutputField value={url.shortenedUrl} className="text" />
              </div>
            </div>
            <hr />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
