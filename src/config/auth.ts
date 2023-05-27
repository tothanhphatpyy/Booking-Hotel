const checkRole = (role : number) => {
  if(role == 0)
    return 'admin';
  else if(role == 1)
    return 'owner';
  else
    return 'user';
}

export { checkRole }