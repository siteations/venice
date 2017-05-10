import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

import {updateColor, updateAnno, updateDetail} from '../action-creators/optionActions.js';

//---------------------------MATERIAL UI---------------------------
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Toggle, Slider, Chip } from 'material-ui';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';

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

class MapOps extends Component {
	constructor(props) {
        super(props);
        this.state = {};

        this.opacityAlt=this.opacityAlt.bind(this);
        this.opacityLayers=this.opacityLayers.bind(this);
        this.detailLayers=this.detailLayers.bind(this);
    }

    opacityAlt(e,isInputChecked){
        e.preventDefault;
        this.props.setColor(isInputChecked);
    }

    opacityLayers(e,isInputChecked){
        e.preventDefault;
        this.props.setAnno(isInputChecked);
        this.props.setDetail(isInputChecked);
    }

    detailLayers(e,isInputChecked){
        e.preventDefault;
        this.props.setDetail(isInputChecked);
    }

  render(){

	return (
	        <div className="intPanel center-block text-center">
                <button className="btn btn-default btn-sm bIconSm" onClick={e=>this.props.actions.zoom(e, 'in')}><span className="glyphicon glyphicon-plus" onClick={e=>this.props.actions.zoom(e, 'in')}></span></button>
                <br/>
                <button className="btn btn-default btn-sm bIconSm" onClick={e=>this.props.actions.zoom(e, 'out')}><span className="glyphicon glyphicon-minus" onClick={e=>this.props.actions.zoom(e, 'out')}></span></button>
                <h5>zoom</h5>
                <br/>
                <div style={styles.root}>
                    <Toggle onToggle={(e,isInputChecked)=>this.opacityAlt(e,isInputChecked)}/>
                </div>
                <h5>color</h5>
                <div style={styles.root}>
                    <Toggle defaultToggled={true} onToggle={(e,isInputChecked)=>this.opacityLayers(e,isInputChecked)}/>
                    {/*<Slider style={{height: 60}} axis="y-reverse" defaultValue={1} onChange={(e,newValue)=>this.opacityLayers(e,newValue)}/>*/}
                </div>
                <h5>layers</h5>

                <div style={styles.root}>
                    <Toggle defaultToggled={this.props.options.anno} onToggle={(e,isInputChecked)=>this.detailLayers(e,isInputChecked)}/>
                    {/*<Slider style={{height: 60}} axis="y-reverse" defaultValue={1} onChange={(e,newValue)=>this.opacityLayers(e,newValue)}/>*/}
                </div>
                <h5>local<br/>details</h5>
                <br/>

                <h5 className="Trenda-Bold">maps</h5>
                <div style={styles.root} className="center-block">
                    <Toggle />
                </div>
                <h5>split<br/>screen</h5>
                <form>
                  <input type="radio" name="name1" checked /><br/>
                  options<br/>
                  <input type="radio" name="lastname" /><br/>
                  coming<br/>
                  <input type="radio" name="lastname" /><br/>
                  soon<br/>
                </form>

           </div>


		)
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
    options: state.options,
  }
}

//setZoom, setTile, setOffsets, setCenter, setCenterScreen, setWindowSize, setWindowOffset

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setColor: (bool) => {
      dispatch(updateColor(bool));
    },
    setAnno: (bool) => {
      dispatch(updateAnno(bool));
    },
    setDetail: (bool) => {
        dispatch(updateDetail(bool));
    },
  }
}

const MapOptions = connect(mapStateToProps, mapDispatchToProps)(MapOps);

export default MapOptions;
