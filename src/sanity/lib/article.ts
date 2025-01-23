import { defineArrayMember, defineField } from "sanity";

export const article = {
    name:'article',
    type:'document',
    title:"Article",
    fields:[
        defineField({
            name:'title',
            type:'string',
            title:'Post Title',
            description:'Title of the post',
            validation:Rule=>Rule.required(),

        }),
        defineField({
            name:'slug',
            type:'slug',
            title:'slug',
            options:{
                source:'title',
                maxLength:96,
            },
            validation:Rule=>Rule.required()
        }),
        defineField({
            name:'Summary',
            type:'text',
            title:'Summary',
            validation:Rule=>Rule.required()
        }),
        defineField({
            name:'image',
            type:'image',
            title:'Image',
        }),
        defineField({
            name:'content',
            type:'array',
            title:'Content',
            of:[
                defineArrayMember({
                    type:"block"
                })
            ]
        }),
        defineField({
            name:'author',
            type:'reference',
            title:'Author',
            to:[{
                    type:"author"
                }]
            
        }),
        
    ],
    actions: (prev:any, context:any) => {
        // Adding default actions with a delete button
        return [
            ...prev,
            {
                action: 'delete',
                title: 'Delete Post',
                onHandle: async () => {
                    const { client } = context;

                    const confirm = window.confirm('Are you sure you want to delete this post?');
                    if (confirm) {
                        await client.delete(context.documentId);
                        window.alert('Post deleted successfully!');
                        location.reload(); // Optional: refresh to reflect changes
                    }
                },
            },
        ];
    }
}