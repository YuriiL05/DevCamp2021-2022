import { AddOrEditArticle } from "../../../components/addOrEditArticle";
import AddOrEditArticleValidation from "../../../propsValidation/AddOrEditArticleValidation";

export const AddOrEditArticleContainer = ({ open, handleClose, submitArticle, article }) => {

  return (
    <>
      <AddOrEditArticle open={open}
                        handleClose={handleClose}
                        submitArticle={submitArticle}
                        article={article}
      />
    </>
  );
};

AddOrEditArticleContainer.propTypes = AddOrEditArticleValidation;
