import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';

const LayersList=(props)=>{
		let layers = props.layers;
		let type = props.type;

     return (
     				<div>
                {layers && type==='p' &&
                    layers.map(layer=>{
                        return <p className="small closerB1">{layer}</p>
                    })
                }
                {layers && type==='span' &&

                    <p className="texta closerB" style={{borderTop: 'solid #fff 0.5px', paddingTop: '5px'}}><b className="BornholmSandvig" >Layers: </b><span className="small closerB1">{layers.join(', ')}</span></p>

                }
            </div>
            )
}

export default LayersList;
