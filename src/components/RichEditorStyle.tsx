import { PortableTextComponents } from "next-sanity";

export const RichEditorStyle : PortableTextComponents ={
    block:{
        h1:({h1Child}:any)=><h1>{h1Child}</h1>,
        h2:({h2Child}:any)=><h2>{h2Child}</h2>,
        h3:({h3Child}:any)=><h3>{h3Child}</h3>,
        h4:({h4child}:any)=><h4>{h4child}</h4>
    },
    listItem:{
        bullet:({children}:any)=><li className="list-desc marker:text-accentDarkSecondary list-inside ml4">{children}</li>
    },
    marks:{
        strong:({children}:any)=><strong className="font-bold">{children}</strong>
    }
}