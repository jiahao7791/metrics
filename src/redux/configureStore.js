import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Courses} from './courses'
import {Teachers} from './teachers'
import { InitialFeedback } from './forms';
import { Comments } from './comments';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            courses: Courses,
            teachers: Teachers,
            comments: Comments,
            ...createForms({
                feedback: InitialFeedback
            }),
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}