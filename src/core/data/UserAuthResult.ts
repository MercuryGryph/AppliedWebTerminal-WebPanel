interface UserAuthResult {
  readonly success: boolean
  readonly token: string | undefined
}

export default UserAuthResult
