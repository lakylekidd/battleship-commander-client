export const NEW_USER = 'NEW_USER'

export const newUser = user => ({
  type: NEW_USER,
  payload: user
})