import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='uk-container'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/login">Go to login</Link>
    </div>
  )
} 