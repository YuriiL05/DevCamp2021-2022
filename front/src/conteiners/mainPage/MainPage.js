import {MainPage} from "../../components/mainPage/MainPage";

export function MainPageContainer({ about }) {
    const newPost = `${about} !!!`;
    return (
        <>
            <MainPage newPost={newPost}/>
        </>
    );
}