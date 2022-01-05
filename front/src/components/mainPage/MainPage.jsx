import Content from './content/Content';

const MainPage = function ({ newPost }) {
  return (
    <Content postAbout={newPost} />
  );
};

export default MainPage;
