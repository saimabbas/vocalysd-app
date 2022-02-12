/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { FunctionComponent, useState } from 'react';
import './Conversations.css';
import Firebase from '../../firebase';
import { NotificationType } from '../../interface';
import { MdInfo, MdCloudUpload, MdSearch, MdSwapVert, MdRemoveRedEye } from 'react-icons/md';
import {
    FaCaretDown,
    FaTrashAlt,
    FaRegCheckCircle,
    FaFilter,
    FaAngleDoubleLeft,
    FaAngleDoubleRight,
} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';

const Conversations: FunctionComponent<{
    firebase: Firebase;
    setMessageObj: (messageObj: NotificationType) => void;
    loggedInUser: any;
}> = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="app-main-container">
            <div className="right-container-content-box">
                <div className="rc-head">
                    <div className="rc-head-heading">
                        <h1>Conversations</h1>
                        <div></div>
                        <span>
                            <MdInfo className="rchh-icon" />
                            <p>Conversations are transcribed voice data with analytics applied.</p>
                        </span>
                    </div>
                    <div className="rc-head-box">
                        <MdCloudUpload className="rchb-icon" />
                        <p>Upload new file(s)</p>
                    </div>
                    <div className="rc-head-box">
                        <MdSearch className="rchb-icon" />
                        <p>Custom Search</p>
                    </div>
                </div>
                <div className="rc-btns">
                    <button>EXCEL</button>
                    <button>CSV</button>
                </div>
                <div className="rc-filters-search-bar">
                    <div className="rc-fsb-filter-box">
                        <span>
                            Show
                            <div>
                                <select name="" id="">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                </select>
                                <FaCaretDown className="rc-caret-down" />
                            </div>
                            enteries
                        </span>
                        <div className="rc-filter-box">
                            <FaFilter className="rc-filter-icon" /> Filter
                        </div>
                    </div>
                    <div className="rc-fsb-search-box">
                        <label htmlFor="">Quick Search:</label>
                        <input type="text" />
                    </div>
                </div>
                <div className="rc-table-custom">
                    <div className="rctc-content">
                        <div className="rctc-row rctc-row-head">
                            <div className="rctc-cell rctc-cell-view">
                                All <MdSwapVert className="rc-sort" />
                            </div>
                            <div className="rctc-cell rctc-cell-id">
                                ID <MdSwapVert className="rc-sort" />
                            </div>
                            <div className="rctc-cell rctc-cell-direction">
                                Direction <MdSwapVert className="rc-sort" />
                            </div>
                            <div className="rctc-cell rctc-cell-campaign">
                                Campaign <MdSwapVert className="rc-sort" />
                            </div>
                            <div className="rctc-cell rctc-cell-spotter-list">
                                Spotter <MdSwapVert className="rc-sort" />
                            </div>
                            <div className="rctc-cell rctc-cell-upload-date">
                                Upload Date <MdSwapVert className="rc-sort" />
                            </div>
                            <div className="rctc-cell rctc-cell-qa">
                                QA <MdSwapVert className="rc-sort" />
                            </div>
                            <div className="rctc-cell rctc-cell-qa-score">
                                QA Score <MdSwapVert className="rc-sort" />
                            </div>
                            <div className="rctc-cell rctc-cell-status">
                                Status <MdSwapVert className="rc-sort" />
                            </div>
                            <div className="rctc-cell rctc-cell-agent">
                                Agent <MdSwapVert className="rc-sort" />
                            </div>
                            <div className="rctc-cell rctc-cell-duration">
                                Duration <MdSwapVert className="rc-sort" />
                            </div>
                            <div className="rctc-cell rctc-cell-sentiment">
                                Sentiment <MdSwapVert className="rc-sort" />
                            </div>
                            <div className="rctc-cell rctc-cell-talk-listen">
                                Talk/Listen <MdSwapVert className="rc-sort" />
                            </div>
                        </div>
                        <div className="rctc-row">
                            <div className="rctc-cell rctc-cell-view">
                                <MdRemoveRedEye className="rc-view-icon" />
                            </div>
                            <div className="rctc-cell rctc-cell-id">
                                <p>ABCDEF123456ABCDEF123456</p>
                            </div>
                            <div className="rctc-cell rctc-cell-direction">
                                <span>Inbound</span>
                            </div>
                            <div className="rctc-cell rctc-cell-campaign">
                                <span>Warranty</span>
                            </div>
                            <div className="rctc-cell rctc-cell-spotter-list">
                                <span>Birds</span>
                            </div>
                            <div className="rctc-cell rctc-cell-upload-date">
                                <span>2021/01/01</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa">
                                <span>Q1 A</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa-score">
                                <span>3/5</span>
                            </div>
                            <div className="rctc-cell rctc-cell-status">
                                <span className="completed">Completed</span>
                            </div>
                            <div className="rctc-cell rctc-cell-agent">
                                <span>Agent 1</span>
                            </div>
                            <div className="rctc-cell rctc-cell-duration">
                                <span>05:41</span>
                            </div>
                            <div className="rctc-cell rctc-cell-sentiment">
                                <span>Positive</span>
                            </div>
                            <div className="rctc-cell rctc-cell-talk-listen rctc-cell-delete">
                                <span>40:60</span> <FaTrashAlt onClick={handleShow} className="rctc-delete" />
                            </div>
                        </div>
                        <div className="rctc-row">
                            <div className="rctc-cell rctc-cell-view">
                                <MdRemoveRedEye className="rc-view-icon" />
                            </div>
                            <div className="rctc-cell rctc-cell-id">
                                <p>ABCDEF123456ABCDEF123456</p>
                            </div>
                            <div className="rctc-cell rctc-cell-direction">
                                <span>Inbound</span>
                            </div>
                            <div className="rctc-cell rctc-cell-campaign">
                                <span>Warranty</span>
                            </div>
                            <div className="rctc-cell rctc-cell-spotter-list">
                                <span>Birds</span>
                            </div>
                            <div className="rctc-cell rctc-cell-upload-date">
                                <span>2021/01/01</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa">
                                <span>Q1 A</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa-score">
                                <span>3/5</span>
                            </div>
                            <div className="rctc-cell rctc-cell-status">
                                <span className="inProgress">In Progress</span>
                            </div>
                            <div className="rctc-cell rctc-cell-agent">
                                <span>Agent 1</span>
                            </div>
                            <div className="rctc-cell rctc-cell-duration">
                                <span>05:41</span>
                            </div>
                            <div className="rctc-cell rctc-cell-sentiment">
                                <span>Positive</span>
                            </div>
                            <div className="rctc-cell rctc-cell-talk-listen rctc-cell-delete">
                                <span>40:60</span> <FaTrashAlt className="rctc-delete" />
                            </div>
                        </div>
                        <div className="rctc-row">
                            <div className="rctc-cell rctc-cell-view">
                                <MdRemoveRedEye className="rc-view-icon" />
                            </div>
                            <div className="rctc-cell rctc-cell-id">
                                <p>ABCDEF123456ABCDEF123456</p>
                            </div>
                            <div className="rctc-cell rctc-cell-direction">
                                <span>Inbound</span>
                            </div>
                            <div className="rctc-cell rctc-cell-campaign">
                                <span>Warranty</span>
                            </div>
                            <div className="rctc-cell rctc-cell-spotter-list">
                                <span>Birds</span>
                            </div>
                            <div className="rctc-cell rctc-cell-upload-date">
                                <span>2021/01/01</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa">
                                <span>Q1 A</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa-score">
                                <span>3/5</span>
                            </div>
                            <div className="rctc-cell rctc-cell-status">
                                <span className="scheduled">Scheduled</span>
                            </div>
                            <div className="rctc-cell rctc-cell-agent">
                                <span>Agent 1</span>
                            </div>
                            <div className="rctc-cell rctc-cell-duration">
                                <span>05:41</span>
                            </div>
                            <div className="rctc-cell rctc-cell-sentiment">
                                <span>Positive</span>
                            </div>
                            <div className="rctc-cell rctc-cell-talk-listen rctc-cell-delete">
                                <span>40:60</span> <FaTrashAlt className="rctc-delete" />
                            </div>
                        </div>
                        <div className="rctc-row">
                            <div className="rctc-cell rctc-cell-view">
                                <MdRemoveRedEye className="rc-view-icon" />
                            </div>
                            <div className="rctc-cell rctc-cell-id">
                                <p>ABCDEF123456ABCDEF123456</p>
                            </div>
                            <div className="rctc-cell rctc-cell-direction">
                                <span>Inbound</span>
                            </div>
                            <div className="rctc-cell rctc-cell-campaign">
                                <span>Warranty</span>
                            </div>
                            <div className="rctc-cell rctc-cell-spotter-list">
                                <span>Birds</span>
                            </div>
                            <div className="rctc-cell rctc-cell-upload-date">
                                <span>2021/01/01</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa">
                                <span>Q1 A</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa-score">
                                <span>3/5</span>
                            </div>
                            <div className="rctc-cell rctc-cell-status">
                                <span className="failed">Failed</span>
                            </div>
                            <div className="rctc-cell rctc-cell-agent">
                                <span>Agent 1</span>
                            </div>
                            <div className="rctc-cell rctc-cell-duration">
                                <span>05:41</span>
                            </div>
                            <div className="rctc-cell rctc-cell-sentiment">
                                <span>Positive</span>
                            </div>
                            <div className="rctc-cell rctc-cell-talk-listen rctc-cell-delete">
                                <span>40:60</span> <FaTrashAlt className="rctc-delete" />
                            </div>
                        </div>
                        <div className="rctc-row">
                            <div className="rctc-cell rctc-cell-view">
                                <MdRemoveRedEye className="rc-view-icon" />
                            </div>
                            <div className="rctc-cell rctc-cell-id">
                                <p>ABCDEF123456ABCDEF123456</p>
                            </div>
                            <div className="rctc-cell rctc-cell-direction">
                                <span>Inbound</span>
                            </div>
                            <div className="rctc-cell rctc-cell-campaign">
                                <span>Warranty</span>
                            </div>
                            <div className="rctc-cell rctc-cell-spotter-list">
                                <span>Birds</span>
                            </div>
                            <div className="rctc-cell rctc-cell-upload-date">
                                <span>2021/01/01</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa">
                                <span>Q1 A</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa-score">
                                <span>3/5</span>
                            </div>
                            <div className="rctc-cell rctc-cell-status">
                                <span className="completed">Completed</span>
                            </div>
                            <div className="rctc-cell rctc-cell-agent">
                                <span>Agent 1</span>
                            </div>
                            <div className="rctc-cell rctc-cell-duration">
                                <span>05:41</span>
                            </div>
                            <div className="rctc-cell rctc-cell-sentiment">
                                <span>Positive</span>
                            </div>
                            <div className="rctc-cell rctc-cell-talk-listen rctc-cell-delete">
                                <span>40:60</span> <FaTrashAlt onClick={handleShow} className="rctc-delete" />
                            </div>
                        </div>
                        <div className="rctc-row">
                            <div className="rctc-cell rctc-cell-view">
                                <MdRemoveRedEye className="rc-view-icon" />
                            </div>
                            <div className="rctc-cell rctc-cell-id">
                                <p>ABCDEF123456ABCDEF123456</p>
                            </div>
                            <div className="rctc-cell rctc-cell-direction">
                                <span>Inbound</span>
                            </div>
                            <div className="rctc-cell rctc-cell-campaign">
                                <span>Warranty</span>
                            </div>
                            <div className="rctc-cell rctc-cell-spotter-list">
                                <span>Birds</span>
                            </div>
                            <div className="rctc-cell rctc-cell-upload-date">
                                <span>2021/01/01</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa">
                                <span>Q1 A</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa-score">
                                <span>3/5</span>
                            </div>
                            <div className="rctc-cell rctc-cell-status">
                                <span className="inProgress">In Progress</span>
                            </div>
                            <div className="rctc-cell rctc-cell-agent">
                                <span>Agent 1</span>
                            </div>
                            <div className="rctc-cell rctc-cell-duration">
                                <span>05:41</span>
                            </div>
                            <div className="rctc-cell rctc-cell-sentiment">
                                <span>Positive</span>
                            </div>
                            <div className="rctc-cell rctc-cell-talk-listen rctc-cell-delete">
                                <span>40:60</span> <FaTrashAlt className="rctc-delete" />
                            </div>
                        </div>
                        <div className="rctc-row">
                            <div className="rctc-cell rctc-cell-view">
                                <MdRemoveRedEye className="rc-view-icon" />
                            </div>
                            <div className="rctc-cell rctc-cell-id">
                                <p>ABCDEF123456ABCDEF123456</p>
                            </div>
                            <div className="rctc-cell rctc-cell-direction">
                                <span>Inbound</span>
                            </div>
                            <div className="rctc-cell rctc-cell-campaign">
                                <span>Warranty</span>
                            </div>
                            <div className="rctc-cell rctc-cell-spotter-list">
                                <span>Birds</span>
                            </div>
                            <div className="rctc-cell rctc-cell-upload-date">
                                <span>2021/01/01</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa">
                                <span>Q1 A</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa-score">
                                <span>3/5</span>
                            </div>
                            <div className="rctc-cell rctc-cell-status">
                                <span className="scheduled">Scheduled</span>
                            </div>
                            <div className="rctc-cell rctc-cell-agent">
                                <span>Agent 1</span>
                            </div>
                            <div className="rctc-cell rctc-cell-duration">
                                <span>05:41</span>
                            </div>
                            <div className="rctc-cell rctc-cell-sentiment">
                                <span>Positive</span>
                            </div>
                            <div className="rctc-cell rctc-cell-talk-listen rctc-cell-delete">
                                <span>40:60</span> <FaTrashAlt className="rctc-delete" />
                            </div>
                        </div>
                        <div className="rctc-row">
                            <div className="rctc-cell rctc-cell-view">
                                <MdRemoveRedEye className="rc-view-icon" />
                            </div>
                            <div className="rctc-cell rctc-cell-id">
                                <p>ABCDEF123456ABCDEF123456</p>
                            </div>
                            <div className="rctc-cell rctc-cell-direction">
                                <span>Inbound</span>
                            </div>
                            <div className="rctc-cell rctc-cell-campaign">
                                <span>Warranty</span>
                            </div>
                            <div className="rctc-cell rctc-cell-spotter-list">
                                <span>Birds</span>
                            </div>
                            <div className="rctc-cell rctc-cell-upload-date">
                                <span>2021/01/01</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa">
                                <span>Q1 A</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa-score">
                                <span>3/5</span>
                            </div>
                            <div className="rctc-cell rctc-cell-status">
                                <span className="failed">Failed</span>
                            </div>
                            <div className="rctc-cell rctc-cell-agent">
                                <span>Agent 1</span>
                            </div>
                            <div className="rctc-cell rctc-cell-duration">
                                <span>05:41</span>
                            </div>
                            <div className="rctc-cell rctc-cell-sentiment">
                                <span>Positive</span>
                            </div>
                            <div className="rctc-cell rctc-cell-talk-listen rctc-cell-delete">
                                <span>40:60</span> <FaTrashAlt className="rctc-delete" />
                            </div>
                        </div>
                        <div className="rctc-row">
                            <div className="rctc-cell rctc-cell-view">
                                <MdRemoveRedEye className="rc-view-icon" />
                            </div>
                            <div className="rctc-cell rctc-cell-id">
                                <p>ABCDEF123456ABCDEF123456</p>
                            </div>
                            <div className="rctc-cell rctc-cell-direction">
                                <span>Inbound</span>
                            </div>
                            <div className="rctc-cell rctc-cell-campaign">
                                <span>Warranty</span>
                            </div>
                            <div className="rctc-cell rctc-cell-spotter-list">
                                <span>Birds</span>
                            </div>
                            <div className="rctc-cell rctc-cell-upload-date">
                                <span>2021/01/01</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa">
                                <span>Q1 A</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa-score">
                                <span>3/5</span>
                            </div>
                            <div className="rctc-cell rctc-cell-status">
                                <span className="completed">Completed</span>
                            </div>
                            <div className="rctc-cell rctc-cell-agent">
                                <span>Agent 1</span>
                            </div>
                            <div className="rctc-cell rctc-cell-duration">
                                <span>05:41</span>
                            </div>
                            <div className="rctc-cell rctc-cell-sentiment">
                                <span>Positive</span>
                            </div>
                            <div className="rctc-cell rctc-cell-talk-listen rctc-cell-delete">
                                <span>40:60</span> <FaTrashAlt onClick={handleShow} className="rctc-delete" />
                            </div>
                        </div>
                        <div className="rctc-row">
                            <div className="rctc-cell rctc-cell-view">
                                <MdRemoveRedEye className="rc-view-icon" />
                            </div>
                            <div className="rctc-cell rctc-cell-id">
                                <p>ABCDEF123456ABCDEF123456</p>
                            </div>
                            <div className="rctc-cell rctc-cell-direction">
                                <span>Inbound</span>
                            </div>
                            <div className="rctc-cell rctc-cell-campaign">
                                <span>Warranty</span>
                            </div>
                            <div className="rctc-cell rctc-cell-spotter-list">
                                <span>Birds</span>
                            </div>
                            <div className="rctc-cell rctc-cell-upload-date">
                                <span>2021/01/01</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa">
                                <span>Q1 A</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa-score">
                                <span>3/5</span>
                            </div>
                            <div className="rctc-cell rctc-cell-status">
                                <span className="inProgress">In Progress</span>
                            </div>
                            <div className="rctc-cell rctc-cell-agent">
                                <span>Agent 1</span>
                            </div>
                            <div className="rctc-cell rctc-cell-duration">
                                <span>05:41</span>
                            </div>
                            <div className="rctc-cell rctc-cell-sentiment">
                                <span>Positive</span>
                            </div>
                            <div className="rctc-cell rctc-cell-talk-listen rctc-cell-delete">
                                <span>40:60</span> <FaTrashAlt className="rctc-delete" />
                            </div>
                        </div>
                        <div className="rctc-row">
                            <div className="rctc-cell rctc-cell-view">
                                <MdRemoveRedEye className="rc-view-icon" />
                            </div>
                            <div className="rctc-cell rctc-cell-id">
                                <p>ABCDEF123456ABCDEF123456</p>
                            </div>
                            <div className="rctc-cell rctc-cell-direction">
                                <span>Inbound</span>
                            </div>
                            <div className="rctc-cell rctc-cell-campaign">
                                <span>Warranty</span>
                            </div>
                            <div className="rctc-cell rctc-cell-spotter-list">
                                <span>Birds</span>
                            </div>
                            <div className="rctc-cell rctc-cell-upload-date">
                                <span>2021/01/01</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa">
                                <span>Q1 A</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa-score">
                                <span>3/5</span>
                            </div>
                            <div className="rctc-cell rctc-cell-status">
                                <span className="scheduled">Scheduled</span>
                            </div>
                            <div className="rctc-cell rctc-cell-agent">
                                <span>Agent 1</span>
                            </div>
                            <div className="rctc-cell rctc-cell-duration">
                                <span>05:41</span>
                            </div>
                            <div className="rctc-cell rctc-cell-sentiment">
                                <span>Positive</span>
                            </div>
                            <div className="rctc-cell rctc-cell-talk-listen rctc-cell-delete">
                                <span>40:60</span> <FaTrashAlt className="rctc-delete" />
                            </div>
                        </div>
                        <div className="rctc-row">
                            <div className="rctc-cell rctc-cell-view">
                                <MdRemoveRedEye className="rc-view-icon" />
                            </div>
                            <div className="rctc-cell rctc-cell-id">
                                <p>ABCDEF123456ABCDEF123456</p>
                            </div>
                            <div className="rctc-cell rctc-cell-direction">
                                <span>Inbound</span>
                            </div>
                            <div className="rctc-cell rctc-cell-campaign">
                                <span>Warranty</span>
                            </div>
                            <div className="rctc-cell rctc-cell-spotter-list">
                                <span>Birds</span>
                            </div>
                            <div className="rctc-cell rctc-cell-upload-date">
                                <span>2021/01/01</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa">
                                <span>Q1 A</span>
                            </div>
                            <div className="rctc-cell rctc-cell-qa-score">
                                <span>3/5</span>
                            </div>
                            <div className="rctc-cell rctc-cell-status">
                                <span className="failed">Failed</span>
                            </div>
                            <div className="rctc-cell rctc-cell-agent">
                                <span>Agent 1</span>
                            </div>
                            <div className="rctc-cell rctc-cell-duration">
                                <span>05:41</span>
                            </div>
                            <div className="rctc-cell rctc-cell-sentiment">
                                <span>Positive</span>
                            </div>
                            <div className="rctc-cell rctc-cell-talk-listen rctc-cell-delete">
                                <span>40:60</span> <FaTrashAlt className="rctc-delete" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pagination-bar">
                    <div className="pb-left">
                        Showing <span>1 to 7 of 7</span> enteries
                    </div>
                    <div className="pb-right">
                        <div className="pagination-block">
                            <FaAngleDoubleLeft />
                        </div>
                        <div className="pagination-block pb-active">1</div>
                        <div className="pagination-block">2</div>
                        <div className="pagination-block">3</div>
                        <div className="pagination-block pb-last">
                            <FaAngleDoubleRight />
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={show} onHide={handleClose} backdrop="static" centered className="del-modal">
                <Modal.Body>
                    <h1 className="del-modal-head">Do you want to delete?</h1>
                    <div className="spotters-two-btns">
                        <button className="spotters-modal-submit">Yes</button>
                        <button onClick={handleClose} className="spotters-modal-cancel">
                            Cancel
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Conversations;
