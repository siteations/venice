import React, {Component} from 'react';
//connect later?

const mapButtons=[
	{cn:"nIcon flex center middle", v:"intro", s:"fa fa-info" },
	{cn:"nIcon flex center middle", v:"geography", s:"fa fa-map-o" },
	{cn:"nSpc", v:"", s:"" },
	{cn:"nIcon flex center middle", v:"show panel", s:"fa fa-plus" },
	{cn:"nSpcSm", v:"", s:"" },
	{cn:"nIcon flex center middle", v:"all types", s:"" },
	{cn:"nSpc", v:"", s:"" },
	{cn:"nIcon flex center middle", v:"parishes", s:"" },
	{cn:"nIcon flex center middle", v:"bascilica", s:"" },
	{cn:"nIcon flex center middle", v:"convents", s:"" },
	{cn:"nIcon flex center middle", v:"monestary", s:"" },
	{cn:"nIcon flex center middle", v:"nonCatholic", s:"" },
	{cn:"nIcon flex center middle", v:"ritual", s:"" },
	{cn:"nSpcSm", v:"", s:"" },
	{cn:"nIcon flex center middle", v:"printers", s:"glyphicon glyphicon-book" },
	{cn:"nIcon flex center middle", v:"patrons", s:"" },
	{cn:"nIcon flex center middle", v:"other", s:"" },

];

const MapBar =((props)=>{

	return (
        	<div className="mtypeFull flexcol center">
        		<p className="sButtons text-center">{props.text}</p>
        		{mapButtons.map(each=>{
        			return <div className={each.cn} value={each.v} onMouseover="" onClick=""><span className={each.s}></span></div>
        		})
        		}
        	</div>
		)
})


export default MapBar;
