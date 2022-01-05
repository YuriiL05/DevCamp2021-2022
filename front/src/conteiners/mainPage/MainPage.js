import MainPage from '../../components/mainPage/MainPage';

const MainPageContainer = function ({ about }) {
  const newPost = `${about} !`;
  return (
    <MainPage newPost={newPost} />
  );
};

export default MainPageContainer;
