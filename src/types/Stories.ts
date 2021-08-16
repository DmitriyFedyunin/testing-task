export interface StoriesState {
    stories: any[];
    storiesInfo: StoriesInfoTypes[];
    authorInfo: AuthorInfoTypes[];
    isLoading: boolean;
    error: null | string;
}

export enum storiesActionTypes {
    FETCH_STORIES = "FETCH_STORIES",
    FETCH_STORIES_SUCCESS = "FETCH_STORIES_SUCCESS",
    FETCH_STORIES_ERROR = "FETCH_STORIES_ERROR",
    FETCH_STORIES_INFO = "FETCH_STORIES_INFO",
    FETCH_STORIES_INFO_SUCCESS = "FETCH_STORIES_INFO_SUCCESS",
    FETCH_STORIES_INFO_ERROR = "FETCH_STORIES_INFO_ERROR",
    FETCH_STORIES_AUTHOR_INFO = "FETCH_STORIES_AUTHOR_INFO",
    FETCH_STORIES_AUTHOR_INFO_SUCCESS = "FETCH_STORIES_AUTHOR_INFO_SUCCESS",
    FETCH_STORIES_AUTHOR_INFO_ERROR = "FETCH_STORIES_AUTHOR_INFO_ERROR",
}

export interface StoriesInfoTypes {
    id: number;
    by: string;
    descendants: number;
    score: number;
    title: string;
    url: string;
    time: any;
}

export interface AuthorInfoTypes {
    id: string,
    karma: number
}

interface FetchStoriesAction {
    type: storiesActionTypes.FETCH_STORIES;
    payload: any;
}

interface FetchStoriesSuccessAction {
    type: storiesActionTypes.FETCH_STORIES_SUCCESS;
    payload: any[];
}

interface FetchStoriesErrorAction {
    type: storiesActionTypes.FETCH_STORIES_ERROR;
    payload: string;
}

interface FetchStoriesInfoAction {
    type: storiesActionTypes.FETCH_STORIES_INFO;
    payload: any;
}

interface FetchStoriesInfoSuccessAction {
    type: storiesActionTypes.FETCH_STORIES_INFO_SUCCESS;
    payload: any[];
}

interface FetchStoriesInfoErrorAction {
    type: storiesActionTypes.FETCH_STORIES_INFO_ERROR;
    payload: string;
}

interface FetchStoriesAuthorInfoAction {
    type: storiesActionTypes.FETCH_STORIES_AUTHOR_INFO;
    payload: any;
}

interface FetchStoriesAuthorInfoSuccessAction {
    type: storiesActionTypes.FETCH_STORIES_AUTHOR_INFO_SUCCESS;
    payload: any[];
}

interface FetchStoriesAuthorInfoErrorAction {
    type: storiesActionTypes.FETCH_STORIES_AUTHOR_INFO_ERROR;
    payload: string;
}

export type StoriesAction = FetchStoriesErrorAction |
    FetchStoriesSuccessAction |
    FetchStoriesAction |
    FetchStoriesInfoAction |
    FetchStoriesInfoSuccessAction |
    FetchStoriesInfoErrorAction |
    FetchStoriesAuthorInfoAction |
    FetchStoriesAuthorInfoSuccessAction |
    FetchStoriesAuthorInfoErrorAction
