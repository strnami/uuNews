const articleCreateDtoInType = shape({
  title: uu5String(100).isRequired(),
  abstract: uu5String(255).isRequired(),
  authorId: uu5String(255).isRequired(),
  newspaperId: uu5String(255).isRequired(),
  link: uu5String().isRequired(),
  publishDate: date().isRequired(),
  topicIdList: array(uu5String(255), 10),
    //visibility by se mela vkladat podle usera
    visibility: boolean()
  });

  const articleListDtoInType = shape({
    pageInfo: shape({
      pageIndex: integer(),
      pageSize: integer()
    })
  });