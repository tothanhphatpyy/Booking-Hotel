const checkRole = (role : number) => {
  if(role == 0)
    return 'user';
  else if(role == 1)
    return 'owner';
  else
    return 'admin';
}

export { checkRole }