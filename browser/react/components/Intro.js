import React, { Component } from 'react';
import { render } from 'react-dom';



export const Intro = (props)=>{
    let obj = props.obj;

	return (
          <div>
          {obj.text &&
            obj.text.map((item, i)=>{
                return (
                <div>
                <h4 className="BornholmSandvig">{obj.subtitles[i]}</h4>
                <p>{item &&
                      item.split('/').map((item,i) =>{
                        if (i%2===0){
                          return <span>{item}</span>
                        } else {
                          return <span><em>{item}</em></span>
                        }
                      })
                }
                </p><br/>
                </div>
                )
            })
            }
          <p><span className="Trenda-Bold"></span> {obj.credits}.</p>
          </div>
	        )
};


export const Biblio = (props)=>{
    let obj = props.obj;

    return (

          <div>
          <h4 className="BornholmSandvig">{obj.subtitles[0]}</h4>
            <p>{obj.text[0]}</p>
            <ul>
            {obj.entriesSecondary.map(item=>{
                return(
                       <li>
                       {item.bibliography &&
                            item.bibliography.split('/').map((text,i) =>{
                            if (i%2===0){
                              return <span>{text}</span>
                            } else {
                              return <span><em>{text}</em></span>
                            }
                          })
                        }
                        {item.link &&
                          <a href={item.link} target="_blank" style={{fontWeight: 'normal'}}> {item.link}</a>
                        }<br/><br/>
                       </li>
                       )
                })

            }

            </ul><br/>

         <h4 className="BornholmSandvig">{obj.subtitles[1]}</h4>
            <p>{obj.text[1]}</p>
            <ul>
            {obj.entriesPrimary.map(item=>{
                return(
                       <li>
                       {item.bibliography &&
                            item.bibliography.split('/').map((text,i) =>{
                            if (i%2===0){
                              return <span>{text}</span>
                            } else {
                              return <span><em>{text}</em></span>
                            }
                          })
                        }<br/>
                        <a href={item.link} target="_blank" style={{fontWeight: 'normal'}}>Newberry Catalog</a> .
                        <a href={item.onlineArchive} target="_blank" style={{fontWeight: 'normal'}}> CARLI digital collections</a><br/><br/>
                       </li>
                       )
                })

            }
            </ul>

          </div>
            )
};

export const Credits = (props)=>{
    let obj = props.obj;

    return (
          <div>
            <h4 className="BornholmSandvig">{obj.subtitles[0]}</h4>
            <ul>
            <li><span className="BornholmSandvig">{obj.lead.split(',')[0]}</span>, {obj.lead.split(',')[1]}<br/><br/></li>
            </ul>
            <p>
            {/*obj.text &&
                obj.text.split('/').map((item,i) =>{
                        if (i%2===0){
                          return <span>{item}</span>
                        } else {
                          return <span><em>{item}</em></span>
                        }
                      })

            */}
            </p>
            <h4 className="BornholmSandvig">{obj.subtitles[1]}</h4>
            <ul>
            {obj.researchers &&
                obj.researchers.map(researcher=>{
                    var item=researcher.split(',');
                    return (
                        <li><span className="BornholmSandvig">{item[0]}</span>, {item[1]}<br/><br/></li>
                            )
                })

            }
            </ul>

            <h4 className="BornholmSandvig">{obj.subtitles[2]}</h4>
            <ul>
            <li><span className="BornholmSandvig">{obj.web.split(',')[0]}</span>, <a href="https://www.siteations.com" target="_blank" style={{fontWeight: 'normal'}}>{obj.web.split(',')[1]}</a><br/><br/></li>
            </ul>


          </div>
            )
};

export const About = (props)=>{

    return (

          <div>
          <h4 className="BornholmSandvig">About This Site</h4>
            <p>This map was created to complement the display of Merlo’s map in the exhibition <em>Religious Change in Print, 1450-1700</em>.</p>
            <p>Designed by <a href="https://www.siteations.com" target="_blank" style={{fontWeight: 'normal'}}>Siteations Studio</a>, the site was conceived by Diane Dillon and Christopher Fletcher (Newberry Library). Edward Muir (Northwestern University) provided invaluable guidance on the project. Lia Markey and Andrew Epps (Newberry Library) and Eufemia Baldassarre (University of Chicago) compiled and edited the content for the site from the scholars listed above.</p>
          </div>
            )
};
