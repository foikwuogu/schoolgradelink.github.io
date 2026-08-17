import { type SchemaTypeDefinition } from 'sanity'
import { hardwareProduct } from './hardwareProduct'
import { homepage } from './homepage'
import { job } from './job'
import { partner } from './partner'
import { product } from './product'
import { project } from './project'
import { servicePillar } from './servicePillar'
import { staff } from './staff'
import { testimonial } from './testimonial'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hardwareProduct, servicePillar, project, partner, product, homepage, testimonial, staff, job],
}
