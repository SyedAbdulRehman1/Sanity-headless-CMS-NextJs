import { type SchemaTypeDefinition } from 'sanity'
import { post } from '../lib/post'
import { author } from '../lib/author'
import { article } from '../lib/article'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post,author,article],
}
