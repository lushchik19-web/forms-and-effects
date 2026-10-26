import type { Article } from "../../types/article";

interface ArticleListProps {
  articles: Article[];
}

function ArticleList({ articles }: ArticleListProps) {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.story_id}>
          <a href={article.utl}>{article.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default ArticleList;
