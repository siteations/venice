import React, {Component} from 'react';
//connect later?

let mapButtons=[
	{cn:"nIcon flex center middle", v:"intro", s:"fa fa-info" },
	{cn:"nIcon flex center middle", v:"all layers", s:"" },
	{cn:"nSpc", v:'navigate', s:"" },
	{cn:"nIcon flex center middle", v:"panel", s:"fa fa-chevron-left" },
	{cn:"nSpcSm", v:'navigate', s:"" },
	{cn:"nIcon flex center middle", v:"parishes", s:"" },
	{cn:"nIcon flex center middle", v:"bascilica", s:"" },
	{cn:"nIcon flex center middle", v:"convents", s:"" },
	{cn:"nIcon flex center middle", v:"monestary", s:"" },
	{cn:"nIcon flex center middle", v:"other relig.", s:"" },
	{cn:"nIcon flex center middle", v:"processions", s:"" },
	{cn:"nIcon flex center middle", v:"cultural", s:"fa fa-map-o" },
	{cn:"nIcon flex center middle", v:"symbolic views", s:"fa fa-map-o" },
	{cn:"nIcon flex center middle", v:"relig. prints", s:"glyphicon glyphicon-book" },
	{cn:"nIcon flex center middle", v:"relig. ephemera", s:"" },
	{cn:"nSpcSm", v:'navigate', s:"" },
	{cn:"nIcon flex center middle", v:"biblio", s:"fa fa-list-ul" },
];

const MapBar =((props)=>{

	if (props.open || props.large){
		mapButtons = mapButtons.map(each=>{
			if (each.v==='panel'){
				return {cn:"nIcon flex center middle", v:"panel", s:"fa fa-chevron-right" } ;
			} else {
				return each;
			}
		})
	} else if (props.large){
		mapButtons = mapButtons.map(each=>{
			if (each.v==='panel large'){
				return {cn:"nIcon flex center middle", v:"panel", s:"fa fa-angle-double-right" } ;
			} else {
				return each;
			}
		})
	} else {
		mapButtons = mapButtons.map(each=>{
			if (each.v==='panel'){
				return {cn:"nIcon flex center middle", v:"panel", s:"fa fa-chevron-left" } ;
			} else {
				return each;
			}
		})

	}

	return (
        	<div className="mtypeFull flexcol center">
        		<p className="sButtons text-center">{props.text}</p>
        		{mapButtons.map((each,i)=>{
        			return <div className={each.cn} key={i+'navbutton'} value={each.v} onMouseOver={props.hover} onMouseOut={props.out} onClick={props.click}><span value={each.v} className={each.s}></span></div>
        		})
        		}
        	</div>
		)
})


export default MapBar;
