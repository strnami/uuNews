const newspaperUpdateDtoInType = shape({
    id: id().isRequired(),
    name: uu5String(255),
    text: uu5String(4000),
    categoryList: array(id(), 10),
    image: binary()
  });