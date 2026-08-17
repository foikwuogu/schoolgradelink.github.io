import { sanityClient } from '@/lib/sanity'

type Staff = {
  _id: string
  name: string
  role: string
  department: string
  bio?: string
  photo?: {
    alt?: string
    asset?: { url?: string }
  }
}

export default async function StaffPage() {
  const staff = await sanityClient.fetch<Staff[]>(
    `*[_type == "staff"] | order(name asc){
      _id,
      name,
      role,
      department,
      bio,
      photo{ alt, asset->{url} }
    }`,
  )

  return (
    <div className="mx-auto max-w-6xl px-4">
      <h1 className="mt-6 text-2xl font-bold">Leadership &amp; Team</h1>
      {staff.length > 0 ? (
        <div className="mt-6 grid gap-6 text-sm md:grid-cols-3">
          {staff.map((member) => (
            <div key={member._id} className="rounded-lg bg-white p-4 shadow">
              {member.photo?.asset?.url && (
                <img
                  src={member.photo.asset.url}
                  alt={member.photo.alt || member.name}
                  className="mx-auto h-32 w-32 rounded-full object-cover"
                />
              )}
              <p className="mt-3 text-center text-sm font-semibold">{member.name}</p>
              <p className="text-center text-xs text-gray-500">{member.role}</p>
              <p className="text-center text-xs text-gray-400">{member.department}</p>
              {member.bio && <p className="mt-2 text-center text-xs text-gray-700">{member.bio}</p>}
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-gray-600">Staff profiles will be available soon.</p>
      )}
    </div>
  )
}