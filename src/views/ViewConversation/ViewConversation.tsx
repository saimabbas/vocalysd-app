/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { FunctionComponent, useRef, useEffect, useCallback } from 'react';
import './ViewConversation.css';
import Firebase from '../../firebase';
import { NotificationType } from '../../interface';
import { FaHeadset } from 'react-icons/fa';
import { MdStar, MdPerson, MdPlayArrow, MdPause, MdStop } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';
import WaveSurfer from 'wavesurfer.js';
import $ from 'jquery';
const ViewConversation: FunctionComponent<{
    firebase: Firebase;
    setMessageObj: (messageObj: NotificationType) => void;
    loggedInUser: any;
}> = () => {
    const data = [{ name: 'Group A', value: 400 }];
    const COLORS = ['var(--yellow)'];

    const data3 = [
        { name: 'Positive', value: 50 },
        { name: 'Negative', value: 50 },
    ];
    const COLORS3 = ['var(--yellow)', 'var(--main)'];

    const data2 = [
        { name: 'Positive', value: 30 },
        { name: 'Negative', value: 50 },
        { name: 'Neutral', value: 20 },
    ];
    const COLORS2 = ['var(--yellow)', 'var(--red)', 'var(--main)'];
    const waveformRef = useRef(null);
    useEffect(() => {
        const wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: '#e7a500',
            progressColor: '#d83e3b',
            barWidth: 1.5,
            barRadius: 0,
            barHeight: 3,
            barGap: 2,
            cursorColor: '#182531',
            hideScrollbar: true,
            responsive: true,
        });
        wavesurfer.load(
            'https://ia800301.us.archive.org/15/items/fire_and_ice_librivox/fire_and_ice_frost_apc_64kb.mp3',
        );

        wavesurfer.on('ready', function () {
            wavesurfer.play();
        });
        $('#ac1').click(function () {
            wavesurfer.stop();
        });
        $('#ac2').click(function () {
            wavesurfer.pause();
        });
        $('#ac3').click(function () {
            wavesurfer.play();
            const x = wavesurfer.getDuration();
            const y = parseFloat(document.getElementById('duration').innerHTML);
        });
    }, []);

    return (
        <div className="app-main-container">
            <div className="view-conversation-container">
                <div className="vcc-left">
                    <div className="vcc-left-1">
                        <div className="vcc-left-1-1">
                            <span>INBOUND</span>
                            <div>
                                <h6>CALL ID</h6>
                                <h5>ABCDEF123456</h5>
                            </div>
                            <div>
                                <h6>TOTAL CALL DURATION</h6>
                                <h5>8m37s</h5>
                            </div>
                            <div>
                                <h6>Campaign</h6>
                                <h5>Birds of prey</h5>
                            </div>
                        </div>
                        <div className="vcc-left-1-2">
                            <div className="line-audio"></div>
                            <div className="vccl-1">
                                <div className="customer-audio">
                                    <MdPerson />
                                    <span>Customer</span>
                                </div>
                                <div className="agent-audio">
                                    <FaHeadset />
                                    <span>Agent</span>
                                </div>
                            </div>
                            <div className="vccl-2">
                                <p id="duration">0</p>
                                <div id="waveform" ref={waveformRef}></div>
                                <div className="audio-controls">
                                    <input type="radio" name="audio-controls" id="ac1" />
                                    <label htmlFor="ac1">
                                        <div className="audio-stop acc">
                                            <MdStop />
                                        </div>
                                    </label>

                                    <input type="radio" name="audio-controls" id="ac2" />
                                    <label htmlFor="ac2">
                                        <div className="audio-pause acc">
                                            <MdPause />
                                        </div>
                                    </label>

                                    <input type="radio" name="audio-controls" id="ac3" />
                                    <label htmlFor="ac3">
                                        <div className="audio-play acc">
                                            <MdPlayArrow />
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="vcc-left-2">
                        <div className="vss-left-2-head">
                            <h1>Conversation</h1>
                            <div>Customer Satisfaction: 7/10</div>
                        </div>
                        <div className="vss-left-2-content">
                            <div className="vss-left-2-content-box">
                                <div className="convo-super-box">
                                    <div className="csb-icon-line">
                                        <span className="agent">
                                            <FaHeadset />
                                        </span>
                                        <div className="line"></div>
                                    </div>
                                    <div className="csb-text-switch">
                                        <h1>Agent</h1>
                                        <div className="ts-box">
                                            <div className="tsb-text-container">
                                                <div className="main-convo-text-box">
                                                    <p>
                                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
                                                        numquam e odit aspernatur ab eaque? Lorem ipsum, dolor sit amet
                                                        consectetur adipisicing elit. Provident porro deserunt eligendi
                                                        tempora tenetur, quos fugit eum ea harum aliquam.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="tsb-swtich-container">
                                                <span>Positive</span>
                                                <Form>
                                                    <Form.Check checked type="switch" id="custom-switch-1" />
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="convo-super-box">
                                    <div className="csb-icon-line">
                                        <span className="customer">
                                            <FaHeadset />
                                        </span>
                                        <div className="line"></div>
                                    </div>
                                    <div className="csb-text-switch">
                                        <h1>Customer</h1>
                                        <div className="ts-box">
                                            <div className="tsb-text-container">
                                                <div className="main-convo-text-box">
                                                    <p>
                                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
                                                        numquam e odit aspernatur ab eaque?
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="tsb-swtich-container">
                                                <span>Negative</span>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch-2" />
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="convo-super-box">
                                    <div className="csb-icon-line">
                                        <span className="agent">
                                            <FaHeadset />
                                        </span>
                                        <div className="line"></div>
                                    </div>
                                    <div className="csb-text-switch">
                                        <h1>Agent</h1>
                                        <div className="ts-box">
                                            <div className="tsb-text-container">
                                                <div className="main-convo-text-box">
                                                    <p>
                                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
                                                        numquam e odit aspernatur ab eaque?
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="tsb-swtich-container">
                                                <span>Positive</span>
                                                <Form>
                                                    <Form.Check checked type="switch" id="custom-switch-1" />
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="convo-super-box">
                                    <div className="csb-icon-line">
                                        <span className="customer">
                                            <FaHeadset />
                                        </span>
                                        <div className="line"></div>
                                    </div>
                                    <div className="csb-text-switch">
                                        <h1>Customer</h1>
                                        <div className="ts-box">
                                            <div className="tsb-text-container">
                                                <div className="main-convo-text-box">
                                                    <p>
                                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
                                                        numquam e odit aspernatur ab eaque?
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="tsb-swtich-container">
                                                <span>Negative</span>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch-2" />
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="convo-super-box">
                                    <div className="csb-icon-line">
                                        <span className="agent">
                                            <FaHeadset />
                                        </span>
                                        <div className="line"></div>
                                    </div>
                                    <div className="csb-text-switch">
                                        <h1>Agent</h1>
                                        <div className="ts-box">
                                            <div className="tsb-text-container">
                                                <div className="main-convo-text-box">
                                                    <p>
                                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
                                                        numquam e odit aspernatur ab eaque?
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="tsb-swtich-container">
                                                <span>Positive</span>
                                                <Form>
                                                    <Form.Check checked type="switch" id="custom-switch-1" />
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="convo-super-box">
                                    <div className="csb-icon-line">
                                        <span className="customer">
                                            <FaHeadset />
                                        </span>
                                        <div className="line"></div>
                                    </div>
                                    <div className="csb-text-switch">
                                        <h1>Customer</h1>
                                        <div className="ts-box">
                                            <div className="tsb-text-container">
                                                <div className="main-convo-text-box">
                                                    <p>
                                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
                                                        numquam e odit aspernatur ab eaque?
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="tsb-swtich-container">
                                                <span>Negative</span>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch-2" />
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="convo-super-box">
                                    <div className="csb-icon-line">
                                        <span className="agent">
                                            <FaHeadset />
                                        </span>
                                        <div className="line"></div>
                                    </div>
                                    <div className="csb-text-switch">
                                        <h1>Agent</h1>
                                        <div className="ts-box">
                                            <div className="tsb-text-container">
                                                <div className="main-convo-text-box">
                                                    <p>
                                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
                                                        numquam e odit aspernatur ab eaque?
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="tsb-swtich-container">
                                                <span>Positive</span>
                                                <Form>
                                                    <Form.Check checked type="switch" id="custom-switch-1" />
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="convo-super-box">
                                    <div className="csb-icon-line">
                                        <span className="customer">
                                            <FaHeadset />
                                        </span>
                                        <div className="line"></div>
                                    </div>
                                    <div className="csb-text-switch">
                                        <h1>Customer</h1>
                                        <div className="ts-box">
                                            <div className="tsb-text-container">
                                                <div className="main-convo-text-box">
                                                    <p>
                                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
                                                        numquam e odit aspernatur ab eaque?
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="tsb-swtich-container">
                                                <span>Negative</span>
                                                <Form>
                                                    <Form.Check type="switch" id="custom-switch-2" />
                                                </Form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="vcc-right">
                    <div className="vss-right-1">
                        <div className="vss-right-1-box">
                            <h6>Words per min</h6>
                            <div className="vss-graph-box">
                                <PieChart width={1000} height={1000}>
                                    <Pie data={data} cx={65} cy={65} innerRadius={53} outerRadius={60} dataKey="value">
                                        {data.map((_any, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                        <Legend />
                                        <Tooltip />
                                    </Pie>
                                </PieChart>
                                <div className="graph-inner-content">
                                    <p>150</p>
                                </div>
                            </div>
                        </div>
                        <div className="vss-right-1-box">
                            <h6>Sentiment</h6>
                            <div className="vss-graph-box">
                                <PieChart width={1000} height={1000}>
                                    <Pie data={data2} cx={65} cy={65} innerRadius={53} outerRadius={60} dataKey="value">
                                        {data2.map((_any, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />
                                        ))}
                                        <Legend />
                                        <Tooltip />
                                    </Pie>
                                </PieChart>
                                <div className="graph-inner-content">
                                    <p>30%</p>
                                    <span>Positive</span>
                                </div>
                            </div>
                        </div>
                        <div className="vss-right-1-box">
                            <h6>Talk vs Listen</h6>
                            <div className="vss-graph-box">
                                <PieChart width={1000} height={1000}>
                                    <Pie data={data3} cx={65} cy={65} innerRadius={53} outerRadius={60} dataKey="value">
                                        {data3.map((_any, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS3[index % COLORS3.length]} />
                                        ))}
                                        <Legend />
                                        <Tooltip />
                                    </Pie>
                                </PieChart>
                                <div className="graph-inner-content">
                                    <p>50%</p>
                                    <span>Talking</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="vcc-left-2 vcc-right-2">
                        <div className="vss-left-2-head">
                            <h1>Conversation Summary</h1>
                        </div>
                        <div className="vcc-right-2-content">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur fugiat ex deserunt
                                repellat, recusandae quidem distinctio accusantium dolorem. Commodi amet fugit,
                                doloremque fuga odit assumenda laborum iure tempora minus qui atque similique
                                exercitationem incidunt autem tempore cupiditate architecto in veniam natus deserunt
                                totam deleniti molestiae nihil quidem. Maxime, sint inventore?
                            </p>
                        </div>
                    </div>
                    <div className="vss-right-3">
                        <h6>Top 5 Mentions</h6>
                        <div className="vcc-right-3-content">
                            <span>Milo</span>
                            <span>Tea</span>
                            <span>Chai</span>
                            <span>Coffee</span>
                            <span>Rooibos</span>
                        </div>
                    </div>
                    <div className="vcc-right-4">
                        <div className="vcc-right-4-left">
                            <h6>Call Rating</h6>
                            <div>
                                <p>Customer Experience</p>
                                <div className="rating-css">
                                    <div className="star-icon">
                                        <input type="radio" name="rating1" id="rating1" />
                                        <label htmlFor="rating1">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating1" id="rating2" />
                                        <label htmlFor="rating2">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating1" id="rating3" />
                                        <label htmlFor="rating3">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating1" id="rating4" />
                                        <label htmlFor="rating4">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating1" id="rating5" />
                                        <label htmlFor="rating5">
                                            <MdStar className="abcc" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>Prefessionalism</p>
                                <div className="rating-css">
                                    <div className="star-icon">
                                        <input type="radio" name="rating2" id="rating6" />
                                        <label htmlFor="rating6">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating2" id="rating7" />
                                        <label htmlFor="rating7">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating2" id="rating8" />
                                        <label htmlFor="rating8">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating2" id="rating9" />
                                        <label htmlFor="rating9">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating2" id="rating10" />
                                        <label htmlFor="rating10">
                                            <MdStar className="abcc" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>Factual Information</p>
                                <div className="rating-css">
                                    <div className="star-icon">
                                        <input type="radio" name="rating3" id="rating11" />
                                        <label htmlFor="rating11">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating3" id="rating12" />
                                        <label htmlFor="rating12">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating3" id="rating13" />
                                        <label htmlFor="rating13">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating3" id="rating14" />
                                        <label htmlFor="rating14">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating3" id="rating15" />
                                        <label htmlFor="rating15">
                                            <MdStar className="abcc" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>Compliance</p>
                                <div className="rating-css">
                                    <div className="star-icon">
                                        <input type="radio" name="rating4" id="rating16" />
                                        <label htmlFor="rating16">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating4" id="rating17" />
                                        <label htmlFor="rating17">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating4" id="rating18" />
                                        <label htmlFor="rating18">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating4" id="rating19" />
                                        <label htmlFor="rating19">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating4" id="rating20" />
                                        <label htmlFor="rating20">
                                            <MdStar className="abcc" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p>Product Knowledge</p>
                                <div className="rating-css">
                                    <div className="star-icon">
                                        <input type="radio" name="rating5" id="rating21" />
                                        <label htmlFor="rating21">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating5" id="rating22" />
                                        <label htmlFor="rating22">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating5" id="rating23" />
                                        <label htmlFor="rating23">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating5" id="rating24" />
                                        <label htmlFor="rating24">
                                            <MdStar className="abcc" />
                                        </label>
                                        <input type="radio" name="rating5" id="rating25" />
                                        <label htmlFor="rating25">
                                            <MdStar className="abcc" />
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="vcc-right-4-right">
                            <h6>Action Items</h6>
                            <h5>Mark as To-Do</h5>
                            <div className="vcc-rr-content">
                                <div>
                                    <label htmlFor="todo1">Call client to ask if the bird was red</label>
                                    {/* <Form.Check custom id="todo1" type="checkbox" name="todo" /> */}
                                    <input type="checkbox" name="todo" id="todo1" />
                                </div>
                                <div>
                                    <label htmlFor="todo2">Check if bird eats worms</label>
                                    <input type="checkbox" name="todo" id="todo2" />
                                </div>
                                <div>
                                    <label htmlFor="todo3">Call client to ask if the bird was red</label>
                                    {/* <Form.Check custom id="todo1" type="checkbox" name="todo" /> */}
                                    <input type="checkbox" name="todo" id="todo3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewConversation;
