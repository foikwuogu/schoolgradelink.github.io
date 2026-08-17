import { defineArrayMember, defineField, defineType } from 'sanity'

export const servicePillar = defineType({
  name: 'servicePillar',
  title: 'Service Pillar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Pillar Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'items',
      title: 'Bullet Points',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
  ],
})