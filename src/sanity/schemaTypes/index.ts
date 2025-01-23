import { type SchemaTypeDefinition } from 'sanity'
import { post } from '../lib/post'
import { author } from '../lib/author'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post,author],
}
