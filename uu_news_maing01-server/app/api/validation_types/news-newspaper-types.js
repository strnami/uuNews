const newspaperCreateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(255),
  icon: string(40)
});

const newspaperUpdateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(255),
  icon: string(40)
});

// const newspaperCreateDtoInType = shape({
//     id: uu5String(255).isRequired(),
//     name: uu5String(255),
//     icon: string(40)
//   });
  
//   const newspaperUpdateDtoInType = shape({
//     id: uu5String(255).isRequired(),
//     name: uu5String(255),
//     icon: string(40)
//   });