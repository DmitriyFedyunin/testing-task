import {StoriesState, StoriesAction, storiesActionTypes} from "../../types/Stories";

const initialState: StoriesState = {
    stories: [],
    storiesInfo: [],
    authorInfo: [],
    isLoading: false,
    error: null,
}

export const storiesReducer = (state = initialState, action: StoriesAction): StoriesState => {
    switch (action.type) {
        case storiesActionTypes.FETCH_STORIES :
            return {
                ...state,
                isLoading: true,
            }
        case storiesActionTypes.FETCH_STORIES_SUCCESS :
            return {
                ...state,
                isLoading: false,
                stories: action.payload,
            }
        case storiesActionTypes.FETCH_STORIES_ERROR :
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case storiesActionTypes.FETCH_STORIES_INFO :
            return {
                ...state,
                isLoading: true,
            }
        case storiesActionTypes.FETCH_STORIES_INFO_SUCCESS :
            return {
                ...state,
                isLoading: false,
                storiesInfo: action.payload,
            }
        case storiesActionTypes.FETCH_STORIES_INFO_ERROR :
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        case storiesActionTypes.FETCH_STORIES_AUTHOR_INFO :
            return {
                ...state,
                isLoading: true,
            }
        case storiesActionTypes.FETCH_STORIES_AUTHOR_INFO_SUCCESS :
            return {
                ...state,
                isLoading: false,
                authorInfo: action.payload,
            }
        case storiesActionTypes.FETCH_STORIES_AUTHOR_INFO_ERROR :
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}