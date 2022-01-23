import { ArticleForList } from "../../../components/articleForList";

export const ArticleForListContainer = ({ article }) => {
  const { ArticleID, UserID, Title, Date } = article;

  return (
    <>
      <ArticleForList articleId={ArticleID} title={Title} date={Date}/>
    </>
  );
};
