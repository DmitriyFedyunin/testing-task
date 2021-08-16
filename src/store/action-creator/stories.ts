import {storiesActionTypes} from "../../types/Stories";
import {Dispatch} from "redux";
import axios from "axios";

import {StoriesInfoTypes} from "../../types/Stories";



export const fetchStories = () => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch({type: storiesActionTypes.FETCH_STORIES})
            const response = await axios.get('https://hacker-news.firebaseio.com/v0/topstories.json')

            let randomStories: any[] = [];
            for (let i = 0; i < 10; i++) {
                randomStories.push(
                    response.data[Math.floor(Math.random() * (499 - 0 + 1)) + 0]
                );
            }
            dispatch({type: storiesActionTypes.FETCH_STORIES_SUCCESS, payload: randomStories})
        } catch (error) {
            dispatch({type: storiesActionTypes.FETCH_STORIES_ERROR, payload: 'Stories Loading Error'})
        }
    }
}

export const fetchStoriesInfo = (storiesId: any[]) => {
    return async  (dispatch: Dispatch) => {
        await Promise.all(storiesId.map((id: string) => {
            dispatch({type: storiesActionTypes.FETCH_STORIES_INFO})
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        }))
            .then(responses => Promise.all(responses.map(res => res.json()))
        ).then(data => {
                dispatch({type: storiesActionTypes.FETCH_STORIES_INFO_SUCCESS, payload: data})
        })
        .catch(() => {
            dispatch({type: storiesActionTypes.FETCH_STORIES_INFO_ERROR, payload: 'Stories Loading Error'})
        })
    }
}

export const fetchStoriesAuthorInfo = (stories: StoriesInfoTypes[]) => {
    return async (dispatch: Dispatch) => {
        await Promise.all(stories.map((story) => {
            dispatch({type: storiesActionTypes.FETCH_STORIES_AUTHOR_INFO})
            return fetch(`https://hacker-news.firebaseio.com/v0/user/${story.by}.json`)
        }))
            .then(responses => Promise.all(responses.map(res => res.json()))
            ).then(data => {
                dispatch({type: storiesActionTypes.FETCH_STORIES_AUTHOR_INFO_SUCCESS, payload: data})
            })
            .catch(() => {
                dispatch({type: storiesActionTypes.FETCH_STORIES_AUTHOR_INFO_ERROR, payload: 'Stories Loading Error'})
            })
    }
}