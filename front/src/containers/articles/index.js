import { ArticleForList } from "../../components/articleForList";

export const ArticlesContainer = () => {

  const articles = [
    {
      articleId: 1,
      articleTitle: "My Article #1"
    },
    {
      articleId: 2,
      articleTitle: "My Article #2"
    },
  ]

  return (
    articles.map(article => (
      <ArticleForList key={article.articleId} article={article}/>
    ))
  );
};
