import {Content} from './content/Content';

export function MainPage( { newPost } ) {
    return (
        <>
            <Content postAbout={newPost}/>
        </>
    );
}

