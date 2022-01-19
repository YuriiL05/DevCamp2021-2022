//import { useQuery } from 'react-query';
//import { getArticles } from './api/crud';

import { ArticleForList } from "../../../components/articleForList";

export const ArticleContainer = ({ article }) => {
  const { ArticleID, UserID, Title, Date } = article;

  //const { isFetching, refetch, data } = useQuery('user', () => getArticles());
  // const articles = data?.data;

  return (
    <>
      <ArticleForList articleId={ArticleID} title={Title} date={Date}/>
    </>
  );
};
