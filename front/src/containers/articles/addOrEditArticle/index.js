import { AddOrEditArticle } from "../../../components/addOrEditArticle";
import AddOrEditArticleValidation from "../../../propsValidation/AddOrEditArticleValidation";

export const AddOrEditArticleContainer = ({ open, handleClose, submitArticle, article, accessLevels }) => {

  return (
    <>
      <AddOrEditArticle open={open}
                        handleClose={handleClose}
                        submitArticle={submitArticle}
                        article={article}
                        accessLevels={accessLevels} />
    </>
  );
};

AddOrEditArticleContainer.propTypes = AddOrEditArticleValidation;
