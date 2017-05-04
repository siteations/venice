import React, { Component } from 'react';

//---------------------------MATERIAL UI---------------------------
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Toggle, Slider, Chip } from 'material-ui';

const styles = {
  root: {
    display: 'flex',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  chip: {
    margin: 2,

  },
};

const MapOptions = (props) => {
	console.log(props);

	return (
	        <div className="intPanel center-block text-center">
                <button className="btn btn-default btn-sm bIconSm" onClick={e=>props.actions.in(e)}><span className="glyphicon glyphicon-plus" onClick={e=>props.actions.in(e)}></span></button>
                <br/>
                <button className="btn btn-default btn-sm bIconSm" onClick={e=>props.actions.out(e)}><span className="glyphicon glyphicon-minus" onClick={e=>props.actions.out(e)}></span></button>
                <h5>zoom</h5>
                <br/>
                <div style={styles.root}>
                    <Toggle onToggle={(e,isInputChecked)=>props.actions.opacity(e,isInputChecked)}/>
                </div>
                <h5>color</h5>
                <div style={styles.root}>
                    <Toggle defaultToggled={true} onToggle={(e,isInputChecked)=>props.actions.layers(e,isInputChecked)}/>
                    {/*<Slider style={{height: 60}} axis="y-reverse" defaultValue={1} onChange={(e,newValue)=>this.opacityLayers(e,newValue)}/>*/}
                </div>
                <h5>layers</h5>

                <div style={styles.root}>
                    <Toggle defaultToggled={props.layerOp} onToggle={(e,isInputChecked)=>props.actions.details(e,isInputChecked)}/>
                    {/*<Slider style={{height: 60}} axis="y-reverse" defaultValue={1} onChange={(e,newValue)=>this.opacityLayers(e,newValue)}/>*/}
                </div>
                <h5>local<br/>details</h5>
           </div>


	)
}

export default MapOptions;
