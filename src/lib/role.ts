export type UserRole = 'cadre' | 'citizen'

export const ROLE_STORAGE_KEY = 'user_role'

export const CADRE_HOME = '/home'
export const CITIZEN_HOME = '/citizen/services'

export function isCitizenRoute(pathname: string): boolean {
  return pathname.startsWith('/citizen')
}

export function getStoredRole(): UserRole | null {
  const role = localStorage.getItem(ROLE_STORAGE_KEY)
  if (role === 'cadre' || role === 'citizen') {
    return role
  }
  return null
}

export function setStoredRole(role: UserRole): void {
  localStorage.setItem(ROLE_STORAGE_KEY, role)
}
