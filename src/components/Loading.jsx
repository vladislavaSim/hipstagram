import { connect } from 'react-redux';
import loading from '../img/Loading_icon.gif'
import './Preloader.scss';

const Preloader = () => <img className="preloader" src={loading} alt="preloader" />;
const RejectedAlert = () => <h1>Error loading</h1>;

const Preloaded = ({ promiseName, promiseState, children }) => (
    <>
        {promiseState[promiseName]?.status === 'RESOLVED' ? (
            children
        ) : promiseState[promiseName]?.status === 'REJECTED' ? (
            <RejectedAlert error={promiseState[promiseName]?.error} />
        ) : (
            <Preloader />
        )}
    </>
);

export const CPreloaded = connect((state) => ({ promiseState: state.promise }))(Preloaded);