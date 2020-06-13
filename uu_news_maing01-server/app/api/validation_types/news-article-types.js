const articleCreateDtoInType = shape({
  title: uu5String(100).isRequired(),
  abstract: uu5String(255).isRequired(),
  authorId: id().isRequired(),
  newspaperId: id().isRequired(),
  link: uu5String().isRequired(),
  publishDate: date().isRequired(),
  topicIdList: array(id(), 10)
    //visibility by se mela vkladat podle usera
  });
// const articleCreateDtoInType = shape({
//   title: uu5String(100).isRequired(),
//   abstract: uu5String(255).isRequired()
// });

const articleListDtoInType = shape({
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    })
});