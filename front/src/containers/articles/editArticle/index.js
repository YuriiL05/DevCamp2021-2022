// import { AddArticle } from "../../../components/addArticle";
// import { useMutation, useQuery } from "react-query";
// import React from "react";
// import { putEditArticle, getArticle } from "../api/crud";
// import { Loading } from "../../../components/loading";
//
// export const EditArticleContainer = ({ openArtEdit, setOpenArtEdit}) => {
//   const ArticleID = 17
//
//   const handleCloseArt = () => {
//     setOpenArtEdit(false);
//   }
//
//   const { isFetching, refetch, data } = useQuery('article', () => getArticle(ArticleID));
//   const article = data?.data;
//
//   const { mutate } = useMutation( 'editArticle', (data) => putEditArticle(data));
//
//   const editArticle = (values) => {
//     console.log(values);
//     mutate(values);
//     handleCloseArt();
//   };
//
//   return (
//     <>
//       {isFetching && <Loading/>}
//       {article && <AddArticle open={openArtEdit} handleClose={handleCloseArt} editArticle={editArticle} article={article}/>}
//     </>
//   );
// };
