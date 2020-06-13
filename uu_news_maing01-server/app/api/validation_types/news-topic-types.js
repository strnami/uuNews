const topicCreateDtoInType = shape({
  id: id().isRequired(),
  name: uu5String(255).isRequired()
});

const topicDeleteDtoInType = shape({
id: id().isRequired()
});


// const topicCreateDtoInType = shape({
//     id: uu5String(100).isRequired(),
//     name: uu5String(255).isRequired()
//   });

// const topicDeleteDtoInType = shape({
//   id: uu5String(100).isRequired()
// });