'use client'

import React from 'react'
import { useAuth } from '@payloadcms/ui'

type UserAvatar = { url?: string } | string | null | undefined

type AppUser = {
  name?: string | { en?: string; ar?: string }
  email?: string
  avatar?: UserAvatar
}

const SIZE = 28

const resolveAvatarURL = (avatar: UserAvatar): string | null => {
  if (!avatar || typeof avatar !== 'object') return null
  return typeof avatar.url === 'string' ? avatar.url : null
}

const resolveName = (name: AppUser['name']): string => {
  if (typeof name === 'string') return name
  if (name && typeof name === 'object') return name.en || name.ar || ''
  return ''
}

export const AdminAvatar: React.FC = () => {
  const { user } = useAuth<AppUser>()

  const avatarURL = resolveAvatarURL(user?.avatar)
  const displayName = resolveName(user?.name) || user?.email || ''
  const initial = displayName ? displayName.charAt(0).toUpperCase() : '?'

  const wrapperStyle: React.CSSProperties = {
    width: SIZE,
    height: SIZE,
    minWidth: SIZE,
    minHeight: SIZE,
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }

  if (avatarURL) {
    return (
      <div style={wrapperStyle}>
        <img
          src={avatarURL}
          alt={displayName || 'User'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    )
  }

  return (
    <div
      style={{
        ...wrapperStyle,
        background: 'var(--theme-elevation-150, #2a4365)',
        color: '#fff',
        fontWeight: 600,
        fontSize: 12,
        textTransform: 'uppercase',
      }}
    >
      {initial}
    </div>
  )
}

export default AdminAvatar
