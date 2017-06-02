import React from 'react';
import { scaleOps } from '../plug-ins/rawTiles.js';

//dummy components for basic map tiles/layers

export const ClipTiles = (props) => {
    //props.data, props.wSize, props.tSize, props.clip
	return (
            <g>
            { props.data.map((tile, i)=>{

                    if (tile.xpos<props.wSize[0] && tile.xpos+256>=0 && tile.ypos<props.wSize[1] && tile.ypos+256>=0 ){ // only show those on screen

                    return (
                            <image
                            xlinkHref = {`../../../layouts/color/${tile.z}/map_${tile.x}_${tile.y}.jpg`}
                                width={props.tSize}
                                    height={props.tSize}
                                    x = { tile.xpos }
                                    y = { tile.ypos }
                                    clipPath = {props.clip}
                                    opacity={props.opacity}
                                    key={`clipTile${i}`}
                                    onDoubleClick={props.action}
                            />
                            )
                    }
                })
            }
            </g>
	        )
};

export const BackgroundTiles = (props) => {
    //props.data, props.wSize, props.tSize, props.color
    return(
           <g>
           { props.data.map((tile,i)=>{
                    if (tile.xpos<props.wSize[0] && tile.xpos+256>=0 && tile.ypos<props.wSize[1] && tile.ypos+256>=0 ){ // only show those on screen

                    return (
                            <image
                            xlinkHref = {`../../../layouts/color/${tile.z}/map_${tile.x}_${tile.y}.jpg`}
                                width={props.tSize}
                                    height={props.tSize}
                                    x = { tile.xpos }
                                    y = { tile.ypos }
                                    opacity = {(props.color===false)? .75 : 1 }
                                    filter={(props.color===false)? "url(#greyscale)" : "" }
                                    key={`backgroundTile${i}`}
                            />
                    )}
                })
            }
           </g>
           )
};

export const BackgroundMask = (props) => {
    //props.wSize, props.color
    return(
        <rect width={props.wSize[0]}
            height={props.wSize[1]}
            x = { 0 }
            y = { 0}
            fill="#21160b"
            opacity={(props.color===false)? .65 : .35 }
        />
           )
};

export const Underlay = (props) => {
    //props.wSize, props.color
    return(
           <image
            xlinkHref = {`../../../layouts/novacco_color_0804.jpg`}
                width={props.tSize*(scaleOps[props.currZoom][0]+1)}
                    height={props.tSize*(scaleOps[props.currZoom][1]+1)}
                    x = { -1 * props.xyOffsets[0] }
                    y = { -1 * props.xyOffsets[1] }
                    opacity = {(props.color===false)? .5 : 1 }
                    filter={(props.color===false)? "url(#greyscale)" : "" }
            />
    )
}
