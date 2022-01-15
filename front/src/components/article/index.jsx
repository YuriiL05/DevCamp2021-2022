export const Article = ( { id, articleInfo, test} ) => {
  return (
    <div className={"article"}>
      <p>Article# {id}</p>
      <p>Title: {articleInfo.title}</p>
      <p>Text:</p>
      <p>{articleInfo.text}</p>
      <p>Comments: {articleInfo.comments[0].text}</p>
      <p>TestId: {test}</p>
    </div>
  );
};