import { defineArrayMember, defineField } from "sanity";

export const author = {
    name:'author',
    type:'document',
    title:"Author",
    fields:[
        defineField({
            name:'name',
            type:'string',
            title:'Author Name',
            validation:Rule=>Rule.required(),

        }),
        defineField({
            name:'bio',
            type:'text',
            title:'Bio',
        }),
        defineField({
            name:'image',
            type:'image',
            title:'Image',
            options:{
                hotspot:true,
            }
        }),
     
    ]
}