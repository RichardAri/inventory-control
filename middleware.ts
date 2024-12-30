import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getAuth } from 'firebase-admin/auth'
import { app } from './lib/firebase-admin'

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value || ''

  if (!session) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    const decodedClaims = await getAuth(app).verifySessionCookie(session)
    if (!decodedClaims) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/tiendas/:path*'],
}

