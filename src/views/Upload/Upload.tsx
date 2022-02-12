/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { FunctionComponent, useState } from 'react';
import './Upload.css';
import Firebase from '../../firebase';
import { NotificationType, UploadTypeProps } from '../../interface';
import UploadImg from '../../assets/bg_upload.png';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { DIRECTION, YESNO, FILE_TYPE, STATUS } from '../../config/enums';
import { FILE_SIZE, SYMBL_API_LANGUAGE_CODE, SYMBL_API_SPEAKER_COUNT, UPLOAD } from '../../config/app-constants';
import { POST_AUDIO, POST_VIDEO, WEB_HOOK_URL } from '../../config/api-constant';
import { API } from '../../utils/api';
import { Conversation } from '../../types/conversation';
import { useDropzone } from 'react-dropzone';

const RedRadio = withStyles({
    root: {
        color: 'var(--red)',
        '&$checked': {
            color: 'var(--red)',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

const Upload: FunctionComponent<UploadTypeProps> = (uploadProps) => {
    const [callValue, setCallValue] = useState<string>(DIRECTION['INBOUND']);
    const { firebase, setMessageObj, currentCompany, loggedInUser } = uploadProps;
    const [applyValue, setApplyValue] = useState<string>(YESNO.YES);
    const [isUploading, setIsUploading] = useState(false);

    const [nameValue, setNameValue] = useState();
    const [campaignValue, setCampaignValue] = useState();
    const [qaValue, setQAValue] = useState();
    const [splotterValue, setSplotterValue] = useState();
    const [retentionValue, setRetentionValue] = useState();
    const [urlValue, setURLValue] = useState();

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ accept: 'audio/*, video/*,application/pdf' });

    const handleApplyChange = (event) => {
        setApplyValue(event.target.value);
    };

    const handleSelectChange = (event, fun) => {
        fun(event.target.value);
    };

    const selectValue = ['A', 'B', 'C'];

    /**
     * This method used for upload files
     * @param {} files files array
     */
    const handleChange = (files) => {
        if (files && files.length && !isUploading) {
            uploadFile(files);
        }
    };

    const api = new API(setMessageObj);
    const handleCallChange = (event) => {
        setCallValue(event.target.value);
    };

    const readAsArrayBuffer = (file) => {
        return new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.addEventListener('load', async (event) => {
                const buffer = event.target.result;
                resolve(buffer);
            });
            fileReader.readAsArrayBuffer(file);
        });
    };

    /**
     * This method used to check file type
     * @param file File object
     */
    const getFileType = (file) => {
        if (file.type.match('video.*')) return FILE_TYPE.VIDEO;

        if (file.type.match('audio.*')) return FILE_TYPE.AUDIO;
        return FILE_TYPE.OTHER;
    };

    const Spotter = {
        id: '11lwVrt9CxW8l9ciFzLC',
        name: 'Vocalysd',
    };
    const Agent = {
        id: 'N1a9ee3p1taTNd9lQpPHwJFITLr2',
        name: 'Vaibhav',
    };

    const Spotters = [
        {
            id: '11lwVrt9CxW8l9ciFzLC',
            name: 'Vocalysd',
        },
    ];
    const QAAgents = [
        {
            id: 'N1a9ee3p1taTNd9lQpPHwJFITLr2',
            name: 'Vaibhav',
        },
    ];

    /**
     * This method used for get files in bytes
     * @param {number} bytes
     * @param {number} decimals
     * @returns
     */
    const formatBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = FILE_SIZE;
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    /**
     * This method used to upload audio/video files in symbl ai.
     * @param file File object
     * @param fileType File type
     */
    const uploadFile = async (files) => {
        if (files.length) {
            setIsUploading(true);
        }
        const uploadInfo = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i].file;
            const fileType = getFileType(file);

            const queryString = api.objToQueryString({
                webhookUrl: WEB_HOOK_URL,
                languageCode: SYMBL_API_LANGUAGE_CODE,
                enableAllTrackers: true,
                enableSpeakerDiarization: true,
                diarizationSpeakerCount: SYMBL_API_SPEAKER_COUNT,
                detectActionPhraseForMessages: true,
            });
            const buffer = await readAsArrayBuffer(file);
            const customHeaders = {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'x-api-key': localStorage.getItem('token'),
                'Content-Type': file.type,
            };
            uploadInfo.push({
                url: `${fileType === FILE_TYPE.AUDIO ? `${POST_AUDIO}` : `${POST_VIDEO}`}?${queryString}`,
                buffer,
                customHeaders,
                file,
                fileType,
            });
        }

        try {
            const symblUpload = Promise.all([
                ...uploadInfo.map(({ url, buffer, customHeaders }) => api.uploadPost(url, buffer, customHeaders)),
            ]);
            const firebaseUpload = Promise.all([
                ...uploadInfo.map(({ fileType, file }) => firebase.addConversation(fileType, file)),
            ]);
            const result = await Promise.all([symblUpload, firebaseUpload]);
            if (result && result[0].length) {
                for (let i = 0; i < result[0].length; i++) {
                    const conversation: Conversation = {
                        id: null,
                        jobId: result[0][i].jobId,
                        conversationId: result[0][i].conversationId,
                        status: STATUS.PROCESSING,
                        spotterId: Spotter.id,
                        spotterName: Spotter.name,
                        direction: DIRECTION.INBOUND,
                        agentId: Agent.id,
                        agentName: Agent.name,
                        qa_assigned_id: loggedInUser.id,
                        qaName: loggedInUser.name,
                        fileName: uploadInfo[i].file.name.split('.').slice(0, -1).join('.'),
                        fileSize: formatBytes(uploadInfo[i].file.size),
                        source: UPLOAD,
                        fileType: getFileType(uploadInfo[i].file),
                        duration: '9 mins',
                        create_date: firebase.getCurrentTime(),
                        last_update_date: firebase.getCurrentTime(),
                        active_ind: true,
                    };
                    await firebase.addConversation(currentCompany.id, conversation);
                    setMessageObj({
                        openAlert: true,
                        severity: 'success',
                        alertMessage: 'Login successfully.',
                    });
                }
            }
        } catch (error) {
            setMessageObj({
                openAlert: true,
                severity: 'error',
                alertMessage: error.message,
            });
        }
    };

    return (
        <div className="app-main-container">
            <div className="upload__container">
                <div className="upload">
                    <div className="upload__title">
                        <h2 className="upload__headline">Upload Conversations</h2>
                        <div className="title__headline"></div>
                    </div>
                    <div className="upload__box">
                        <div className="upload__box__left">
                            <div className="upload__box__left__title">
                                <h2 className="upload__headline">SELECT FILES TO UPLOAD</h2>
                                <h5 style={{ fontSize: '0.7em' }}>(max 50)</h5>
                            </div>

                            <div className="upload__box__left__body">
                                <h3 className="select__title_left">Select file to upload</h3>
                                <h5 style={{ fontSize: '0.5em' }}>
                                    We currently support the following file formats: wav, mp3, mp4
                                </h5>
                                <div style={{ outline: 'none' }} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <div className="upload__icon">
                                        <img src={UploadImg} height="60" />
                                        <h4>Drop files here or click to upload</h4>
                                    </div>
                                </div>

                                <h2 className="upload__or">OR</h2>
                                <h3 className="select__title_left">Enter URL for file location</h3>
                                <h5 style={{ fontSize: '0.5em' }}>Use this option if your file is stored online</h5>
                                <input
                                    className="upload__icon"
                                    placeholder="http://www.choosemyfile.com"
                                    value={urlValue}
                                    onChange={(event) => handleSelectChange(event, setURLValue)}
                                />
                            </div>
                        </div>
                        <div className="upload__box__right">
                            <div className="label__box">
                                <h3 className="select__title">Naming convention </h3>

                                <select
                                    style={{ width: '100%' }}
                                    value={nameValue}
                                    onChange={(event) => handleSelectChange(event, setNameValue)}
                                >
                                    <option value="" disabled selected>
                                        [DisplayName]_Extension-CalledNumber_YYYYMMDD_HHMMSS(InternalCallIdentifier)
                                    </option>
                                    {selectValue.map((se, ind) => (
                                        <option key={ind} value={se}>
                                            {se}
                                        </option>
                                    ))}
                                </select>
                                <h5
                                    style={{
                                        textAlign: 'end',
                                        paddingRight: '9%',
                                        fontSize: '0.5em',
                                        paddingTop: '1%',
                                    }}
                                >
                                    Don’t see your option here? Please contact support so that we can add it.
                                </h5>
                            </div>

                            <div className="parts">
                                <div>
                                    <div className="label__box">
                                        {' '}
                                        <h3 className="select__title">Campaign</h3>
                                        <select
                                            value={campaignValue}
                                            onChange={(event) => handleSelectChange(event, setCampaignValue)}
                                        >
                                            <option value="" disabled selected>
                                                Pull from Campaign Page
                                            </option>
                                            {selectValue.map((se, ind) => (
                                                <option key={ind} value={se}>
                                                    {se}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="label__box">
                                        <h3 className="select__title">Spotter List</h3>

                                        <select
                                            value={splotterValue}
                                            onChange={(event) => handleSelectChange(event, setSplotterValue)}
                                        >
                                            <option value="" disabled selected>
                                                Pull from Spotter Page
                                            </option>
                                            {selectValue.map((se, ind) => (
                                                <option key={ind} value={se}>
                                                    {se}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="label__box">
                                        <h3 className="select__title">Call Direction </h3>

                                        <RadioGroup
                                            row
                                            style={{ paddingLeft: '1%' }}
                                            aria-label="call"
                                            name="call"
                                            value={callValue}
                                            onChange={(event) => handleSelectChange(event, setCallValue)}
                                        >
                                            <FormControlLabel
                                                value={DIRECTION['INBOUND']}
                                                control={<RedRadio />}
                                                label={<span style={{ fontSize: '0.7em' }}>INBOUND</span>}
                                            />
                                            <FormControlLabel
                                                value={DIRECTION['OUTBOUND']}
                                                control={<RedRadio />}
                                                label={<span style={{ fontSize: '0.7em' }}>OUTBOUND</span>}
                                            />
                                        </RadioGroup>
                                    </div>
                                </div>
                                <div>
                                    <div className="label__box">
                                        <h3 className="select__title">Quality Assurance</h3>

                                        <select
                                            value={qaValue}
                                            onChange={(event) => handleSelectChange(event, setQAValue)}
                                        >
                                            <option value="" disabled selected>
                                                QA Name (leave blank if no allocation)
                                            </option>
                                            {selectValue.map((se, ind) => (
                                                <option key={ind} value={se}>
                                                    {se}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="label__box">
                                        <h3 className="select__title">Uploaded File Retention</h3>

                                        <select
                                            value={retentionValue}
                                            onChange={(event) => handleSelectChange(event, setRetentionValue)}
                                        >
                                            <option value="" disabled selected>
                                                Yes, discard after 90 days.
                                            </option>
                                            {selectValue.map((se, ind) => (
                                                <option key={ind} value={se}>
                                                    {se}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="label__box">
                                        <h3 className="select__title">Apply Redaction</h3>

                                        <RadioGroup
                                            row
                                            style={{ paddingLeft: '1%' }}
                                            aria-label="apply"
                                            name="apply"
                                            value={applyValue}
                                            onChange={(event) => handleSelectChange(event, setApplyValue)}
                                        >
                                            <FormControlLabel
                                                value={YESNO.YES}
                                                control={<RedRadio />}
                                                label={<span style={{ fontSize: '0.7em' }}>YES</span>}
                                            />
                                            <FormControlLabel
                                                value={YESNO.NO}
                                                control={<RedRadio />}
                                                label={<span style={{ fontSize: '0.7em' }}>NO</span>}
                                            />
                                        </RadioGroup>
                                    </div>
                                </div>
                            </div>
                            <button style={{ background: 'var(--yellow)' }}>SUBMIT</button>
                            <button style={{ background: 'var(--red)' }}>CLEAR</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;
