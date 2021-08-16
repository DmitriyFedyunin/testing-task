import React, {FC, useEffect, useState} from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {fetchStories, fetchStoriesInfo, fetchStoriesAuthorInfo} from "../store/action-creator/stories";
import {AuthorInfoTypes, StoriesInfoTypes} from "../types/Stories";

import storyDefaultImage from '../assets/images/stories-image.jpg';

import '../styles/stories.scss';

const StoriesList: FC = () => {
    const {stories, storiesInfo, authorInfo, error, isLoading} = useTypedSelector(state => state.stories);
    // made as an example of using component state, better moved to global state and changed via action
    const [sortingValue, setSorting] = useState('ascending')

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStories());
    }, [dispatch])

    useEffect(() => {
        if (stories.length > 0) {
            dispatch(fetchStoriesInfo(stories))
        }
    }, [dispatch, stories])

    useEffect(() => {
        if (storiesInfo.length > 0) {
            dispatch(fetchStoriesAuthorInfo(storiesInfo))
        }
    }, [dispatch, storiesInfo])

    const sortingChangeHandler = (e: any) => {
        setSorting(e.target.dataset.value);
    }

    if (error) {
        return <h1>Loading Failed</h1>
    }

    if (isLoading) {
        return <h1>Loading...</h1>
    }

    storiesInfo.sort((currentStory, nextStory) => {
        if (sortingValue === 'ascending') {
            return currentStory.score < nextStory.score ? 1 : -1;
        } else if  (sortingValue === 'descend') {
            return currentStory.score > nextStory.score ? 1 : -1;
        }
    })

    return (
        <div>
            {/* better placed in a separate component */}
            <div className="sorting">
                <div className="sorting__variant">
                    <span>Rating</span>
                    <p
                        className={`sorting__value ${sortingValue === 'ascending' ? 'sorting__value--selected' : ''}`}
                        data-value="ascending"
                        onClick={sortingChangeHandler}
                    >
                        ascending
                    </p>
                    <p
                        className={`sorting__value ${sortingValue === 'descend' ? 'sorting__value--selected' : ''}`}
                        data-value="descend"
                        onClick={sortingChangeHandler}
                    >
                        descend
                    </p>
                </div>
            </div>
            {/**/}
            <div className="stories">
                {
                    storiesInfo.map((story: StoriesInfoTypes) => {
                        const storyDate = new Date(story.time);
                        const currentAuthor = authorInfo.find((author: AuthorInfoTypes) => author.id === story.by)

                        return (<div key={story.id} className="story">
                            <img
                                className="story__image"
                                src={storyDefaultImage}
                                alt="story default image"
                                width={250}
                            />
                            <div className="story__info">
                                <h3 className="story__title">{story.title}</h3>
                                <h4 className="story__author-name">Author - <span className="value">{story.by}</span></h4>
                                <h4 className="story__author-karma">Karma - <span className="value">{currentAuthor ? currentAuthor.karma : ''}</span></h4>
                                <a href={story.url} className="story__url" target="_blank">{story.url}</a>
                                <p className="story__sup-info">
                                    <span>{`${storyDate.getHours()}:${storyDate.getMinutes()} ${storyDate.getDate()}/${storyDate.getMonth() + 1}/${storyDate.getFullYear()}`}</span>
                                    <span className="story__score">rating - <span className="value">{story.score}</span></span>
                                </p>
                            </div>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}

export default StoriesList;