/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { FunctionComponent, useState } from 'react';
import './Spotter.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import Firebase from '../../firebase';
import { NotificationType } from '../../interface';
import { MdInfo, MdModeEdit, MdSwapVert, MdRemoveRedEye, MdDelete } from 'react-icons/md';
import { FaCaretDown, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

const Spotter: FunctionComponent<{
    firebase: Firebase;
    setMessageObj: (messageObj: NotificationType) => void;
    loggedInUser: any;
}> = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="app-main-container">
            <div className="spotters-extra-box">
                <div className="right-container-content-box">
                    <div className="rc-head">
                        <div className="rc-head-heading">
                            <h1>Spotters</h1>
                            <div></div>
                            <span>
                                <MdInfo className="rchh-icon" />
                                <p>
                                    Spotters are custom lists of words you would like us to specifically find and track
                                    in transcribed conversational data.
                                </p>
                            </span>
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
                        </div>
                        <div className="rc-fsb-search-box">
                            <label htmlFor="">Quick Search:</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className="rc-table-custom">
                        <div className="rctc-content">
                            <div className="rctc-row rctc-row-head">
                                <div className="rctc-cell rctc-cell-all">
                                    <input type="checkbox" name="" id="" /> All
                                </div>
                                <div className="rctc-cell rctc-cell-hash">#</div>
                                <div className="rctc-cell rctc-cell-name">
                                    Name <MdSwapVert className="rc-sort" />
                                </div>
                                <div className="rctc-cell rctc-cell-created-s">
                                    Created <MdSwapVert className="rc-sort" />
                                </div>
                                <div className="rctc-cell rctc-cell-updated-s">
                                    Updated <MdSwapVert className="rc-sort" />
                                </div>
                                <div className="rctc-cell rctc-cell-times-used">
                                    Times Used <MdSwapVert className="rc-sort" />
                                </div>
                                <div className="rctc-cell rctc-cell-status-s">
                                    Status <MdSwapVert className="rc-sort" />
                                </div>
                                <div className="rctc-cell rctc-cell-edv"></div>
                            </div>
                            <div className="rctc-row rctc-row-inactive">
                                <div className="rctc-cell rctc-cell-all">
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div className="rctc-cell rctc-cell-hash">
                                    <p>1</p>
                                </div>
                                <div className="rctc-cell rctc-cell-name">
                                    <span>Birds</span>
                                </div>
                                <div className="rctc-cell rctc-cell-created-s">
                                    <span>2021/01/01</span>
                                </div>
                                <div className="rctc-cell rctc-cell-updated-s">
                                    <span>2021/01/01</span>
                                </div>
                                <div className="rctc-cell rctc-cell-times-used">
                                    <span>100</span>
                                </div>
                                <div className="rctc-cell rctc-cell-status-s">
                                    <span>Inactive</span>
                                </div>
                                <div className="rctc-cell rctc-cell-edv">
                                    <MdModeEdit className="edv-icon main-color" />
                                    <MdRemoveRedEye className="edv-icon main-red" />
                                    <MdDelete className="edv-icon main-yellow" />
                                </div>
                            </div>
                            <div className="rctc-row rctc-row-inactive">
                                <div className="rctc-cell rctc-cell-all">
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div className="rctc-cell rctc-cell-hash">
                                    <p>1</p>
                                </div>
                                <div className="rctc-cell rctc-cell-name">
                                    <span>Birds</span>
                                </div>
                                <div className="rctc-cell rctc-cell-created-s">
                                    <span>2021/01/01</span>
                                </div>
                                <div className="rctc-cell rctc-cell-updated-s">
                                    <span>2021/01/01</span>
                                </div>
                                <div className="rctc-cell rctc-cell-times-used">
                                    <span>100</span>
                                </div>
                                <div className="rctc-cell rctc-cell-status-s">
                                    <span>Inactive</span>
                                </div>
                                <div className="rctc-cell rctc-cell-edv">
                                    <MdModeEdit className="edv-icon main-color" />
                                    <MdRemoveRedEye className="edv-icon main-red" />
                                    <MdDelete className="edv-icon main-yellow" />
                                </div>
                            </div>
                            <div className="rctc-row">
                                <div className="rctc-cell rctc-cell-all">
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div className="rctc-cell rctc-cell-hash">
                                    <p>1</p>
                                </div>
                                <div className="rctc-cell rctc-cell-name">
                                    <span>Birds</span>
                                </div>
                                <div className="rctc-cell rctc-cell-created-s">
                                    <span>2021/01/01</span>
                                </div>
                                <div className="rctc-cell rctc-cell-updated-s">
                                    <span>2021/01/01</span>
                                </div>
                                <div className="rctc-cell rctc-cell-times-used">
                                    <span>100</span>
                                </div>
                                <div className="rctc-cell rctc-cell-status-s">
                                    <span>Inactive</span>
                                </div>
                                <div className="rctc-cell rctc-cell-edv">
                                    <MdModeEdit className="edv-icon main-color" />
                                    <MdRemoveRedEye className="edv-icon main-red" />
                                    <MdDelete className="edv-icon main-yellow" />
                                </div>
                            </div>
                            <div className="rctc-row ">
                                <div className="rctc-cell rctc-cell-all">
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div className="rctc-cell rctc-cell-hash">
                                    <p>1</p>
                                </div>
                                <div className="rctc-cell rctc-cell-name">
                                    <span>Birds</span>
                                </div>
                                <div className="rctc-cell rctc-cell-created-s">
                                    <span>2021/01/01</span>
                                </div>
                                <div className="rctc-cell rctc-cell-updated-s">
                                    <span>2021/01/01</span>
                                </div>
                                <div className="rctc-cell rctc-cell-times-used">
                                    <span>100</span>
                                </div>
                                <div className="rctc-cell rctc-cell-status-s">
                                    <span>Inactive</span>
                                </div>
                                <div className="rctc-cell rctc-cell-edv">
                                    <MdModeEdit onClick={handleShow} className="edv-icon main-color" />
                                    <MdRemoveRedEye className="edv-icon main-red" />
                                    <MdDelete className="edv-icon main-yellow" />
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
                <button onClick={handleShow} className="new-spotter-list-btn">
                    New Spotter List
                </button>
            </div>

            <Modal show={show} onHide={handleClose} backdrop="static" centered>
                <Modal.Body>
                    <div className="modal-styles-s">
                        <div className="rc-head-heading">
                            <h1>Spotters</h1>
                            <div></div>
                        </div>
                    </div>
                    <div className="input-box-spotter-modal">
                        <label htmlFor="">List Name</label>
                        <input type="text" name="" id="" />
                    </div>
                    <div className="textbox-box-spotter-modal">
                        <h1>Enter keywords below using a word between each word</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi placeat pariatur, sequi
                            necessitatibus dolorum obcaecati.
                        </p>
                        <textarea name="" id=""></textarea>
                    </div>
                    <div className="spotters-word-count">
                        <span>Characters</span>
                        <div>0/500</div>
                    </div>
                    <div className="spotters-two-btns">
                        <button className="spotters-modal-submit">Submit</button>
                        <button onClick={handleClose} className="spotters-modal-cancel">
                            Cancel
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Spotter;
