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
            <h4 className="BornholmSandvig">{obj.subtitles}</h4>
            <p>
            {obj.text &&
                obj.text.split('/').map((item,i) =>{
                        if (i%2===0){
                          return <span>{item}</span>
                        } else {
                          return <span><em>{item}</em></span>
                        }
                      })

            }
            </p>
            <ul>
            {obj.researchers &&
                obj.researchers.map(researcher=>{
                    var item=researcher.split('(');
                    return (
                        <li><span className="BornholmSandvig">{item[0]}</span> <em>({item[1]}</em><br/><br/></li>
                            )
                })

            }
            </ul>

          </div>
            )
};

export const About = (props)=>{

    return (

          <div>
          <h4 className="BornholmSandvig">About This Site</h4>
            <p><em>Merlo's Map: The Religious Geography of Venice</em> is part of <em>Religious Change, 1450-1700</em>, the Newberry Library's year-long, multidisciplinary project exploring how religion and print challenged authority, upended society, and made the medieval world modern.
            </p>
            <p>
            The site was built by <a href="https://www.siteations.com" target="_blank" style={{fontWeight: 'normal'}} >Siteations Studio</a>.
            </p>
            <h4 className="BornholmSandvig">About Religious Change and Print, 1450-1700</h4>
            <p>
            Religion and print were hinges on which the medieval world opened into the modern. Before and after Martin Luther challenged the Roman Church 500 years ago, quests for spiritual renewal or ecclesiastical reform shook traditional sources of authority across Europe and the Americas. Competing ideas about religious beliefs and practices spread far and wide-especially by the printed word-at a pace power structures had difficulty controlling. These ideas awakened new vistas on life, while provoking hope and fear, anxiety and certainty, protest and violence. The winds of religious change profoundly affected people in all walks of life. They also transformed print in ways that continue to influence how we form and share our beliefs.
            </p>
            <p>
            During 2017-18, the Newberry is exploring religious change through a gallery exhibition, <em>Religious Change and Print, 1450-1700</em> (on view September 14-December 30, 2017), an array of digital resources, and a series of programs for scholars, students, and the general public.</p>
            <p>
            <em>Religious Change, 1450-1700</em> is generously supported by a grant from The Andrew W. Mellon Foundation.
            </p>
            <p>
            For more information, please visit our project page: <a href="https://www.newberry.org/religious-change" target="_blank" >Religious Change, 1450-1700</a>.
            </p>
          </div>
            )
};
